import {
  compose,
  withHandlers,
  withPropsOnChange,
  withState, withStateHandlers,
} from 'recompose';
import { inject } from 'mobx-react/native';
import DrawerView from './DrawerView';
import { AlertService, NavigationService } from '../../services';
import i18n from '../../i18n';
import screens from '../../navigation/screens';
import { withLoadingModal } from '../../utils/enhancers';

export default compose(
  inject((stores) => {
    return ({
      isAuthorized: stores.auth.isAuthorized,
      logout: stores.auth.logout,
      user: stores.viewer.user,
      getCurrentUser: stores.viewer.getCurrentUser,
      isLogout: stores.auth.logout.inProgress,
    })
  }),

  withState('items', 'setItems', []),

  withStateHandlers(
    {
      activeIcon: 'home',
    },
    {
      onChangeTabIndex: () => (index) => ({
        activeIcon: index,
      }),
    },
  ),

  withHandlers({
    logout: (props) => () =>
      AlertService.logOut(() => props.logout.run()),
    goToLogin: () => () => NavigationService.navigateToAuth(),
    goToAddNewItem: () => () =>
      NavigationService.navigateTo(screens.AddNewItem),
    goToProfile: () => (user) => {
      NavigationService.navigateTo(screens.ownProfile, {
        user,
        isDrawerButton: true,
      });
      NavigationService.closeDrawer();
    },
  }),

  withPropsOnChange(['isAuthorized'], (props) => {
    const unauthorizedItems = [
      {
        screen: screens.Home,
        title: i18n.t('drawer.home'),
        iconName: 'home',
      },
      {
        screen: screens.Help,
        title: i18n.t('drawer.help'),
        iconName: 'help',
      },
      {
        screen: screens.Auth,
        title: i18n.t('drawer.login'),
        iconName: 'log-out',
        onPress: () => props.goToLogin(),
      },
    ];

    const authorizedItems = [
      {
        screen: screens.Home,
        title: i18n.t('drawer.home'),
        iconName: 'home',
      },
      {
        screen: screens.MyListings,
        title: i18n.t('drawer.myListings'),
        iconName: 'list',
      },
      {
        screen: screens.Inbox,
        title: i18n.t('drawer.inbox'),
        iconName: 'inbox',
      },
      {
        screen: screens.Rentals,
        title: i18n.t('drawer.rentals'),
        iconName: 'rentals',
      },
      {
        screen: screens.UserSettings,
        title: i18n.t('drawer.userSettings'),
        iconName: 'userSettings',
        // func: props.getCurrentUser,
      },
      {
        screen: screens.AccountSettings,
        title: i18n.t('drawer.accountSettings'),
        iconName: 'accountSettings',
      },
      {
        screen: screens.Help,
        title: i18n.t('drawer.help'),
        iconName: 'help',
      },
      {
        screen: 'LogOut',
        title: i18n.t('drawer.logout'),
        iconName: 'log-out',
        onPress: () => props.logout(),
      },
    ];

    if (props.isAuthorized) {
      props.setItems(authorizedItems);
    } else {
      props.setItems(unauthorizedItems);
    }
  }),

  withLoadingModal((props) => props.isLogout),
)(DrawerView);
