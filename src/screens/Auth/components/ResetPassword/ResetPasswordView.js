import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { Loader } from '../../../../components';
import s from './styles';
import { colors } from '../../../../styles';
import { RootModal, SuccessSendMail, ErrorModal } from './components';

const ResetPasswordModal = ({
  onChange,
  goToLogin,
  onCloseModal,
  resetPassword,
  activeField,
  isLoading,
  isValidEmail,
  email,
  isError,
  isSuccess,
}) => {

  // console.log('isError', isError)
  // console.log('isSuccess', isSuccess)
  // console.log('email', email)
  // console.log('isValidEmail', email)

  const contentComponent = () => {
    // if (isError) return <ErrorModal resetPassword={resetPassword} />;
    if (isSuccess) return <SuccessSendMail onCloseModal={onCloseModal} />;

    return (
      <RootModal
        goToLogin={goToLogin}
        email={email}
        isError={isError}
        onChange={onChange}
        resetPassword={resetPassword}
        isValidEmail={isValidEmail}
        activeField={activeField}
      />
    );
  };

  return (
    <View style={s.container}>
      <View style={s.circle}/>
      <View style={s.viewContainer}>
        {isLoading
          ?
          <View style={s.loaderContainer}>
              <Loader large color={colors.loader.secondary} />
            </View>
          : <React.Fragment>
              {contentComponent()}
            </React.Fragment>
        }
      </View>
    </View>
  );
};

ResetPasswordModal.propTypes = {
  isVisible: T.bool,
  onChange: T.func,
  onCloseModal: T.func,
  email: T.string,
  resetPassword: T.func,
  activeField: T.string,
  isLoading: T.bool,
  isValidEmail: T.bool,
  isError: T.bool,
  isSuccess: T.bool,
};

export default ResetPasswordModal;
