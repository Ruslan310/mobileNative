import {
  DrawerButton,TabHeader,
} from "../../components";
import React from 'react';
import T from 'prop-types';
import {observer} from 'mobx-react/custom';
import i18n from '../../i18n';
import {View} from "react-native";
import s from "./styles";
import {Tab, TabView} from "react-native-easy-tabs";
import EmailUserForm from "./components/EmailUserForm/EmailUserForm";
import PasswordUserForm from "./components/PasswordUserForm/PasswordUserForm";
import ProfileUserForm from "./components/ProfileUserForm/ProfileUserForm";

const tabs = [
  {
    id: '1',
    text: i18n.t('userSettings.profileTab'),
  },
  {
    id: '2',
    text: i18n.t('userSettings.emailTab'),
  },
  {
    id: '3',
    text: i18n.t('userSettings.passwordTab'),
  }
];


const UserSettingsScreen = ({
                                     onChangeTabIndex,
                                     selectedTabIndex,
                              goToMyProfile,
                              resendVerificationEmail,
                              onSave,
                              addPhoto,
                              user,
                              isChangingAvatar,
                              isLoading,
                              formRef,
                              contactFormRef,
                              passwordFormRef,
                              profileInitialValues,
                              contactInitialValues,
                              passwordInitialValues,
                                   }) => {

  return (
    <View style={s.container}>
      <View style={s.tabHeaderContainer}>
        <TabHeader
          currentTabIndex={selectedTabIndex}
          onChangeTabIndex={onChangeTabIndex}
          tabs={tabs}
          activeTabStyle={s.activeTabStyle}
          inactiveTabStyle={s.inactiveTabStyle}
          inactiveTextStyle={s.inactiveTextStyle}
          activeTextStyle={s.activeTextStyle}
          containerTabStyle={s.containerTabStyle}
        />
      </View>
      <View style={s.containerTabView}>
        <TabView selectedTabIndex={selectedTabIndex}>
          <Tab lazy>
              <ProfileUserForm
              goToMyProfile={goToMyProfile}
              onSave={onSave}
              addPhoto={addPhoto}
              user={user}
              isChangingAvatar={isChangingAvatar}
              isLoading={isLoading}
              formRef={formRef}
              contactInitialValues={contactInitialValues}
              profileInitialValues={profileInitialValues}
              />
          </Tab>
          <Tab lazy>
            <View style={s.tabHeader}>
              <PasswordUserForm/>
            </View>
          </Tab>
          <Tab lazy>
            <View style={s.tabHeader}>
              <EmailUserForm/>
            </View>
          </Tab>
        </TabView>
      </View>
    </View>
  );
}
UserSettingsScreen.navigationOptions = () => ({
  headerLeft: <DrawerButton/>,
  title: i18n.t('userSettings.userSettings'),
});

UserSettingsScreen.propTypes = {
  onChangeTabIndex: T.func,
  tabIndex: T.number,
  borrowingTransactions: T.array,
  lendingTransactions: T.array,
  totalEarnings: T.func,
  totalSpend: T.func,
};

export default observer(UserSettingsScreen);