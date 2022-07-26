import React from 'react';
import {
    compose,
    withHandlers,
    defaultProps,
    hoistStatics, withStateHandlers,
} from 'recompose';
import { inject } from 'mobx-react';
import SignUpFormView from './SignUpFormView';
import {withModal} from "../../../../utils/enhancers";
import TermsAndConditionsModal from "../TermsAndConditionsModal/TermsAndConditionsContainer";
import {NavigationService} from "../../../../services";
import screens from "../../../../navigation/screens";

export default hoistStatics(
  compose(
    inject((stores) => ({
      auth: stores.auth,
      isSigningUp: stores.auth.registerUser.inProgress,
    })),
    defaultProps({
      formRef: React.createRef(),
    }),

    withStateHandlers({
            isTermsAndConditions: false,
        },
        {
            onChange: () => (field, value) => ({
                [field]: value,
            }),
        }),

    withHandlers({
      signUp: (props) => ({
        lastName,
        firstName,
        email,
        password,
      }) => {
        try {
          props.auth.registerUser.run({
            lastName,
            firstName,
            email,
            password,
          });
        } catch (err) {
          console.log(err);
        }
      },
      goToVerifyForm: (props) => () =>
        NavigationService.navigateTo(screens.VerifyForm),
      onCloseModal: (props) => () =>
          props.onChange('isTermsAndConditions', false),
    }),
      withModal(
          (props) => ({
              isVisible: props.isTermsAndConditions,
              onCloseModal: props.onCloseModal,
          }),
          TermsAndConditionsModal,
      ),
  ),
)(SignUpFormView);
