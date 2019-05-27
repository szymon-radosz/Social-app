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
  profileHeaderContainer: ViewStyle;
  profileHeaderImage: ImageStyle;
  profileHeaderName: TextStyle;
  profileHeaderLocation: TextStyle;
  profileHeaderInfoContainer: ViewStyle;
  profileHeaderSingleInfoContainerMainText: TextStyle;
  profileHeaderSingleInfoContainerSubText: TextStyle;
  buttonOption: any;
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
  profileHeaderName: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24
  },
  profileHeaderLocation: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 30
  },
  profileHeaderInfoContainer: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%"
  },
  profileHeaderSingleInfoContainerMainText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  profileHeaderSingleInfoContainerSubText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  },
  profileHeaderContainer: {
    backgroundColor: "#ffd2ad",
    paddingTop: 20,
    paddingBottom: 20
  },
  profileHeaderImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 40,
    marginLeft: "auto",
    marginRight: "auto"
  },
  buttonOption: btnFullWidth,
  pageTitle: pageTitleWhite
});
