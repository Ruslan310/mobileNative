import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import { isAndroid } from '../../utils';

const android = isAndroid();

export default StyleSheet.create({
  container: {},
  animatedContainer: {
    height: dimensions.indent * 2.21,
    borderBottomWidth: 2,
    borderColor: colors.input.borderColor,
  },
  inputLabel: {
    fontSize: 16,
    position: 'absolute',
    left: -3,
    top: android ? dimensions.indent * 0.4 : dimensions.indent * 0.4,
    color: colors.input.labelColor,
    backgroundColor: colors.input.labelBackgroundColor,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  input: {
    fontSize: 16,
    color: colors.input.textColor,
    height: dimensions.indent * 2.5,
    paddingLeft: !android ? -dimensions.indent * 0.8 : 0,
    // paddingRight: dimensions.indent * 0.3,
    // paddingTop: dimensions.indent * 0.6,
    paddingBottom: !android ? dimensions.indent * 0.4 : dimensions.indent * 0.7,
  },
  inputWithIcon: {
    paddingRight: dimensions.indent * 3,
  },
  inputWithLeftIcon: {
    paddingLeft: dimensions.indent * 2.2,
  },
  inputLabelWithLeftIcon: {
    left: dimensions.indent * 2.2,
  },
  activeContainer: {
    borderColor: colors.input.activeBorderColor,
  },
  successContainer: {
    borderColor: colors.input.successBorderColor,
  },
  activeLabel: {
    opacity: 0,
    color: colors.input.activeLabelColor,
  },
  icon: {
    position: 'absolute',
    right: dimensions.indent,
    top: dimensions.indent * 0.85,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  iconCustomLeft: {
    position: 'absolute',
    left: dimensions.indent * 0.5,
    top: dimensions.indent * 0.8,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  iconCustom: {
    position: 'absolute',
    right: dimensions.indent,
    top: dimensions.indent * 0.8,
    paddingHorizontal: dimensions.indent * 0.2,
  },
  iconInPlaceholder: {
    position: 'absolute',
    paddingLeft: dimensions.indent,
    zIndex: 1,
  },
  iconLeft: {
    position: 'absolute',
    left: dimensions.indent * 0.5,
    top: dimensions.indent * 0.85,
    paddingHorizontal: dimensions.indent * 0.2,
  },
});
