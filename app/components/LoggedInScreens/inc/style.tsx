import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import {
  peachColor,
  darkGrayColor,
  lightBorderRadius,
  btnFullWidth
} from "./../../../assets/global/globalStyles";

interface Style {
  buttonBottom: TextStyle;
  bottomPanel: ViewStyle;
  buttonImage: ImageStyle;
  buttonText: TextStyle;
  unreadedMessagesNotificationContainer: ViewStyle;
  unreadedMessagesNotificationDot: ImageStyle;
  unreadedMessagesNotificationDotText: TextStyle;
  buttonCloseModal: ViewStyle;
  productDetailsBtn: any;
  filterModalContainer: ViewStyle;
  filterModalHeaderTextContainer: TextStyle;
  filterModalHeaderTextBold: TextStyle;
  filterModalOptionContainer: ViewStyle;
  filterModalOptionActive: ViewStyle;
  filterModalOptionInactive: ViewStyle;
}

export default StyleSheet.create<Style>({
  productDetailsBtn: btnFullWidth,
  buttonBottom: {
    color: peachColor,
    fontWeight: "bold",
    backgroundColor: darkGrayColor,
    fontSize: 8
  },
  bottomPanel: {
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    width: "100%",
    backgroundColor: "#fff"
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
    color: darkGrayColor,
    left: 5,
    top: 2
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
  filterModalContainer: { padding: 10 },
  filterModalHeaderTextContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 16
  },
  filterModalHeaderTextBold: { fontWeight: "bold" },
  filterModalOptionContainer: { paddingTop: 30 },
  filterModalOptionActive: {
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 5,
    padding: 10,
    borderColor: "orange"
  },
  filterModalOptionInactive: {
    borderRadius: 6,
    borderWidth: 1,
    marginBottom: 5,
    padding: 10
  }
});
