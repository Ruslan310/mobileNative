import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';
import { isSmallDevice, isAndroid } from '../../../../utils';
import {width} from "../../../../styles/dimensions";

const smallDevice = isSmallDevice();

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.signInSignUpForm.backgroundColor,
    paddingHorizontal: dimensions.indent,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 7
  },
  bottom: {
    marginTop: dimensions.indent * 0.5,
    marginBottom: dimensions.indentModerated,
  },
  inputContainerFirstAndLastNames: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: smallDevice
      ? dimensions.indent * 0.9
      : dimensions.indent,
  },
  alignCenter: {
    justifyContent: 'center',
  },
  marginBottom: {
    marginBottom: dimensions.smallIndent,
  },
  borderRadius: {
    borderRadius: 10,
  },
  textWithTouchableContainer: {
    marginTop: dimensions.indent * 0.5,
    flexDirection: 'column',
    justifyContent: "center",
    marginBottom: dimensions.indent
  },
  inputContainer: {
    marginBottom: dimensions.indent * 1.4,
  },
  containerSafeAreaView: {
    flex: 1,
  },
  heading: {
    fontWeight: '500',
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: dimensions.indentModerated * 2.3,
  },
  tabViewContainer: {
    minHeight: 569,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 25,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 39,
    borderRadius: 12,
    backgroundColor: colors.authScreen.backgroundColor,
  },
  headerTitle: {
    alignItems: "center",
    marginBottom: dimensions.smallIndent * 2,
    marginTop: dimensions.indent * 1.2
  },
  circle: {
    position: "absolute",
    width: width,
    height: dimensions.indentModerated * 29.8,
    borderRadius: 12,
    top: -110,
    backgroundColor: colors.authScreen.circle,
  }

});
