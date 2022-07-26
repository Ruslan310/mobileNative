import React from 'react';
import {View} from "react-native";
import s from "../../ResetPassword/styles";
import IconCard from "../../../../../components/IconCard/IconSvg";
import i18n from "../../../../../i18n";
import {Button, Text} from "../../../../../components";
import {NavigationService} from "../../../../../services";

const SuccessComponent = ({firstName}) => {
  return (
    <View>
      <View style={s.topIcon}>
        <IconCard type="verify-mail-success"/>
      </View>
      <Text bold largeSize black style={s.heading}>
        {`${i18n.t('verify.successVerifyTitle')} ${firstName}`}
      </Text>
      <Text style={s.text}>
        {i18n.t('verify.successVerifySubTitle')}
      </Text>

      <Button
        primary
        onPress={() => NavigationService.navigateToApp()}
        containerStyle={{marginTop: 30, marginBottom: 30}}
        title={i18n.t('verify.goToApp')}
      />
    </View>
  );
};

export default SuccessComponent;