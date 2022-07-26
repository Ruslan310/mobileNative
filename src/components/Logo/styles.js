import { StyleSheet } from "react-native";
import { dimensions } from "../../styles";

export default StyleSheet.create({
  logo: {
    alignSelf: "flex-start",
    // alignSelf: "center",
  },
  logoHome: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  logoIcon: {
    alignItems: "center"
  },
  logoSmall: {
    marginTop: dimensions.indent * 0.8,
    marginBottom: dimensions.indent * 0.8,
  },
  logoMedium: {
    marginTop: dimensions.indent * 1.5,
    marginBottom: dimensions.indent * 0.9,
  },
  logoLarge: {
    marginTop: dimensions.indent * 2,
    marginBottom: dimensions.indent * 1.8,
  },
  img: {
    width: 200,
    height: 90,
    resizeMode: "contain",
  },
  imgSmall: { width: 154, height: 50, resizeMode: "contain" },
  imgLarge: { width: 230, height: 100, resizeMode: "contain" },
});
