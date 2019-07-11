import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  peachColor,
  lightBorderRadius,
  peachBtnText,
  btnFullWidth
} from "./../../assets/global/globalStyles";

interface Style {
  peachBtnText: any;
  buttonComponent: ViewStyle;
  buttonComponentFullWidth: any;
  input: TextStyle;
  textarea: TextStyle;
}

export default StyleSheet.create<Style>({
  peachBtnText: peachBtnText,
  buttonComponent: {
    height: 45,
    width: 180,
    borderRadius: lightBorderRadius,
    borderColor: peachColor,
    borderWidth: 2,
    backgroundColor: peachColor,
    marginTop: 20,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  buttonComponentFullWidth: btnFullWidth,
  input: {
    width: "100%",
    marginTop: 10,
    borderRadius: lightBorderRadius,
    height: 40,
    borderColor: "#8c8c8c",
    color: "#424242",
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "Open Sans"
  },
  textarea: {
    borderWidth: 2,
    borderRadius: 6,
    marginTop: 10,
    padding: 10,
    height: 60,
    width: "100%",
    borderColor: "#8c8c8c",
    color: "#424242",
    textAlignVertical: "top"
  }
});
