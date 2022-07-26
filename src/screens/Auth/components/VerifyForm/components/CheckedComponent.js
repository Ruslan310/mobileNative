import React from 'react';
import {View} from "react-native";
import s from "../../ResetPassword/styles";
import IconCard from "../../../../../components/IconCard/IconSvg";
import i18n from "../../../../../i18n";
import FormInput from "../../../../../components/FormInput/FormInput";
import {Button, Loader, Text, TextTouchable} from "../../../../../components";

const CheckedComponent = ({
                            goToLogin,
                            onChange,
                            email,
                            firstName,
                            checkedCode,
                            isSend,
                            resentEmail,
                            activeField,
                            root
                          }) => (
  <View style={{paddingBottom: 30}}>
    <View style={s.topIcon}>
      <IconCard type="verify-mail-checked"/>
    </View>
    <Text bold largeSize black style={s.heading}>
      {`${firstName}, ${i18n.t('verify.verifyMailTitle')}`}
    </Text>
    <Text style={s.text}>
      {i18n.t('verify.verifyMailSubText')}
    </Text>
    <View style={s.verifyText}>
      <Text style={s.text}>
        {i18n.t('verify.verifyMailSubTextLine')}
      </Text>
      <Text bold>
        {email}
      </Text>
    </View>

    <FormInput
      containerStyle={s.verifyCode}
      placeholder={i18n.t('verify.codePlaceholder')}
      title={i18n.t('verify.code')}
      value={root}
      active={activeField === 'root'}
      onFocus={() => onChange('activeField', 'root')}
      onBlur={() => onChange('activeField', '')}
      onChangeText={(value) => onChange('root', value)}
      autoCapitalize="none"
      keyboardType="numeric"
      maxLength={16}
    />

    <Button
      primary
      onPress={checkedCode}
      disabled={!(root && root.length === 16)}
      containerStyle={s.verifyCode}
      title={i18n.t('verify.verifyMailButton')}
    />

    <View style={s.verifyText}>
      <Text medium gray>
        {i18n.t('verify.textReset')}
      </Text>
      {isSend
        ? <Loader />
        : <TextTouchable red onPress={resentEmail}>
            {i18n.t('verify.textResetTouched')}
          </TextTouchable>
      }
    </View>

    <View style={s.verifyText}>
      <Text medium gray>
        {i18n.t('verify.errorTextReset')}
      </Text>
      {isSend
        ? <Loader />
        : <TextTouchable red onPress={goToLogin}>
            {i18n.t('verify.errorTextResetTouched')}
          </TextTouchable>
      }

    </View>
  </View>
);

export default CheckedComponent;