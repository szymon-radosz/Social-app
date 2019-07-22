import { Dimensions, ViewStyle, TextStyle } from "react-native";
import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

const fullWidth = Dimensions.get("window").width;

//TextStyle for elements which contains e.g. fontWeight, textAlign
//ViewStyle for elements which contains e.g. backgroundColor, borderStyle
interface Style {
  alertContainer: ViewStyle;
  successContainer: TextStyle;
  dangerContainer: TextStyle;
  closeAlert: TextStyle;
}

export default StyleSheet.create<Style>({
  alertContainer: {
    position: "absolute",
    zIndex: 100,
    width: fullWidth,
    top: 0,
    ...ifIphoneX(
      {
        paddingTop: 30
      },
      {}
    ),
    justifyContent: "center"
  },
  successContainer: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    width: fullWidth,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#92d3a2"
  },
  dangerContainer: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    width: fullWidth,
    color: "#fff",
    textAlign: "center",
    backgroundColor: "#cc7897"
  },
  closeAlert: {
    position: "absolute",
    right: 10,
    ...ifIphoneX(
      {
        top: 42
      },
      {}
    )
  }
});
