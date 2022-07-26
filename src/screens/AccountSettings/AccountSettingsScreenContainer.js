import {compose, hoistStatics, lifecycle, withHandlers, withStateHandlers} from "recompose";
import {withModal, withParamsToProps} from '../../utils/enhancers';
import {inject} from "mobx-react";
import {stripeCustomFetch} from "../../utils/customFetch";
import AccountSettingsScreenView from "./AccountSettingsScreenView"

const type_verified = "custom_account_verification"
const type_onboarding = "account_onboarding"

export default hoistStatics(
  compose(
    inject(({viewer}) => ({
        user: viewer.user,
      })
    ),
    withStateHandlers(
      {
        isRefreshing: false,
        selectedTabIndex: 0,
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
        onChangeTabIndex: () => (index) => ({
          selectedTabIndex: index,
        }),
      },
    ),
  ),
)(AccountSettingsScreenView);