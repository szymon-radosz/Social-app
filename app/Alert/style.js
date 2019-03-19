import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  alertContainer: {
    position: "absolute",
    zIndex: 100,
    width: fullWidth,
    top: 0
  },
  successContainer: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: fullWidth,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#92d3a2"
  },
  dangerContainer: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: fullWidth,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#cc7897"
  }
});
