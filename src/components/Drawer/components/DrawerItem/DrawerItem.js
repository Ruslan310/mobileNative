import React from 'react';
import { View } from 'react-native';
import T from 'prop-types';
import IconFonts from '../../../IconFonts/IconFonts';
import Text from '../../../Text/Text';
import Touchable from '../../../Touchable/Touchable';
import s from './styles';
import { NavigationService } from '../../../../services';
import { colors } from '../../../../styles';
import IconCard from "../../../IconCard/IconSvg";

const DrawerItem = ({ iconName, title, screen, onPress, func, styleText, styleIcon, activeIcon, onChangeTabIndex }) => {
  const press = async () => {
    if(func) await func.run()
    onChangeTabIndex(iconName)
    onPress(screen)
  }
  const colorIcon = activeIcon === iconName ? "#9A2A1F" : "#9E9E9E"
  const colorText = activeIcon === iconName ? "#000000" : "#9E9E9E"
  return(
      <Touchable
          onPress={() => press()}
          rippleColor={colors.drawerItem.rippleColor}
      >
        <View style={s.item}>
          <IconCard type={iconName} active={colorIcon} />
          {/*<IconCard type={iconName} style={styleIcon}/>*/}
          {/*<IconFonts name={iconName} size={25}/>*/}
          <Text mediumSize style={[s.text, {color: colorText}, styleText]}>
            {title}
          </Text>
        </View>
      </Touchable>
  )
};

DrawerItem.defaultProps = {
  onPress: (screen) => {
    NavigationService.navigateTo(screen);
    NavigationService.closeDrawer();
  },
};

DrawerItem.propTypes = {
  iconName: T.string,
  title: T.string,
  screen: T.string,
  onPress: T.func,
};

export default DrawerItem;
