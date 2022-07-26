import React from 'react';
import {
  branch,
  compose,
  defaultProps,
  hoistStatics, lifecycle,
  renderComponent, withHandlers,
  withStateHandlers
} from "recompose";
import {withParamsToProps} from "../../utils/enhancers";
import {inject} from "mobx-react";
import PaymentMethodsScreenView from "./PaymentMethodsScreenView"
import {ScreenLoader} from "../../components";
import R from "ramda";
import i18n from "../../i18n";
import {AlertService} from "../../services";

export default hoistStatics(
  compose(
    withParamsToProps('user'),

    inject(({viewer}) => ({
        user: viewer.user,
        stripeCustomer: viewer.user.relationships?.stripeCustomer,
        defaultPaymentMethod: viewer.user.relationships.stripeCustomer?.relationships?.defaultPaymentMethod,
        getCurrentUser: viewer.getCurrentUser,
        createStripePaymentMethod: viewer.createStripePaymentMethod,
        updateStripePaymentMethod: viewer.updateStripePaymentMethod,
        deleteStripePaymentMethod: viewer.deleteStripePaymentMethod,
        isError:
          R.pathOr(
            false,
            ['updateStripePaymentMethod', 'isError'],
            viewer,
          ),
      })
    ),
    defaultProps({
      formRef: React.createRef(),
    }),
    withStateHandlers(
      {
        isRefreshing: false,
        isPaymentMethodForm: false,
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),
    withHandlers({
      createStripePaymentMethod: (props) => async (params) => {
        try {
          props.onChange('isRefreshing', true);
          await props.createStripePaymentMethod.run(params);
          props.onChange('isRefreshing', false);
          props.onChange('isPaymentMethodForm', false);
        } catch (err) {
          props.onChange('isRefreshing', false);
          AlertService.showSomethingWentWrong();
        }
      },
      updateStripePaymentMethod: (props) => async (params) => {
        try {
          props.onChange('isRefreshing', true);
          await props.updateStripePaymentMethod.run(params);
          props.onChange('isRefreshing', false);
          props.onChange('isPaymentMethodForm', false);
        } catch (err) {
          AlertService.showSomethingWentWrong();
          props.onChange('isRefreshing', false);
        }
      },
      deleteStripePaymentMethod: (props) => async (id) => {
        try {
          props.onChange('isRefreshing', true);
          await props.deleteStripePaymentMethod.run(id);
          props.onChange('isRefreshing', false);
          props.onChange('isPaymentMethodForm', true);
        } catch (err) {
          props.onChange('isRefreshing', false);
          AlertService.showSomethingWentWrong();
        }
      },
    }),
    lifecycle({
      componentDidMount() {
        this.props.onChange('isPaymentMethodForm', !this.props.defaultPaymentMethod);
      },
    }),
    branch(
      (props) => !props.isRefreshing && props.isLoading,
      renderComponent(ScreenLoader),
    ),
  ),
)(PaymentMethodsScreenView);