import React from 'react';
import {View} from 'react-native';
import T from 'prop-types';
import s from './styles';
import {
  InputForm,
  Button,
  TextTouchable,
  Text,
  HeaderBackButton,
} from '../../../../components';
import {SafeAreaView} from 'react-navigation';
import i18n from '../../../../i18n';
import AuthWith from "../AuthWith/AuthWithView";
import FormInput from "../../../../components/FormInput/FormInput";

const SignInFormView = ({
                          email,
                          password,
                          goToResetPassword,
                          onChange,
                          activeField,
                          isValidFields,
                          signIn,
                          isSigningIn,
                        }) => (
  <SafeAreaView style={s.containerSafeAreaView}>
    <View style={s.circle}/>
    <View style={s.headerTitle}>
      <Text largeSize bold white >
        {i18n.t('auth.login')}
      </Text>
      <Text mediumSize white style={{textAlign: "center"}}>
        {i18n.t('auth.loginSubtitle')}
      </Text>
    </View>
    <View style={s.tabViewContainer}>
      <View>
        <FormInput
          placeholder={i18n.t('auth.emailPlaceholder')}
          containerStyle={s.inputContainerEmail}
          title={i18n.t('auth.email')}
          value={email}
          active={activeField === 'email'}
          onFocus={() => onChange('activeField', 'email')}
          onBlur={() => onChange('activeField', '')}
          onChangeText={(text) => onChange('email', text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <FormInput
          placeholder={i18n.t('auth.passwordPlaceholder')}
          containerStyle={s.inputContainerPassword}
          title={i18n.t('auth.password')}
          value={password}
          active={activeField === 'password'}
          onFocus={() => onChange('activeField', 'password')}
          onBlur={() => onChange('activeField', '')}
          onChangeText={(text) => onChange('password', text)}
          inputType='password'
          customIconName='pass'
          autoCapitalize="none"
        />
      </View>
      <View style={s.textWithTouchableContainer}>
        <Text style={[s.text]} mediumSize gray>
          {i18n.t('auth.resetPassword')}
        </Text>
        <TextTouchable mediumSize red onPress={goToResetPassword}>
          {i18n.t('auth.resetPasswordLink')}
        </TextTouchable>
      </View>
      <Button
        primary
        containerStyle={s.buttonContainer}
        disabled={!isValidFields || isSigningIn}
        onPress={() => signIn()}
        isLoading={isSigningIn}
        title={i18n.t('auth.login')}
      />
      <AuthWith/>
    </View>
  </SafeAreaView>
);

SignInFormView.navigationOptions = () => ({
  headerLeft: <HeaderBackButton/>,
});

SignInFormView.propTypes = {
  onChangeTabIndex: T.func,
  onChange: T.func.isRequired,
  email: T.string,
  password: T.string,
  activeField: T.string,
  isValidFields: T.bool,
  signIn: T.func,
  isSigningIn: T.bool,
};

export default SignInFormView;
