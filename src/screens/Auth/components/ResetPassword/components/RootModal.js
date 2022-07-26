import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import {
  Text,
  Button,
  InputForm,
  IconFonts, TextTouchable,
} from '../../../../../components';
import s from '../styles';
import i18n from '../../../../../i18n';
import { colors } from '../../../../../styles';
import IconCard from "../../../../../components/IconCard/IconSvg";
import FormInput from "../../../../../components/FormInput/FormInput";
import {NavigationService} from "../../../../../services";

const RootModal = ({
  onChange,
  goToLogin,
  email,
  resetPassword,
  activeField,
  isValidEmail,
}) => (
  <View>
    <View style={s.topIcon}>
      <IconCard type="forgot-password" />
    </View>
    <Text bold largeSize black style={s.heading}>
      {i18n.t('auth.resetPasswordHeading')}
    </Text>
    <Text style={s.text}>
      {i18n.t('auth.resetPasswordPreInstruction')}
    </Text>
    <FormInput
      containerStyle={s.inputContainer}
      placeholder={i18n.t('auth.emailPlaceholder')}
      title={i18n.t('auth.email')}
      value={email}
      active={activeField === 'email'}
      onFocus={() => onChange('activeField', 'email')}
      onBlur={() => onChange('activeField', '')}
      onChangeText={(value) => onChange('email', value)}
      autoCapitalize="none"
      keyboardType="email-address"
    />

    <Text medium gray style={s.text}>
      {i18n.t('auth.subTextSendMail')}
    </Text>
    <TextTouchable red style={s.textToLogin} onPress={goToLogin}>
      {i18n.t('auth.goToLogin')}
    </TextTouchable>

    <Button
      primary
      onPress={() => resetPassword()}
      containerStyle={s.buttonContainer}
      disabled={!isValidEmail}
      title={i18n.t('auth.sendResetEmail')}
    />
  </View>
);

RootModal.propTypes = {
  onChange: T.func,
  email: T.string,
  resetPassword: T.func,
  activeField: T.string,
  isValidEmail: T.bool,
};

export default RootModal;
