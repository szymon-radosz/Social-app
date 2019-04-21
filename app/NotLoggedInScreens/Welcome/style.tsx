import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import {
  peachColor,
  darkGrayColor,
  lightBorderRadius,
  fontSizeBig,
  fontSizeMedium
} from "./../../assets/global/globalStyles";

//TextStyle for elements which contains e.g. fontWeight, textAlign
//ViewStyle for elements which contains e.g. backgroundColor, borderStyle
interface Style {
  container: ViewStyle;
  logo: TextStyle;
  logoDesc: TextStyle;
  loginBtn: TextStyle;
  registerBtn: TextStyle;
}

export default StyleSheet.create<Style>({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: {
    textAlign: "center",
    color: darkGrayColor,
    fontWeight: "800",
    fontSize: fontSizeBig,
    paddingBottom: 10
  },
  logoDesc: {
    textAlign: "center",
    color: darkGrayColor,
    fontWeight: "500",
    fontSize: fontSizeMedium,
    paddingBottom: 30
  },
  loginBtn: {
    height: 45,
    width: 180,
    borderRadius: lightBorderRadius,
    borderColor: peachColor,
    borderWidth: 2,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 20
  },
  registerBtn: {
    height: 45,
    width: 180,
    borderRadius: lightBorderRadius,
    borderColor: peachColor,
    borderWidth: 2,
    backgroundColor: peachColor,
    marginBottom: 20
  }
});
