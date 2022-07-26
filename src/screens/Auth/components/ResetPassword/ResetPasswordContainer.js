import {
  compose,
  withStateHandlers,
  withHandlers,
  withPropsOnChange,
} from 'recompose';
import { inject } from 'mobx-react';
import ResetPassword from './ResetPasswordView';
import { isValidEmail } from '../../../../utils/regExp';
import {NavigationService} from "../../../../services";
import screens from "../../../../navigation/screens";

export default compose(
  inject((stores) => ({
    auth: stores.auth,
    isLoading: stores.auth.resetPassword.inProgress,
    // isError: stores.auth.resetPassword.errorMessage,
  })),

  withStateHandlers(
    {
      email: '',
      activeField: '',
      isValidEmail: false,
      isError: false,
      isSuccess: false,
    },
    {
      onChange: () => (field, value) => ({
        [field]: value,
      }),
    },
  ),

  withHandlers({
    onCloseModal: (props) => () => {
      props.onCloseModal();
      props.auth.resetPassword.cleanError();
      props.onChange('isSuccess', false);
      props.onChange('email', '');
    },

    goToLogin: (props) => () =>
      NavigationService.navigateTo(screens.SignIn),

    resetPassword: (props) => async () => {
      const data = await props.auth.resetPassword.run({
        email: props.email,
      });

      console.log('======props', props)
      console.log('datas', data)
      // if (props.isError) {
      if (data) {
        console.log('6666666666666')
        props.onChange('isSuccess', true);
        props.onChange('isError', false);
      } else {
        props.onChange('isError', true);
      }

      props.onChange('activeField', '');
    },
  }),

  withPropsOnChange(['email'], (props) => {
    props.onChange('isValidEmail', isValidEmail(props.email));
  }),
)(ResetPassword);
