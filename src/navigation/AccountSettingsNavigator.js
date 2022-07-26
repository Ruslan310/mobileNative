import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
  AccountSettingsScreen,
  PaymentMethods,
  PayoutDetails,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.AccountSettings]: AccountSettingsScreen,
    [screens.PaymentMethods]: PaymentMethods,
    [screens.PayoutDetails]: PayoutDetails,
    [screens.PayoutDetails]: PayoutDetails,
  },
  {
    initialRouteKey: screens.AccountSettings,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
