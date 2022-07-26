import { createDrawerNavigator } from 'react-navigation';
import screens from './screens';
import { Drawer } from '../components';
import HomeNavigator from './HomeNavigator';
import MyListingsNavigator from './MyListingsNavigator';
import UserSettingsNavigator from './UserSettingsNavigator';
import AccountSettingsNavigator from './AccountSettingsNavigator';
import ProfileNavigator from './ProfileNavigator';
import InboxNavigator from './InboxNavigator';
import RentalsNavigator from './RentalsNavigator';

export default createDrawerNavigator(
  {
    [screens.HomeStack]: HomeNavigator,
    [screens.MyListingsStack]: MyListingsNavigator,
    [screens.ProfileStack]: ProfileNavigator,
    [screens.UserSettingsStack]: UserSettingsNavigator,
    [screens.AccountSettingsStack]: AccountSettingsNavigator,
    [screens.InboxStack]: InboxNavigator,
    [screens.RentalsStack]: RentalsNavigator,
  },
  {
    initialRouteName: screens.HomeStack,
    contentComponent: Drawer,
    drawerWidth: 300,
    headerMode: 'screen',
  },
);
