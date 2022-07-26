import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../../../styles';
import { isSmallDevice, isAndroid } from '../../../../utils';
import {indent, smallIndent, width} from "../../../../styles/dimensions";

const smallDevice = isSmallDevice();
const isAndroidDevice = isAndroid();

export default StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  textWithTouchableContainer: {
    flexDirection: smallDevice ? 'column' : 'row',
    justifyContent: "center"
  },
  inputContainerEmail: {
    marginBottom: dimensions.indent * 1.2,
  },
  inputContainerPassword: {
    marginBottom: 21,
  },
  buttonContainer: {
    marginTop: dimensions.indent * 0.7,
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
    height: 393,
    paddingRight: dimensions.indent,
    paddingLeft: dimensions.indent,
    paddingTop: dimensions.smallIndent *2,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
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
    marginTop: dimensions.indent * 3
  },
  circle: {
    position: "absolute",
    width: width,
    height: dimensions.indentModerated * 31.5,
    borderRadius: 12,
    top: -110,
    backgroundColor: colors.authScreen.circle,
  }
});
