import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
    UserSettingsScreen,
    ProfileScreen,
    ProductScreen,
    GalleryScreen,
    CalendarScreen,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';

export default createStackNavigator(
  {
    [screens.UserSettings]: UserSettingsScreen,
    [screens.Product]: ProductScreen,
    [screens.Profile]: ProfileScreen,
    [screens.Gallery]: GalleryScreen,
    [screens.Calendar]: CalendarScreen,
  },
  {
    initialRouteKey: screens.UserSettings,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
