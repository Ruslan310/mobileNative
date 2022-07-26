import {
  DrawerButton,TabHeader,
} from "../../components";
import React from 'react';
import T from 'prop-types';
import {observer} from 'mobx-react/custom';
import i18n from '../../i18n';
import {View} from "react-native";
import PaymentMethodsScreenView from "../PaymentMethods/PaymentMethodsScreenContainer";
import PayoutDetailsScreenView from "../PayoutDetails/PayoutDetailsScreenContainer";
import s from "./styles";
import {Tab, TabView} from "react-native-easy-tabs";

const tabs = [
  {
    id: '1',
    text: i18n.t('payoutDetails.titleScreen'),
  },
  {
    id: '2',
    text: i18n.t('paymentMethods.titleScreen'),
  }
];


const AccountSettingsScreenView = ({
                                     onChangeTabIndex,
                                     selectedTabIndex,
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
            <View style={s.tabHeader}>
              <PayoutDetailsScreenView/>
            </View>
          </Tab>
          <Tab lazy>
            <View style={s.tabHeader}>
              <PaymentMethodsScreenView/>
            </View>
          </Tab>
        </TabView>
      </View>
    </View>
  );
}
AccountSettingsScreenView.navigationOptions = () => ({
  headerLeft: <DrawerButton/>,
  title: i18n.t('accountSettings.accountSettings'),
});

AccountSettingsScreenView.propTypes = {
  onChangeTabIndex: T.func,
  tabIndex: T.number,
  borrowingTransactions: T.array,
  lendingTransactions: T.array,
  totalEarnings: T.func,
  totalSpend: T.func,
};

export default observer(AccountSettingsScreenView);