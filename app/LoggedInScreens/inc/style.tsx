import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

interface Style {
  buttonBottom: TextStyle;
  bottomPanel: ViewStyle;
  buttonImage: ImageStyle;
  buttonText: TextStyle;
  unreadedMessagesNotificationContainer: ViewStyle;
  unreadedMessagesNotificationDot: ImageStyle;
  unreadedMessagesNotificationDotText: TextStyle;
}

export default StyleSheet.create<Style>({
  buttonBottom: {
    color: "red",
    fontWeight: "bold",
    backgroundColor: "#fff",
    fontSize: 8
  },
  bottomPanel: {
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    width: "100%"
  },
  buttonImage: {
    height: 25,
    marginBottom: 5
  },
  buttonText: {
    fontSize: 10,
    textAlign: "center"
  },
  unreadedMessagesNotificationContainer: {
    position: "absolute",
    right: 0,
    top: -10
  },
  unreadedMessagesNotificationDot: { width: 20, height: 20 },
  unreadedMessagesNotificationDotText: {
    position: "absolute",
    color: "#fff",
    left: 5,
    top: 2
  }
});
