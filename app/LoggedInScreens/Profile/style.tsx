import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Dimensions,
  View
} from "react-native";
import {
  pageTitleWhite,
  peachColor,
  darkGrayColor,
  btnFullWidth,
  lightBorderRadius,
  fontSizeBig,
  fontSizeMedium
} from "./../../assets/global/globalStyles";

interface Style {
  container: ViewStyle;
  pageTitle: any;
}

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

export default StyleSheet.create<Style>({
  container: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  pageTitle: pageTitleWhite
});
