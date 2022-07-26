import { createStackNavigator } from 'react-navigation';
import screens from './screens';
import {
  AuthScreen,
  ResetPasswordScreen,
  SignInScreen,
  SignUpScreen,
  VerifyFormScreen,
} from '../screens';
import { defaultNavigationOptions } from './NavigationOptions';


export default createStackNavigator(
  {
    [screens.Auth]: AuthScreen,
    [screens.SignUp]: SignUpScreen,
    [screens.SignIn]: SignInScreen,
    [screens.ResetPassword]: ResetPasswordScreen,
    [screens.VerifyForm]: VerifyFormScreen,
  },
  {
    initialRouteKey: screens.Auth,
    headerMode: 'screen',
    defaultNavigationOptions,
  },
);
