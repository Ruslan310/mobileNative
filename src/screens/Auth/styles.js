import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isAndroid } from '../../utils';
import {indent, smallIndent, width} from "../../styles/dimensions";

const isAndroidDevice = isAndroid();

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSafeAreaView: {
    flex: 1,
  },
  heading: {
    fontWeight: '500',
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 78,
  },
  headingSmall: {
    marginBottom: dimensions.indentModerated * 1.3,
  },
  headingLarge: {
    marginTop: dimensions.indentModerated, // dimensions.indentModerated * 5,
    marginBottom: dimensions.indentModerated * 4,
  },
  tabViewContainer: {
    height: 369,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: dimensions.smallIndent *2,
    marginLeft: 15,
    marginRight: 15,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 39,
    borderRadius: 12,
    backgroundColor: colors.authScreen.backgroundColor,
  },
  containerHeaderTitle: {

  },
  headerTitle: {
    textAlign: "center",
    fontWeight: "600"
  },
  subTitle: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "400"
  },
  tabViewWrapper: {
    flex: 1,
    borderRadius: 10,
    marginLeft: 1,
    marginBottom: 3,
    shadowColor: colors.authScreen.shadowColor,
    elevation: 3,
  },
  circle: {
    position: "absolute",
    width: width,
    height: dimensions.indentModerated * 34,
    borderRadius: 12,
    // left: -73,
    top: -110,
    backgroundColor: colors.authScreen.circle,
  },
  bottom: {
    justifyContent: "center",
    alignItems: "center",
    height: isAndroidDevice ? dimensions.indent * 2.4 : dimensions.indent * 2.8,
  },
  bottomButtonAndroid: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: isAndroidDevice ? dimensions.indent * 2.4 : dimensions.indent * 2.8,
    width: dimensions.width,
    bottom: 0,
    left: 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  keyboardAvoidingViewContentContainer: {
    flex: 1,
  },
  singUpButtonText: {
    color: colors.button.backgroundColor,
    fontWeight: "500"
  },
  loginButtonText: {
    color: colors.button.backgroundColorPrimaryCustom,
    fontWeight: "500"
  },
  buttonIn: {
    marginTop: dimensions.indent * 1.7,
    backgroundColor: colors.button.backgroundColorPrimaryCustom
  },
  buttonOut: {
    marginTop: dimensions.indent,
    borderWidth: 1,
    borderColor: colors.button.backgroundColorPrimaryCustom,
    backgroundColor: colors.button.backgroundColor
  },
});
