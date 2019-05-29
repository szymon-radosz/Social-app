import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Dimensions
} from "react-native";
import {
  pageTitleWhite,
  peachColor,
  btnFullWidth,
  lightBorderRadius
} from "./../../../assets/global/globalStyles";

interface Style {
  container: ViewStyle;
  singlePostContainer: ViewStyle;
  buttonCloseModal: TextStyle;
  mainModalContainer: TextStyle;
  userDetailsModalContentContainer: ViewStyle;
  relative: ViewStyle;
  addCommentBtn: any;
  addPostBtn: any;
  postDetailsContainer: ViewStyle;
  postDetailsComment: ViewStyle;
  image: ImageStyle;
  activePostCategory: TextStyle;
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
  pageTitle: pageTitleWhite,
  addPostBtn: btnFullWidth,
  addCommentBtn: btnFullWidth,
  singlePostContainer: {
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 6,
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonCloseModal: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 11,
    paddingRight: 3,
    backgroundColor: peachColor,
    borderBottomRightRadius: lightBorderRadius
  },
  mainModalContainer: {
    width: fullWidth,
    height: fullHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: -80,
    zIndex: 5
  },
  userDetailsModalContentContainer: {
    backgroundColor: "#fff",
    width: fullWidth - 40,
    height: fullHeight - 300,
    position: "absolute",
    top: fullHeight / 6,
    left: 20,
    zIndex: 10,
    borderRadius: 5
  },
  relative: {
    position: "relative"
  },
  postDetailsContainer: {
    width: "100%"
  },
  postDetailsComment: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6
  },
  activePostCategory: { color: "blue" },
  image: { width: 50, height: 50, borderRadius: 6 }
});
