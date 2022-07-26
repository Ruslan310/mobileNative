/* eslint-disable no-shadow */
import { types as t, getEnv, getRoot } from 'mobx-state-tree';
import R from 'ramda';
import { StripeService } from '../services';
import stripe from 'tipsi-stripe';

import createFlow from './helpers/createFlow';
import processJsonApi, {
  processJsonApiTransactions,
} from './utils/processJsonApi';
import listModel from './utils/listModel';
import { MessageStore } from './MessagesStore';
import { Price, Product } from './ListingsStore';
import { User } from './UserStore';
import { Booking } from './BookingStore';
import { Review } from './ReviewsStore';
import { normalizedIncluded } from './utils/normalize';
import { transitionStatuses } from '../constants';
import {stripeCustomFetch} from "../utils/customFetch";


const Relationships = t.model('Relationships', {
  listing: t.maybe(t.reference(Product)),
  booking: t.optional(t.maybeNull(t.reference(Booking))),
  reviews: t.optional(t.maybeNull(t.reference(Review))),
  customer: t.optional(t.maybeNull(t.reference(User))),
  provider: t.optional(t.maybeNull(t.reference(User))),
});

export const Transaction = t
  .model('Transaction', {
    id: t.identifier,
    type: t.maybe(t.string),
    createdAt: t.Date,
    processName: t.string,
    processVersion: t.number,
    lastTransition: t.maybe(t.string),
    lastTransitionedAt: t.maybe(t.Date),
    payinTotal: t.maybeNull(Price),
    payoutTotal: t.maybeNull(Price),
    // lineItems: t.optional(t.maybeNull(LineItems), null),
    protectedData: t.model({}),
    messages: t.optional(MessageStore, {}),
    relationships: t.maybe(Relationships),

    changeStateTransactions: createFlow(changeStateTransactions),
    initiateOrderAfterEnquiry: createFlow(initiateOrderAfterEnquiry),
    sentReview: createFlow(sentReview),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },

    get isViewer() {
      return store.relationships.listing.relationships.author
        .isViewer;
    },

    get imageUrl() {
      return R.pathOr(
        '',
        [
          'relationships',
          'listing',
          'relationships',
          'getImages',
          [0],
          'variants',
          'default',
          'url',
        ],
        store,
      );
    },
  }))
  .actions((store) => ({
    update(snapshot) {
      Object.assign(store, snapshot);
    },
  }));

