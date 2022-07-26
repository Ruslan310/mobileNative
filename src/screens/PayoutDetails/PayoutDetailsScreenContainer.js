import {compose, hoistStatics, lifecycle, withHandlers, withProps, withStateHandlers} from "recompose";
import {withModal, withParamsToProps} from '../../utils/enhancers';
import {inject} from "mobx-react";
import PayoutDetailsScreenView from "./PayoutDetailsScreenView"
import StripeModalVerified from "./components/StripeModalVerified";
import {stripeCustomFetch} from "../../utils/customFetch";
import {countries} from "../../constants";
import {AlertService} from "../../services";


const type_verified = "custom_account_verification"
const type_onboarding = "account_onboarding"

export default hoistStatics(
  compose(
    withParamsToProps('user'),

    inject(({viewer}) => ({
        user: viewer.user.profile,
        stripeAccountId: viewer.user.relationships.stripeAccount?.stripeAccountId,
        stripeConnected: viewer.user.stripeConnected,
        createStripeAccount: viewer.createStripeAccount,
        updateStripeAccount: viewer.updateStripeAccount,
        stripeAccountIdNew: viewer.user.stripeAccountId,
      })
    ),
    withStateHandlers(
      {
        isVisibleVerifiedModal: false,
        isVisibleInformationModal: false,
        isProgressBankAccount: false,
        isShowInput: false,
        details_submitted: false,
        transfers_enabled: false,
        disabledCountry: false,
        last4: '',
        bankAccountDate: '',
        stripeUrl: '',
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),
    withProps(
      ({bankAccountDate}) => {
        const index = countries.stripeCountriesList.findIndex(i => i.key === bankAccountDate?.country);
        const country = countries.stripeCountriesList[index]?.name;

        const paramsInitialValues = {
          country: country || '',
        };
        return {
          paramsInitialValues
        };
      },
    ),
    withHandlers({
      openStripePayoutDetails: (props) => async () => {
        const data = new URLSearchParams();
        data.append('account', props.stripeAccountId);
        data.append('refresh_url', 'https://www.example.com/failure');
        data.append('return_url', 'https://www.example.com/success');
        data.append('type', "account_onboarding");

        const stripePayout = await stripeCustomFetch('POST', 'account_links', data)
        if (stripePayout) {
          props.onChange('isVisibleVerifiedModal', true);
          props.onChange('stripeUrl', stripePayout?.data?.url);
        }
      },
      fetchStripeAccount: (props) => async () => {
        if (props.stripeAccountId) {
          props.onChange('isProgressBankAccount', true);
          const {data} = await stripeCustomFetch('GET', `accounts/${props.stripeAccountId}`) || {}
          props.onChange('isProgressBankAccount', false);
          props.onChange('bankAccountDate', data);
          props.onChange('last4', data.external_accounts?.data[0].last4);
          props.onChange('details_submitted', data.details_submitted);
          props.onChange('transfers_enabled', data.transfers_enabled);
        } else {

        }
      },
      createStripeAccount: (props) => async (values) => {
        try {
          props.onChange('isRefreshing', true);
          const index = countries.stripeCountriesList.findIndex(i => i.title === values.country);
          const countryKey = countries.stripeCountriesList[index].key;
          const countryCurrency = countries.stripeCountriesList[index].currency;
          const {stripeAccountId} = await props.createStripeAccount.run({
            ...props.user,
            ...values,
            currency: countryCurrency,
            country: countryKey,
          }) || {}
          const {data} = await stripeCustomFetch('GET', `accounts/${stripeAccountId}`) || {}
          props.onChange('bankAccountDate', data);
          props.onChange('last4', data.external_accounts?.data[0].last4);
          props.onChange('isRefreshing', false);
          if (props.last4) {
            props.onChange('isShowInput', false);
          }
        } catch (err) {
          console.log('----err', err)
          props.onChange('isRefreshing', false);
          AlertService.showSomethingWentWrong();
          this.props.fetchStripeAccount()
        }
      },
      updateStripeAccount: (props) => async (values) => {
        try {
          props.onChange('isRefreshing', true);
          const index = countries.stripeCountriesList.findIndex(i => i.title === values.country);
          const countryKey = countries.stripeCountriesList[index].key;
          const countryCurrency = countries.stripeCountriesList[index].currency;
          await props.updateStripeAccount.run({
            ...props.user,
            ...values,
            currency: countryCurrency,
            country: countryKey,
          })
          const {data} = await stripeCustomFetch('GET', `accounts/${props.stripeAccountId}`) || {}
          props.onChange('bankAccountDate', data);
          props.onChange('last4', data.external_accounts?.data[0].last4);
          props.onChange('isRefreshing', false);
          if (props.last4) {
            props.onChange('isShowInput', false);
          }
        } catch (err) {
          console.log('----err', err)
          props.onChange('isRefreshing', false);
          AlertService.showSomethingWentWrong();
          this.props.fetchStripeAccount()
        }
      },
    }),
    withModal(
      (props) => ({
        isVisible: props.isVisibleVerifiedModal,
        stripeUrl: props.stripeUrl,
        onCloseModal: () => {
          props.onChange('isVisibleVerifiedModal', false);
          props.onChange('stripeUrl', '');
          props.fetchStripeAccount()
          if (props.bankAccountDate) {
            props.onChange('isShowInput', false);
          }
        },
      }),
      StripeModalVerified,
    ),
    withModal(
      (props) => ({
        isVisible: props.isVisibleInformationModal,
        stripeUrl: 'https://stripe.com/legal/connect-account',
        onCloseModal: () => {
          props.onChange('isVisibleInformationModal', false);
          props.onChange('stripeUrl', '');
          props.fetchStripeAccount()
          if (props.bankAccountDate) {
            props.onChange('isShowInput', false);
          }
        },
      }),
      StripeModalVerified,
    ),
    lifecycle({
      componentDidMount() {
        if (this.props.stripeConnected) {
          this.props.fetchStripeAccount()
          this.props.onChange('isShowInput', false)
        }
      },
    }),
  ),
)(PayoutDetailsScreenView);