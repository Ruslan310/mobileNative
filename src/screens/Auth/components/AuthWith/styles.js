import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';


export default StyleSheet.create({
  line: {
    backgroundColor: colors.text.gray,
    height: 1, flex: 1,
    alignSelf: 'center'},
  textLine: {
    textTransform: "uppercase",
    alignSelf:'center',
    fontWeight: "500",
    paddingHorizontal: 5,
    fontSize: 14
  },
  singInWith: {
    marginTop: dimensions.indent * 1.4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
});