function sentReview(flow, store) {
  return function* initiatechangeStateTransactionsTransaction({
    content,
    rating,
  }) {
    try {
      flow.start();
      const transition = transitionStatuses.REVIEW_CUSTOMER_1;

      const res = yield store.Api.changeTransactionsView({
        transactionId: store.id,
        transition,
        content,
        rating,
      });
      const snapshot = processJsonApiTransactions(res.data.data);
      store.update(snapshot);
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function changeStateTransactions(flow, store) {
  console.log('store', store)
  return function* initiatechangeStateTransactionsTransaction({
    transition,
  }) {
    try {
      console.log('initiatechangeStateTransactionsTransaction')
      flow.start();
      const res = yield store.Api.changeStateTransactions({
        transactionId: store.id,
        transition,
      });

      const snapshot = processJsonApiTransactions(res.data.data);
      store.update(snapshot);
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function initiateOrderAfterEnquiry(flow, store) {
  return function* initiateTransaction({
    transition,
    transactionId,
    listingId,
    startRent,
    endRent,
    cardNumber,
    monthExpiration,
    yearExpiration,
    defaultPaymentMethod,
    isUseSaveCard,
    cardCVC,
    message,
  }) {
    try {
      flow.start();
      console.log('changeTransactionsAfterEnquiry')

      const expMonth = Number(monthExpiration);
      const expYear = Number(yearExpiration);

      const paramsToken = {
        number: cardNumber,
        expMonth,
        expYear,
        cvc: cardCVC,
      };

      const { tokenId } = !isUseSaveCard ? yield StripeService.createTokenWithCard(paramsToken) : {};
      const payment = !isUseSaveCard
        ? { cardToken: tokenId }
        : { paymentMethod: defaultPaymentMethod?.stripePaymentMethodId }

      const res = yield store.Api.changeTransactionsAfterEnquiry({
        transactionId,
        transition,
        listingId,
        payment,
        startRent,
        endRent,
      });

      const snapshot = processJsonApi(res.data.data);

      if(snapshot) {
        const { stripePaymentIntentClientSecret } = snapshot.protectedData.stripePaymentIntents
            ? snapshot.protectedData.stripePaymentIntents.default
            : null;

        const { tokenId } = !isUseSaveCard ? yield StripeService.createTokenWithCard(paramsToken) : {};

        const cardParams = {
          clientSecret: stripePaymentIntentClientSecret,
          paymentMethod: {
            card: { token: tokenId }
          },
        }
        const params = {
          clientSecret: stripePaymentIntentClientSecret,
          paymentMethodId: defaultPaymentMethod?.stripePaymentMethodId,
        }

        yield StripeService.confirmPaymentIntent(!isUseSaveCard ? cardParams : params);
        yield store.Api.confirmTransaction(snapshot.id)
      }

      store.update(snapshot);
      const entities = normalizedIncluded(res.data.included);
      getRoot(store).entities.merge(entities);

      if (message) {
        yield store.Api.sendMessage({
          transactionId: snapshot.id,
          content: message,
          include: ['sender', 'sender.profileImage'],
        });
      }

      flow.success();
    } catch (err) {
      console.log('error after enquip')

      flow.failed(err, true);
    }
  };
}

const TransactionList = listModel('TransactionList', {
  of: t.reference(Transaction),
  entityName: 'transaction',
  identifierName: 'id',
  responseTransformer,
  perPage: 15,
});

function responseTransformer(res) {
  return res.map(processJsonApi);
}

export const TransactionStore = t
  .model('ListingsStore', {
    list: TransactionList,
    initiateTransaction: createFlow(initiateTransaction),
    // confirmTransaction: createFlow(confirmTransaction),

    initiateMessageTransaction: createFlow(
      initiateMessageTransaction,
    ),
    fetchTransactions: createFlow(fetchTransactions),
    fetchMoreTransactions: createFlow(fetchMoreTransactions),
    changeStateTransactions: createFlow(changeStateTransactions),
    fetchTransactionById: createFlow(fetchTransactionById),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },

    countAmount(bool) {
      return store.list.asArray
        .filter(
          (i) =>
            i.isViewer === bool &&
            i.lastTransition === 'transition/accept',
        )
        .reduce((acc, current) => {
          acc += R.pathOr(0, ['payinTotal', 'amount'], current);
          return acc;
        }, 0);
    },
  }))

  .actions((store) => ({
    update(snapshot) {
      Object.assign(store, snapshot);
    },
  }));

function initiateMessageTransaction(flow, store) {
  return function* initiateMessage(listingId) {
    try {
      flow.start();

      const res = yield flow.Api.initiateMessageTransaction(
        listingId,
      );

      const data = processJsonApi(res.data.data);
      store.list.addToBegin(data);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function initiateTransaction(flow, store) {
  return function* initiateTransaction({
    listingId,
    startRent,
    endRent,
    cardNumber,
    monthExpiration,
    yearExpiration,
    cardCVC,
    message,
    defaultPaymentMethod,
    isUseSaveCard
  }) {
    try {
      console.log('initiateTransaction',isUseSaveCard)

      flow.start();
      const expMonth = Number(monthExpiration);
      const expYear = Number(yearExpiration);

      const params = {
        number: cardNumber,
        expMonth,
        expYear,
        cvc: cardCVC,
      };

      const { tokenId } = !isUseSaveCard ? yield StripeService.createTokenWithCard(params) : {};
      const payment = !isUseSaveCard
      ? { cardToken: tokenId }
      : { paymentMethod: defaultPaymentMethod?.stripePaymentMethodId }

      console.log('payment', payment)
      const res = yield store.Api.initiateTransaction({
        listingId,
        startRent,
        endRent,
        payment,
      });

      const normalizedEntities = normalizedIncluded(res.data.included);
      getRoot(store).entities.merge(normalizedEntities);
      const data = processJsonApi(res.data.data);

      if(data) {
        const { stripePaymentIntentClientSecret } = data.protectedData.stripePaymentIntents
            ? data.protectedData.stripePaymentIntents.default
            : null;

        const cardParams = {
          clientSecret: stripePaymentIntentClientSecret,
          paymentMethod: {
            card: { token: tokenId }
          },
        }
        const params = {
          clientSecret: stripePaymentIntentClientSecret,
          paymentMethodId: defaultPaymentMethod?.stripePaymentMethodId,
        }

        yield StripeService.confirmPaymentIntent(!isUseSaveCard ? cardParams : params);
        yield store.Api.confirmTransaction(data.id)
      }

      if (message) {
        yield store.Api.sendMessage({
          transactionId: data.id,
          content: message,
          include: ['sender', 'sender.profileImage'],
        });
      }

      store.list.addToBegin(data);

      flow.success();
    } catch (err) {
      console.log('error init transaction')
      flow.failed(err, true);
    }
  };
}

function fetchTransactionById(flow, store) {
  return function* fetchTransaction(transactionId) {
    try {
      flow.start();

      const res = yield store.Api.transactionsShow({
        transactionId,
      });
      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );
      getRoot(store).entities.merge(normalizedEntities);

      const data = processJsonApiTransactions(res.data.data);
      store.list.add(data);
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function fetchTransactions(flow, store) {
  return function* fetchTransaction(params) {
    try {
      flow.start();

      const res = yield store.Api.fetchTransactions({
        perPage: 15,
        page: 1,
        ...params,
      });
      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );
      console.log('fetchTransaction', normalizedEntities)
      getRoot(store).entities.merge(normalizedEntities);

      // TODO: Fetch listings for each transaction
      // since transaction doesn't include the listing relationships
      // We have to fetch each listing by it id
      // Fetching multiple listings by array of ids is not currently supported

      store.list.set(res.data.data);
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function fetchMoreTransactions(flow, store) {
  return function* fetchTransactions(params) {
    try {
      if (store.list.hasNoMore || flow.inProgress) {
        return;
      }

      console.log('fetchTransactions')
      flow.start();
      const page = store.list.pageNumber;
      const perPage = 15;

      const res = yield store.Api.fetchTransactions({
        perPage,
        page,
        ...params,
      });

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );
      getRoot(store).entities.merge(normalizedEntities);

      store.list.append(res.data.data);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

export default TransactionStore;
