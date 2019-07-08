import { StyleSheet, Platform } from "react-native";

interface Style {
  statusBarBackground: any;
}

export default StyleSheet.create<Style>({
  statusBarBackground: {
    height: Platform.OS === "ios" ? 18 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: "transparent"
  }
});
