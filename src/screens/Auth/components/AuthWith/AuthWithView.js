import screens from "../../../../navigation/screens";
import Touchable from "../../../../components/Touchable/Touchable";
import IconCard from "../../../../components/IconCard/IconSvg";
import {View} from "react-native";
import s from "./styles";
import {Text} from "../../../../components";
import React from "react";

const authIcon = [
  {
    screen: 'google',
    iconName: 'google-login',
  },
  {
    screen: 'facebook',
    iconName: 'facebook-login',
  },
  {
    screen: 'linkedin',
    iconName: 'linkedin-login',
  },
];

const ItemAuthWith = ({onPress, iconName, title, styleText, screen}) => (
  <Touchable
    // onPress={async () => onPress(screen)}
    style={{margin: 8}}
  >
    <IconCard type={iconName}/>
  </Touchable>
);


const AuthWith = () => (
  <View>
    <View style={{flexDirection: 'row', marginTop: 27}}>
      <View style={s.line}/>
      <Text gray style={s.textLine}>or</Text>
      <View style={s.line}/>
    </View>

    <View style={s.singInWith}>
      {authIcon.map(el => (
        <ItemAuthWith
          key={el.iconName}
          {...el}
        />
      ))}
    </View>
  </View>
)

export default AuthWith;