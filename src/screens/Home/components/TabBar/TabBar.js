import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import T from 'prop-types';
import { IconFonts, TextPicker } from '../../../../components';
import s from './styles';
import i18n from '../../../../i18n';
import { colors } from '../../../../styles';

const TabBar = ({
  onChangeTabIndex,
  goToCategory,
  category,
  selectedTabIndex,
}) => (
  <View style={s.tabBar}>
    <View style={s.categoryContainer}>
      <TextPicker
        onPress={() =>
          goToCategory({
            onlyCategory: true,
            showAllCategoriesButton: true,
            showCategoriesAsButton: true,
          })
        }
        iconNameRight="drop-down"
      >
        {category || i18n.t('home.category')}
      </TextPicker>
      {/* {!!category && (
        <TextPicker
          onPress={() =>
            goToCategory({
              showAllCategoriesButton: true,
              showCategoriesAsButton: true,
            })
          }
          iconNameRight="drop-down"
        >
          {category || i18n.t('home.category')}
        </TextPicker>
      )} */}
    </View>
    <View style={s.switch}>
      <TouchableOpacity
        style={[s.tabItem, selectedTabIndex === 0 && s.activeTabItem]}
        onPress={() => onChangeTabIndex(0)}
      >
        <IconFonts
          name="grid"
          tintColor={
            selectedTabIndex === 0
              ? colors.switch.activeIcon
              : colors.switch.icon
          }
          size={selectedTabIndex === 0 ? 16 : 20}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.tabItem, selectedTabIndex === 1 && s.activeTabItem]}
        onPress={() => onChangeTabIndex(1)}
      >
        <IconFonts
          name="map"
          tintColor={
            selectedTabIndex === 1
              ? colors.switch.activeIcon
              : colors.switch.icon
          }
          size={selectedTabIndex === 1 ? 16 : 20}
        />
      </TouchableOpacity>
    </View>
  </View>
);

TabBar.propTypes = {
  selectedTabIndex: T.number,
  onChangeTabIndex: T.func,
  goToCategory: T.func,
  category: T.string,
};

export default TabBar;
