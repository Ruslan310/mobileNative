import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';
import {width} from "../../../../styles/dimensions";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  circle: {
    position: "absolute",
    width: width,
    height: dimensions.indentModerated * 31.5,
    borderRadius: 12,
    top: -110,
    backgroundColor: colors.authScreen.circle,
  },
  viewContainer: {
    minHeight: 392,
    marginTop: 50,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 30,
    backgroundColor: colors.authScreen.backgroundColor,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 39,
    borderRadius: 12,
  },
  topIcon: {
    alignItems: "center"
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 14,
    textAlign: 'center',
  },
  textToLogin: {
    marginBottom: 14,
    lineHeight: 21,
    textDecorationLine: "underline"
  },
  text: {
    marginLeft: 7,
    marginRight: 7,
    lineHeight: 21,
    textAlign: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    right: dimensions.indent,
    top: dimensions.indent,
    zIndex: 1,
  },
  inputContainer: {
    marginTop: dimensions.indent * 1.8,
    marginBottom: dimensions.indent * 1.8,
  },
  buttonContainer: {
    marginBottom: dimensions.indent * 3.1,
  },
  buttonResultContainer: {
    marginTop: dimensions.indent * 3.1,
    marginLeft: dimensions.indent * 1.5,
    marginRight: dimensions.indent * 1.5,
  },
  verifyText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
    alignItems: "center"
  },
  alignCenter: {
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  verifyCode: {
    marginTop: 19,
    marginBottom: 19
  },
  icon: {
    alignSelf: 'center',
    marginTop: dimensions.indent * 3,
    marginBottom: dimensions.indent * 0.8,
  },
});
