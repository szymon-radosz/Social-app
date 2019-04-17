import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Dimensions,
  View
} from "react-native";

interface Style {
  container: ViewStyle;
  singlePostContainer: ViewStyle;
  buttonCloseModal: TextStyle;
  mainModalContainer: TextStyle;
  userDetailsModalContentContainer: ViewStyle;
  relative: ViewStyle;
  postDetailsContainer: ViewStyle;
  postDetailsComment: ViewStyle;
  image: ImageStyle;
}

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch"
  },
  singlePostContainer: {
    borderWidth: 1,
    marginBottom: 5
  },
  buttonCloseModal: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 11,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: "#7f7f7f",
    borderBottomColor: "#7f7f7f"
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
    padding: 10
  },
  postDetailsComment: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1
  },
  image: { width: 50, height: 50 }
});
