/* eslint-disable no-shadow */
import { types, getEnv, getRoot } from 'mobx-state-tree';
import { User } from './UserStore';
import createFlow from './helpers/createFlow';
import processJsonApi  from './utils/processJsonApi';
import { normalizedIncluded } from './utils/normalize';
import normalizeError from './utils/normalizeError';
import {StripeService} from "../services";
import {stripeCustomFetch} from "../utils/customFetch";
import {payments} from "../utils";


export const Viewer = types
  .compose(
    User,
    types.model('Viewer', {
      id: types.identifier,
    }),
  )
  .actions((store) => ({
    update(patch) {
      Object.assign(store, patch);
    },
  }));

const ViewerStore = types
  .model('ViewerStore', {
    user: types.optional(types.maybeNull(Viewer), null),
    getCurrentUser: createFlow(getCurrentUser),
    changeAvatar: createFlow(changeAvatar),
    updateProfile: createFlow(updateProfile),
    changeEmail: createFlow(changeEmail),
    changePassword: createFlow(changePassword),
    sendVerifyEmail: createFlow(sendVerifyEmail),
    verifyEmail: createFlow(verifyEmail),
    createStripeAccount: createFlow(createStripeAccount),
    updateStripeAccount: createFlow(updateStripeAccount),
    createStripePaymentMethod: createFlow(createStripePaymentMethod),
    updateStripePaymentMethod: createFlow(updateStripePaymentMethod),
    deleteStripePaymentMethod: createFlow(deleteStripePaymentMethod),
  })
  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }))
  .actions((store) => ({
    setUser(data) {
      try {
        store.user = data;
        getRoot(store).entities.user.add(data.id, data);
      } catch (err) {
        console.log(err);
      }
    },
    removeUser() {
      store.user = null;
    },
  }));

function getCurrentUser(flow, store) {
  return function* getCurrentUser() {
    try {
      flow.start();

      let res = yield store.Api.getUser();
      console.log('res.data.included',res.data.included)
      const normalizedEntities = normalizedIncluded(
          res.data.included,
      );
      console.log('сurrentUser', res.data)
      const user = processJsonApi(res.data.data);

      console.log('normalizedEntities', normalizedEntities)
      getRoot(store).entities.merge(normalizedEntities);

      console.log('user', user)
      store.setUser(user);
      console.log('store1111', getRoot(store))
      flow.success();
    } catch (err) {
      flow.failed();
    }
  };
}

