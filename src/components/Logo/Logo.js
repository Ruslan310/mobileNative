/* eslint-disable max-len */
import React from 'react';
import { View, Image } from "react-native";
import T from 'prop-types';
import { Svg, Path } from 'react-native-svg';
import s from './styles';
import CompanyLogo from "../../assets/png/logo_white.png";

const Logo = ({ size, style }) => {
  let width;
  let height;

  switch (size) {
    case 'small':
      width = 100;
      height = 40;
      break;
    case 'large':
      width = 230;
      height = 100;
      break;
    default:
      width = 200;
      height = 90;
      break;
  }

  return (
    <View
      style={[
        s.logo,
        (size === "small" && s.logoSmall) ||
          (size === "large" && s.logoLarge) ||
          s.logoMedium,
        style,
      ]}
    >
      <Image
        style={[
          s.img,
          (size === "small" && s.imgSmall) ||
          (size === "large" && s.imgLarge),
        ]}
        source={CompanyLogo}
      />
    </View>
  );
};

Logo.propTypes = {
  size: T.string,
  style: T.any,
};

export default Logo;
