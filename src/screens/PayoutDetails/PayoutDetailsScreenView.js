import s from "./styles";
import {
  DrawerButton,
  HeaderBackButton,
} from "../../components";
import React from 'react';
import T from 'prop-types';
import {observer} from 'mobx-react/custom';
import i18n from '../../i18n';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import UpdateAccountForm from "./components/UpdateAccountForm";
import CreateAccountForm from "./components/CreateAccountForm";

const PayoutDetailsScreen = ({
                               onChange,
                               openStripePayoutDetails,
                               createStripeAccount,
                               updateStripeAccount,
                               bankAccountDate,
                               details_submitted,
                               stripeConnected,
                               last4,
                               paramsInitialValues,
                               isRefreshing,
                               isShowInput,
                               isProgressBankAccount
                             }) => {

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
      containerStyle={s.container}
    >
      {stripeConnected &&
        <UpdateAccountForm
          onChange={onChange}
          openStripePayoutDetails={openStripePayoutDetails}
          updateStripeAccount={updateStripeAccount}
          createStripeAccount={createStripeAccount}
          details_submitted={details_submitted}
          last4={last4}
          paramsInitialValues={paramsInitialValues}
          isShowInput={isShowInput}
          isRefreshing={isRefreshing}
          isProgressBankAccount={isProgressBankAccount}
        />
      }
      {!stripeConnected &&
        <CreateAccountForm
          onChange={onChange}
          openStripePayoutDetails={openStripePayoutDetails}
          createStripeAccount={createStripeAccount}
          details_submitted={details_submitted}
          last4={last4}
          isShowInput={isShowInput}
          isRefreshing={isRefreshing}
          isProgressBankAccount={isProgressBankAccount}
        />
      }

    </KeyboardAwareScrollView>
  );
}

PayoutDetailsScreen.propTypes = {
  onChangeTabIndex: T.func,
  tabIndex: T.number,
  borrowingTransactions: T.array,
  lendingTransactions: T.array,
  totalEarnings: T.func,
  totalSpend: T.func,
};

export default observer(PayoutDetailsScreen);