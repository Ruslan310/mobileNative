import React from 'react';
import {View} from 'react-native';
import T from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import s from './styles';
import {
  Button,
  TextTouchable,
  Text,
  Form,
  FormInput, DrawerButton, HeaderBackButton,
} from '../../../../components';
import i18n from '../../../../i18n';
import {SignUpSchema} from '../../../../validators/schemes';
import SignInFormView from "../SignInForm/SignInFormView";
import AuthWith from "../AuthWith/AuthWithView";

const SignUpForm = ({
                      signUp,
                      onChange,
                      isSigningUp,
                      formRef,
                      goToVerifyForm,
                    }) => (
  <KeyboardAwareScrollView
    keyboardShouldPersistTaps="handled"
    extraScrollHeight={30}
    bounces={false}
    contentContainerStyle={s.borderRadius}
  >
    <View style={s.container}>
      <View style={s.circle}/>
      <View style={s.headerTitle}>
        <Text largeSize bold white style={{marginBottom: 7}}>
          {i18n.t('auth.signUp')}
        </Text>
        <Text mediumSize white style={{textAlign: "center"}}>
          {i18n.t('auth.signUpSubtitle')}
        </Text>
      </View>

      <View style={s.tabViewContainer}>
        <Form
          validateOnBlur
          enableReinitialize
          validationSchema={SignUpSchema}
          ref={formRef}
          onSubmit={signUp}
        >
          {({handleSubmit, isValid}) => (
            <React.Fragment>
              <FormInput.Field
                placeholder={i18n.t('auth.emailPlaceholder')}
                containerStyle={s.inputContainer}
                title={i18n.t('auth.email')}
                name="email"
                autoCapitalize="none"
                keyboardType="email-address"
                maxLength={100}
              />

              <FormInput.Field
                placeholder={i18n.t('auth.firstNamePlaceholder')}
                title={i18n.t('userSettings.firstName')}
                containerStyle={s.inputContainer}
                name="firstName"
                maxLength={100}
              />
              <FormInput.Field
                placeholder={i18n.t('auth.lastNamePlaceholder')}
                title={i18n.t('userSettings.lastName')}
                containerStyle={s.inputContainer}
                name="lastName"
                maxLength={100}
              />

              <FormInput.Field
                placeholder={i18n.t('auth.passwordPlaceholder')}
                containerStyle={s.inputContainer}
                title={i18n.t('auth.password')}
                name="password"
                inputType='password'
                customIconName='pass'
                autoCapitalize="none"
              />
              <View style={s.textWithTouchableContainer}>
                <Text style={[s.text]} smallSize gray>
                  {i18n.t('auth.termsAndConditions')}
                </Text>
                <TextTouchable smallSize red onPress={() => onChange('isTermsAndConditions', true)}>
                  {i18n.t('auth.termsAndConditionsLink')}
                </TextTouchable>
              </View>
              <React.Fragment>

                {/*<Button*/}
                {/*  primary*/}
                {/*  containerStyle={s.buttonContainer}*/}
                {/*  onPress={goToVerifyForm}*/}
                {/*  isLoading={isSigningUp}*/}
                {/*  title='for test verify'*/}
                {/*/>*/}

                <Button
                  primary
                  containerStyle={s.buttonContainer}
                  disabled={!isValid}
                  onPress={handleSubmit}
                  isLoading={isSigningUp}
                  title={i18n.t('auth.signUp')}
                />
              </React.Fragment>
            </React.Fragment>
          )}
        </Form>

        <AuthWith/>

      </View>
    </View>
  </KeyboardAwareScrollView>
);

SignUpForm.navigationOptions = () => ({
  headerLeft: <HeaderBackButton/>,
});

SignUpForm.propTypes = {
  onChangeTabIndex: T.func,
  signUp: T.func,
  isSigningUp: T.bool,
  formRef: T.any,
};

export default SignUpForm;
