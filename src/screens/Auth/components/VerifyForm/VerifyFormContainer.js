import {
  compose,
  withStateHandlers,
  withHandlers,
  hoistStatics,
} from 'recompose';
import {inject} from 'mobx-react';
import VerifyFormView from './VerifyFormView';
import {withParamsToProps} from "../../../../utils/enhancers";
import {AlertService} from "../../../../services";


export default hoistStatics(
  compose(
    withParamsToProps('firstName'),
    withParamsToProps('email'),
    inject(({ viewer }, { firstName, email }) => ({
      verifyEmail: viewer.verifyEmail,
      isError: viewer.verifyEmail.isError,
      errorMessage: viewer.verifyEmail.errorMessage,
      sendVerifyEmail: viewer.sendVerifyEmail,
      firstName: firstName,
      email: email,
    })),

    withStateHandlers(
      {
        isSend: false,
        isLoading: false,
        isSuccess: false,
        notValidCode: false,
        activeField: '',
        root: '',
      },
      {
        onChange: () => (field, value) => ({
          [field]: value,
        }),
      },
    ),

    withHandlers({
      checkedCode: (props) => async () => {
        try {
          props.onChange('isLoading', true)
          const verify = await props.verifyEmail.run(props.root)

          if(verify) {
            props.onChange('isSuccess', true)
          }
          props.onChange('isLoading', false)
        } catch (err) {
          AlertService.showAlert(
            'Enter code is wrong',
          )
        }
      },
      resentEmail: (props) => async () => {
        try {
          props.onChange('isSend', true)
          await props.sendVerifyEmail.run();
          props.onChange('isSend', false)
          props.onChange('activeField', '')
        } catch (err) {
          AlertService.showAlert(
            'Some wrong',
          )
        }
      },
    }),
  )
)(VerifyFormView);
