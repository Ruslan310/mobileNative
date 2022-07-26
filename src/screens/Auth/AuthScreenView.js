import React from 'react';
import { View, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from 'react-navigation';
import T from 'prop-types';
import s from './styles';
import {Logo, Text, Button} from '../../components';
import { isSmallDevice, isLargeDevice, isAndroid } from '../../utils';
import i18n from '../../i18n';
import {NavigationService} from "../../services";
import screens from "../../navigation/screens";
import AuthWith from "./components/AuthWith/AuthWithView";

const smallDevice = isSmallDevice();
const largeDevice = isLargeDevice();
const isAndroidDevice = isAndroid();


const AuthScreen = ({ onChangeTabIndex, selectedTabIndex, onSkip }) => {


  return(
    <KeyboardAvoidingView
      behavior="position"
      style={s.keyboardAvoidingView}
      contentContainerStyle={s.keyboardAvoidingViewContentContainer}
      keyboardVerticalOffset={isAndroidDevice ? -30 : -50}
    >
      <SafeAreaView style={s.containerSafeAreaView}>
        <View style={s.circle}/>
        <Logo icon customStyle={{marginTop: 80}}/>
        <View>
          <Text
            style={[
              s.heading,
              smallDevice && s.headingSmall,
              largeDevice && s.headingLarge,
            ]}
            xlargeSize={!smallDevice}
            mediumSize={smallDevice}
            white
          >
            {i18n.t("auth.heading")}
          </Text>
        </View>

        <View style={s.tabViewContainer}>
          <View style={s.containerHeaderTitle}>
            <Text largeSize style={s.headerTitle}>
              {i18n.t('auth.mainTitle')}
            </Text>
            <Text mediumSize style={s.subTitle}>
              {i18n.t('auth.mainSubTitle')}
            </Text>
          </View>

          <Button
            primary
            titleStyle={{color: "#FFFFFF", fontWeight: "500"}}
            buttonStyle={s.buttonIn}
            title={i18n.t('auth.signUp')}
            onPress={() => NavigationService.navigateTo(screens.SignUp)}
          />

          <Button
            primary
            titleStyle={s.loginButtonText}
            buttonStyle={s.buttonOut}
            title={i18n.t('auth.login')}
            onPress={() => NavigationService.navigateTo(screens.SignIn)}
          />

          <AuthWith />

        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
};

AuthScreen.navigationOptions = () => ({
  header: null,
});

export default AuthScreen;
