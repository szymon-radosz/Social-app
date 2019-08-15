import { StyleSheet, TextStyle, ViewStyle, Dimensions } from "react-native";
import {
  peachColor,
  darkGrayColor,
  lightBorderRadius,
  fontSizeBig,
  fontSizeMedium,
  peachBtnText
} from "./../../assets/global/globalStyles";
const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

//TextStyle for elements which contains e.g. fontWeight, textAlign
//ViewStyle for elements which contains e.g. backgroundColor, borderStyle
interface Style {
  container: ViewStyle;
  logo: TextStyle;
  logoDesc: TextStyle;
  registerBtn: TextStyle;
  fullWidth: any;
  welcomeSlide: ViewStyle;
  welcomeSlideText: TextStyle;
  activeWelcomeSlideRect: ViewStyle;
  inActiveWelcomeSlideRect: ViewStyle;
  welcomeSliderPagination: ViewStyle;
  subBtn: TextStyle;
  peachBtnText: any;
}

export default StyleSheet.create<Style>({
  welcomeSliderPagination: {
    marginTop: 30,
    marginBottom: 30
  },
  activeWelcomeSlideRect: {
    backgroundColor: peachColor,
    width: 35,
    marginTop: 100
  },
  inActiveWelcomeSlideRect: {
    backgroundColor: "#e5e5e5",
    width: 15,
    marginTop: 100
  },
  welcomeSlide: {
    justifyContent: "space-around",
    alignItems: "center",
    height: fullHeight / 1.8
  },
  welcomeSlideText: {
    fontSize: 22,
    color: "#424242",
    textAlign: "center",
    fontWeight: "300",
    fontFamily: "Open Sans",
    marginBottom: 80
  },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  fullWidth: fullWidth,
  logo: {
    textAlign: "center",
    color: "#333",
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
  subBtn: {
    color: "#f7b67e",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Open Sans"
  },
  peachBtnText: peachBtnText,
  registerBtn: { marginBottom: 50 }
});
