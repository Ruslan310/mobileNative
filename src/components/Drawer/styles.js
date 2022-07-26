import { StyleSheet } from 'react-native';
import { colors, dimensions } from '../../styles';
import {smallIndent} from "../../styles/dimensions";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.drawer.header,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.drawer.backgroundColor,
  },
  header: {
    backgroundColor: colors.drawer.header,
  },
  headerSvg: {
    justifyContent: "center",
    height: 60,
    backgroundColor: colors.drawer.header,
  },
  logoHeader: {
    marginTop: dimensions.indent * 0.2,
    marginBottom: dimensions.indent * 0.2,
  },
  drawerMain: {
    flex: 1,
    paddingTop: dimensions.indent,
    justifyContent: 'space-between',
  },
  userContainer: {
    backgroundColor: colors.drawer.userContainer,
    flexDirection: 'row',
    padding: dimensions.indent,
  },
  userProfileContainer: {
    paddingTop: dimensions.indent * 0.3,
    paddingLeft: dimensions.smallIndent * 2,
    paddingRight: dimensions.indent,
    paddingBottom: dimensions.indent,
    justifyContent: 'center',
  },
  addGoodsButtonContainer: {
    marginTop: dimensions.indent,
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
    marginBottom: dimensions.indent * 1.5,
  },
  button: {
    backgroundColor: colors.button.backgroundColorPrimaryCustom
  },
  logoImageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  logoBackground: {
    resizeMode: 'cover',
    borderRadius: 70 / 2,
  },
  viewProfileButton: {
    paddingHorizontal: 0,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  viewProfileButtonText: {
    alignSelf: 'flex-start',
    fontWeight: "500",
    color: colors.textTouchable.textColorCustom
  },
});
