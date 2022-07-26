import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import { Text, IconFonts } from '../../../../components';
import s from './styles';
import i18n from '../../../../i18n';
import { colors } from '../../../../styles';

const EmailVerifiedMessage = ({ resendVerificationEmail }) => (
  <View style={s.container}>
    <IconFonts
      name="error"
      size={15}
      tintColor={colors.emailVerifiedMessage.iconColor}
    />
    <View style={s.textContainer}>
      <Text gray xsmallSize>
        {`${i18n.t('userSettings.noVerifiedEmail')} `}
        <Text
          style={s.link}
          xsmallSize
          onPress={resendVerificationEmail}
        >
          {i18n.t('userSettings.noVerifiedEmailLink')}
        </Text>
      </Text>
    </View>
  </View>
);

EmailVerifiedMessage.propTypes = {
  resendVerificationEmail: T.func,
};

export default EmailVerifiedMessage;
