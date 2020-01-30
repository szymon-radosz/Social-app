import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import {
  pageTitleWhite,
  customBlueColor,
  btnFullWidth,
  lightBorderRadius,
  filterBtnContainer,
  singleButtonCol2Container,
  filterBtnActive,
  filterBtn,
  filterBtnTextActive,
  filterBtnText,
  peachBtnText,
  loaderContainer
} from "./../../assets/global/globalStyles";

interface Style {
  container: ViewStyle;
  pageTitle: any;
  filterBtnText: any;
  userListSingleUserContainer: TextStyle;
  filterBtnTextActive: any;
  pageSubTitle: TextStyle;
  productListSingleProductContainer: ViewStyle;
  singleButtonCol2Container: any;
  filterBtnContainer: any;
  messageDetailsContainer: ViewStyle;
  messagesList: ViewStyle;
  productListSingleProductImage: ImageStyle;
  userListContainer: ViewStyle;
  filterBtnActive: any;
  productListSingleProductTextContainer: ViewStyle;
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
  messageListContainer: ViewStyle;
  lastMessageDate: TextStyle;
  conversationReceiverName: TextStyle;
  sendMessageBoxContainer: ViewStyle;
  sendMessageBoxInput: ViewStyle;
  conversationDetailsReceiverImage: ImageStyle;
  conversationDetailsReceiverName: ViewStyle;
  peachBtnText: any;
  messageBoxContainer: ViewStyle;
  conversationDetailsSeeMore: TextStyle;
  loaderContainer: any;
}

export default StyleSheet.create<Style>({
  peachBtnText: peachBtnText,
  messageListContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  container: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  sendMessageBtn: btnFullWidth,
  filterBtnText: filterBtnText,
  filterBtnTextActive: filterBtnTextActive,
  filterBtnActive: filterBtnActive,
  filterBtnContainer: filterBtnContainer,
  filterBtn: filterBtn,
  messageDetailsContainer: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingBottom: 10,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    marginBottom: 5
  },
  pageSubTitle: {
    textAlign: "center",
    color: "#333",
    fontWeight: "400",
    fontSize: 14,
    paddingBottom: 20,
    fontFamily: "Open Sans"
  },
  productListSingleProductImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 25
  },
  productListSingleProductTextContainer: {
    paddingLeft: 10,
    width: "85%"
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
    flex: 1,
    margin: 8
  },
  pageTitle: pageTitleWhite,
  conversationBoxContainer: { borderWidth: 1, width: "100%" },
  image: { width: 45, height: 45 },
  unreadedConversation: {
    color: customBlueColor,
    textAlign: "left",
    fontSize: 12,
    fontFamily: "Open Sans"
  },
  readedConversation: {
    color: "#333",
    textAlign: "left",
    fontSize: 12,
    fontFamily: "Open Sans"
  },
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
    borderRadius: 6
  },
  productListSingleProductContainer: {
    width: "100%",
    borderWidth: 1,
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: lightBorderRadius,
    borderColor: "#424242",
    marginBottom: 10,
    paddingLeft: 6
  },
  singleButtonCol2Container: singleButtonCol2Container,
  receiverBox: {
    width: "80%",
    backgroundColor: customBlueColor,
    fontSize: 12,
    padding: 5,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 6,
    color: "#fff",
    fontFamily: "Open Sans"
  },
  messageDateSender: {
    width: "80%",
    textAlign: "right",
    alignSelf: "flex-end",
    fontSize: 8,
    marginRight: 10,
    fontFamily: "Open Sans"
  },
  messageDateReceiver: {
    width: "80%",
    textAlign: "left",
    alignSelf: "flex-start",
    fontSize: 8,
    marginLeft: 10,
    fontFamily: "Open Sans"
  },
  viewContainer: {
    width: "100%"
  },
  lastMessageDate: {
    textAlign: "left",
    color: "#333",
    fontSize: 10,
    marginTop: 5
  },
  conversationReceiverName: {
    fontWeight: "600",
    textAlign: "left",
    color: "#333",
    fontFamily: "Open Sans"
  },
  sendMessageBoxContainer: {
    borderTopColor: "#E5E5E5",
    borderTopWidth: 1,
    marginTop: 5
  },
  sendMessageBoxInput: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#424242"
  },
  conversationDetailsReceiverImage: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 25
  },
  conversationDetailsReceiverName: { marginTop: 15 },
  messageBoxContainer: { paddingLeft: 10, paddingRight: 10, marginBottom: 0 },
  conversationDetailsSeeMore: {
    fontWeight: "600",
    color: customBlueColor,
    fontFamily: "Open Sans"
  },
  loaderContainer: loaderContainer
});
