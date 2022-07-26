import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';
import {smallIndent, width} from "../../../../styles/dimensions";

export default StyleSheet.create({
  modal: {
    marginRight: 0,
    marginLeft: 0,
    marginTop: 60,
    marginBottom: 0,
  },
  container: {
    backgroundColor: colors.resetPasswordModal.backgroundColor,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 18,
    paddingBottom: 19,
    borderRadius: 12,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    lineHeight: dimensions.smallIndent *2
  },
  text: {
    marginTop: dimensions.indent * 1.4,
  },
  textDate: {
    marginTop: dimensions.indent,
  },
  closeIconContainer: {
    position: 'absolute',
    right: dimensions.indent,
    top: dimensions.indent,
    zIndex: 1,
  },
  inputContainer: {
    marginTop: dimensions.indent * 1.8,
    marginBottom: dimensions.indent,
  },
  buttonContainer: {
    marginBottom: dimensions.indent * 3.1,
  },
  buttonResultContainer: {
    marginTop: dimensions.indent * 3.1,
    marginLeft: dimensions.indent * 1.5,
    marginRight: dimensions.indent * 1.5,
  },
  alignCenter: {
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
    marginTop: dimensions.indent * 3,
    marginBottom: dimensions.indent * 0.8,
  },
});
