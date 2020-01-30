import React from "react";
import { View, StatusBar, Platform, StyleSheet, ViewStyle } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

interface Style {
  statusBarBackground: any;
  iphoneXContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  statusBarBackground: {
    height: Platform.OS === "ios" ? 18 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: "transparent"
  },
  iphoneXContainer: {
    paddingBottom: 0,
    ...ifIphoneX(
      {
        paddingBottom: 20
      },
      {}
    )
  }
});

export default function(props: any) {
  const height = Platform.OS === "ios" ? 20 : 0;
  const { backgroundColor } = props;

  return (
    <View style={{ height, backgroundColor }}>
      <View style={styles.iphoneXContainer}>
        <StatusBar {...props} />
      </View>
    </View>
  );
}
