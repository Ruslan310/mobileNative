import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isAndroid } from '../../utils';

const isAndroidDevice = isAndroid();

export default StyleSheet.create({

  safeAreaViewContainer: {
    backgroundColor: colors.settingsScreen.backgroundColor,
  },
  inputContainer: {
    marginBottom: dimensions.indent * 1.1,
  },
  inputContainerFirstAndLastNames: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: dimensions.indent * 1.1,
  },
  titlePayText: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: dimensions.indent * 1.1,
  },
  bioInputContainer: {
    marginBottom: 20
  },
  bioLabel: {
    position: 'absolute',
    top: isAndroidDevice
      ? dimensions.indent * 0.5
      : dimensions.indent * 0.6,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  input: {
    marginBottom: 20,
  },
  bioInput: {
    // textAlignVertical: 'top',
    minHeight: dimensions.indent,
    // paddingTop: dimensions.indent * 0.5,
    margin: 0,
  },
  headerComponent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 22
  },
  avatarContainer: {
    flexDirection: 'row',
    marginBottom: dimensions.indent * 1.7,
  },
  tipContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tip: {
    marginBottom: dimensions.indent * 0.5,
  },
  logoImageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 95,
    height: 95,
    borderRadius: 95 / 2,
  },
  logoBackground: {
    resizeMode: 'cover',
    borderRadius: 95 / 2,
  },
  avatar: {
    marginRight: dimensions.indent,
  },
  footer: {
    marginTop: dimensions.indent,
    backgroundColor: colors.settingsScreen.footer,
    flexDirection: 'row',
    width: '100%',
    padding: dimensions.indent * 0.5,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    borderRadius: 4,
    width: '48%',
  },
  buttonsFormContainer: {
    backgroundColor: colors.button.backgroundColor,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowRadius: 11,
    shadowOpacity: 0.06,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    // alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleComponent: {
    marginTop: 10,
    marginBottom: 20,
  },




  containerForm: {
    flex: 1,
    backgroundColor: 'green'
  },
  container: {
    flex: 1,
  },
  tabHeaderContainer: {
    height: dimensions.smallIndent * 3.5,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  containerTabView: {
    flex: 1,
  },
  containerTabStyle: {
    flex: 1,
    backgroundColor: colors.rentalsTab.activeColor,
    borderTopWidth: 0,
    borderColor: colors.rentalsTab.activeColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
  },

  tabHeader: {
    padding: 15
  },
  activeTabStyle: {
    backgroundColor: colors.rentalsTab.backgroundColor,
    borderBottomWidth: 7 * StyleSheet.hairlineWidth,
    borderColor: colors.rentalsTab.white,
    padding: 0,
  },
  inactiveTabStyle: {
    backgroundColor: colors.rentalsTab.backgroundColor,
    padding: 0,
  },
  inactiveTextStyle: {
    color: colors.rentalsTab.text,
    opacity: 0.7,
    fontSize: 16,
    fontWeight: '500',
    textTransform: "uppercase"
  },
  activeTextStyle: {
    color: colors.rentalsTab.text,
    opacity: 1,
  },
});