function changeAvatar(flow, store) {
  return function* changeAvatar(avatar) {
    try {
      flow.start();

      const imagesRes = yield store.Api.imagesUpload(avatar);
      const avatarId = imagesRes.data.data.id.uuid;

      const res = yield store.Api.updateAvatar(avatarId);

      const normalizedEntities = normalizedIncluded(
        res.data.included,
      );

      getRoot(store).entities.merge(normalizedEntities);

      const user = processJsonApi(res.data.data);
      store.setUser(user);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function updateProfile(flow, store) {
  return function* updateProfile({
    firstName,
    lastName,
    bio,
    phone,
  }) {
    try {
      flow.start();

      const res = yield store.Api.updateProfile({
        firstName,
        lastName,
        bio,
        publicData: {
          phoneNumber: phone,
        },
        displayName: `${firstName} ${lastName}`,
      });

      const user = processJsonApi(res.data.data);
      store.setUser(user);

      flow.success();
    } catch (err) {
      const error = normalizeError(err);

      flow.failed(error, true);
    }
  };
}

function changeEmail(flow, store) {
  return function* changeEmail({ currentPasswordForEmail, email }) {
    try {
      flow.start();

      yield store.Api.changeEmail({
        currentPassword: currentPasswordForEmail,
        email,
      });

      yield store.getCurrentUser.run();

      flow.success();
    } catch (err) {
      const error = normalizeError(err);

      flow.failed(error, true);
    }
  };
}

function changePassword(flow, store) {
  return function* changePassword({ currentPassword, newPassword }) {
    try {
      flow.start();

      yield store.Api.changePassword({
        currentPassword,
        newPassword,
      });

      yield store.getCurrentUser.run();

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function sendVerifyEmail(flow, store) {
  return function* sendVerifyEmail() {
    try {
      flow.start();

      yield store.Api.sendVerifyEmail();

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function verifyEmail(flow, store) {
  return function* verifyEmail(token) {
    try {
      flow.start();
      const data = yield store.Api.verifyEmail(token);
      flow.success();
      return data
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function createStripeAccount(flow, store) {
  return function* createStripeAccount(props) {
    try {
      flow.start();

      console.log('------createStripeAccount', props)
      const bankAccountToken = yield StripeService.createTokenWithBankAccount({
        accountNumber: props.bankAccountNumber,
        countryCode: props.country,
        currency: props.currency,
        routingNumber: props.routingNumber,
        accountHolderName: props.displayName,
        accountHolderType: 'individual',
      });

      const data = new URLSearchParams();
      data.append('account[individual][first_name]', props.firstName);
      data.append('account[individual][last_name]', props.lastName);
      if(props.streetAddress) {
        data.append('account[individual][address][line1]', props.streetAddress);
        data.append('account[individual][address][city]', props.city);
        data.append('account[individual][address][postal_code]', props.postalCode);
        data.append('account[individual][address][country]', props.country);
        data.append('account[individual][dob][day]', props.birthDate);
        data.append('account[individual][dob][month]', props.month);
        data.append('account[individual][dob][year]', props.year);
        data.append('account[individual][email]', props.email);
      }
      data.append('account[business_type]', 'individual');
      data.append('account[tos_shown_and_accepted]', true);

      console.log('data',data)
      let accountToken = yield stripeCustomFetch('POST', 'tokens', data)
      const requestedCapabilities = ['card_payments', 'transfers'];
      const res = yield store.Api.createStripeAccount({
        country: props.country,
        accountToken: accountToken.data.id,
        bankAccountToken: bankAccountToken.tokenId,
        requestedCapabilities
      });
      const createStripeAccount = processJsonApi(res.data.data);

      getRoot(store).userInterface.setShouldShowVerifyModal(true);
      yield store.getCurrentUser.run();
      flow.success();
      return createStripeAccount
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function updateStripeAccount(flow, store) {
  return function* updateStripeAccount(props) {
    try {
      flow.start();
      console.log('------createStripeAccount', props)
      const bankAccountToken = yield StripeService.createTokenWithBankAccount({
        accountNumber: props.bankAccountNumber,
        countryCode: props.country,
        currency: props.currency,
        routingNumber: props.routingNumber,
        accountHolderName: props.displayName,
        accountHolderType: 'individual',
      });

      const requestedCapabilities = ['card_payments', 'transfers'];
      const res = yield store.Api.updateStripeAccount({
        bankAccountToken: bankAccountToken.tokenId,
        requestedCapabilities
      });
      const createStripeAccount = processJsonApi(res.data.data);

      getRoot(store).userInterface.setShouldShowVerifyModal(true);
      yield store.getCurrentUser.run();
      flow.success();
      return createStripeAccount
    } catch (err) {
      flow.failed(err, true);
    }
  };
}


function createStripePaymentMethod(flow, store) {
  return function* createStripePaymentMethod(props) {
    try {
      flow.start();
      console.log('createStripePaymentMethod')

      const {
        cardNumber,
        monthExpiration,
        yearExpiration,
      } = payments.normalizeCardData(
        props.cardNumber,
        props.cardExpiration,
      );

      const data = new URLSearchParams();
      data.append('card[number]', cardNumber);
      data.append('card[exp_month]', monthExpiration);
      data.append('card[exp_year]', yearExpiration);
      data.append('card[cvc]', props.cardCVC);
      data.append('billing_details[name]', props.cardNumber);
      data.append('billing_details[address][country]', props.country);
      data.append('billing_details[address][city]', props.city);
      data.append('billing_details[address][postal_code]', props.postalCode);
      data.append('billing_details[address][state]', props.state);
      data.append('billing_details[address][line1]', props.streetAddress);
      data.append('type', 'card');

      const stripePayment = yield stripeCustomFetch('POST', 'payment_methods', data)

      yield store.Api.createStripePaymentMethod({
        stripePaymentMethodId: stripePayment.data.id
      });
      yield store.getCurrentUser.run();
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function updateStripePaymentMethod(flow, store) {
  return function* updateStripePaymentMethod(props) {
    try {
      flow.start();
      console.log('updateStripePaymentMethod', props)

      yield store.Api.deleteStripePaymentMethod();

      const {
        cardNumber,
        monthExpiration,
        yearExpiration,
      } = payments.normalizeCardData(
        props.cardNumber,
        props.cardExpiration,
      );

      const data = new URLSearchParams();
      data.append('card[number]', cardNumber);
      data.append('card[exp_month]', monthExpiration);
      data.append('card[exp_year]', yearExpiration);
      data.append('card[cvc]', props.cardCVC);
      data.append('type', 'card');

      let stripePayment = yield stripeCustomFetch('POST', 'payment_methods', data)

      yield store.Api.addStripePaymentMethod({
        stripePaymentMethodId: stripePayment.data.id
      });

      yield store.getCurrentUser.run();

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function deleteStripePaymentMethod(flow, store) {
  return function* deleteStripePaymentMethod(id) {
    try {
      flow.start();
      console.log('deleteStripePaymentMethod')

      yield store.Api.deleteStripePaymentMethod();
      getRoot(store).entities.stripePaymentMethod.destroy(id);
      yield store.getCurrentUser.run();
      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

export default ViewerStore;
