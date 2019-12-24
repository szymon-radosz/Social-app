import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  peachColor,
  darkGrayColor,
  lightBorderRadius,
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall,
  peachBtnText,
  loaderContainer
} from "./../../assets/global/globalStyles";

//TextStyle for elements which contains e.g. fontWeight, textAlign
//ViewStyle for elements which contains e.g. backgroundColor, borderStyle
interface Style {
  container: ViewStyle;
  headerText: TextStyle;
  logoDesc: TextStyle;
  mainBtn: TextStyle;
  askDesc: TextStyle;
  ResetPasswordHeader: TextStyle;
  resetPasswordBtn: TextStyle;
  subBtnSection: ViewStyle;
  subBtnSectionAsk: TextStyle;
  registerBtn: TextStyle;
  peachBtnText: any;
  loaderContainer: any;
  termsBtn: TextStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: fontSizeBig,
    marginTop: 70,
    paddingBottom: 50,
    fontFamily: "Open Sans"
  },
  logoDesc: {
    textAlign: "center",
    color: darkGrayColor,
    fontWeight: "600",
    fontSize: fontSizeMedium,
    paddingBottom: 30,
    fontFamily: "Open Sans"
  },

  mainBtn: {
    height: 45,
    width: 180,
    marginTop: 10,
    borderRadius: lightBorderRadius,
    borderColor: peachColor,
    borderWidth: 2,
    backgroundColor: peachColor,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  askDesc: {
    fontSize: fontSizeSmall,
    fontWeight: "300",
    fontFamily: "Open Sans"
  },
  ResetPasswordHeader: {
    fontSize: fontSizeSmall,
    fontWeight: "300",
    paddingTop: 20,
    fontFamily: "Open Sans"
  },
  resetPasswordBtn: {
    fontSize: 16,
    color: "#8c8c8c",
    paddingTop: 50,
    fontFamily: "Open Sans"
  },
  subBtnSection: {
    flexDirection: "row",
    alignSelf: "center"
  },
  subBtnSectionAsk: {
    color: "#333",
    fontSize: 16,
    fontFamily: "Open Sans"
  },
  termsBtn: {
    color: "#a3a3a3",
    fontWeight: "600",
    fontSize: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Open Sans"
  },
  registerBtn: {
    color: peachColor,
    fontSize: 16,
    fontFamily: "Open Sans"
  },
  peachBtnText: peachBtnText,
  loaderContainer: loaderContainer
});