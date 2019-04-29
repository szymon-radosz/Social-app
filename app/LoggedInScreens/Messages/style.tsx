import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

import {
  pageTitleWhite,
  peachColor,
  darkGrayColor,
  btnFullWidth,
  lightBorderRadius,
  btnFullWidthContainer,
  btnFullActiveWidthContainer,
  fontSizeBig,
  fontSizeMedium
} from "./../../assets/global/globalStyles";

interface Style {
  container: ViewStyle;
  pageTitle: any;
  filterBtnText: TextStyle;
  userListSingleUserContainer: TextStyle;
  filterBtnTextActive: TextStyle;
  pageSubTitle: TextStyle;
  productListSingleProductContainer: ViewStyle;
  singleButtonCol2Container: ViewStyle;
  filterBtnContainer: ViewStyle;
  messagesList: ViewStyle;
  productListSingleProductImage: ImageStyle;
  userListContainer: ViewStyle;
  filterBtnActive: any;
  conversationBoxContainer: ViewStyle;
  image: ImageStyle;
  unreadedConversation: TextStyle;
  readedConversation: TextStyle;
  senderBox: TextStyle;
  receiverBox: TextStyle;
  messageDateSender: TextStyle;
  messageDateReceiver: TextStyle;
  filterBtn: any;
  viewContainer: ViewStyle;
  sendMessageBtn: any;
  sendMessage: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  sendMessageBtn: btnFullWidth,
  filterBtnText: { color: "#333", textAlign: "center", paddingTop: 7 },
  filterBtnTextActive: { color: "#fff", textAlign: "center", paddingTop: 7 },
  filterBtnActive: btnFullActiveWidthContainer,
  filterBtnContainer: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  filterBtn: btnFullWidthContainer,
  pageSubTitle: {
    textAlign: "center",
    color: "#333",
    fontWeight: "400",
    fontSize: 14,
    paddingBottom: 20
  },
  productListSingleProductImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: lightBorderRadius
  },
  userListSingleUserContainer: {
    width: "96%",
    margin: "2%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: lightBorderRadius,
    height: 180
  },
  messagesList: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  userListContainer: {
    width: "100%",
    /*position: "relative",*/
    flex: 1,
    margin: 8
  },
  pageTitle: pageTitleWhite,
  conversationBoxContainer: { borderWidth: 1, width: "100%" },
  image: { width: 45, height: 45 },
  unreadedConversation: { color: peachColor, textAlign: "center" },
  readedConversation: { color: "#333", textAlign: "center" },
  senderBox: {
    width: "80%",
    textAlign: "right",
    alignSelf: "flex-end",
    backgroundColor: "#ededed",
    fontSize: 12,
    padding: 5,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10
  },
  productListSingleProductContainer: {
    padding: 10,
    width: "46%",
    margin: "2%",
    borderWidth: 1,
    borderRadius: lightBorderRadius
  },
  singleButtonCol2Container: {
    width: "46%",
    margin: "2%"
  },
  receiverBox: {
    width: "80%",
    backgroundColor: peachColor,
    fontSize: 12,
    padding: 5,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    color: "#fff"
  },
  messageDateSender: {
    width: "80%",
    textAlign: "right",
    alignSelf: "flex-end",
    fontSize: 12,
    marginRight: 10
  },
  messageDateReceiver: {
    width: "80%",
    textAlign: "left",
    alignSelf: "flex-start",
    fontSize: 12,
    marginLeft: 10
  },
  viewContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  sendMessage: {}
});
