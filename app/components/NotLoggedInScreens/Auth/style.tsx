import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  peachColor,
  darkGrayColor,
  lightBorderRadius,
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall
} from "./../../../assets/global/globalStyles";

//TextStyle for elements which contains e.g. fontWeight, textAlign
//ViewStyle for elements which contains e.g. backgroundColor, borderStyle
interface Style {
  container: ViewStyle;
  headerText: TextStyle;
  logoDesc: TextStyle;
  input: ViewStyle;
  mainBtn: TextStyle;
  askDesc: TextStyle;
  ResetPasswordHeader: TextStyle;
  resetPasswordBtn: TextStyle;
  subBtnSection: ViewStyle;
  subBtnSectionAsk: TextStyle;
  registerBtn: TextStyle;
}

export default StyleSheet.create<Style>({
  container: { flex: 1, alignItems: "center" },
  headerText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: fontSizeBig,
    marginTop: 50,
    paddingBottom: 50
  },
  logoDesc: {
    textAlign: "center",
    color: darkGrayColor,
    fontWeight: "500",
    fontSize: fontSizeMedium,
    paddingBottom: 30
  },
  input: {
    width: "90%",
    marginBottom: 10,
    borderRadius: lightBorderRadius,
    height: 40,
    borderColor: "#d8d8d8",
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  mainBtn: {
    height: 45,
    width: 180,
    marginTop: 10,
    borderRadius: lightBorderRadius,
    borderColor: peachColor,
    borderWidth: 2,
    backgroundColor: peachColor,
    marginBottom: 30
  },
  askDesc: {
    fontSize: fontSizeSmall,
    fontWeight: "300"
  },
  ResetPasswordHeader: {
    fontSize: fontSizeSmall,
    fontWeight: "300",
    paddingTop: 20
  },
  resetPasswordBtn: {
    fontSize: 16,
    color: "#8e8e8e",
    paddingTop: 50
  },
  subBtnSection: {
    flexDirection: "row",
    alignSelf: "center"
  },
  subBtnSectionAsk: {
    color: "#333",
    fontSize: 16
  },
  registerBtn: {
    color: peachColor,
    fontSize: 16
  }
});
