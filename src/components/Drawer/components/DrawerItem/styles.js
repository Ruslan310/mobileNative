import { StyleSheet } from 'react-native';
import { dimensions } from '../../../../styles';
import { isSmallDevice } from '../../../../utils';
import {smallIndent} from "../../../../styles/dimensions";

const smallDevice = isSmallDevice();

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: dimensions.indent*0.5,
    padding: dimensions.smallIndent * 1.3,
  },
  text: {
    marginLeft: dimensions.smallIndent * 3,
  },
});
