import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
  ImageStyle,
  View
} from "react-native";
import {
  pageTitleBlack,
  darkGrayColor,
  fontSizeMedium,
  lightBorderRadius,
  fontSizeBig,
  peachColor,
  btnFullWidth
} from "./../../assets/global/globalStyles";
const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

interface Style {
  productOnListTextName: TextStyle;
  productOnListTextCategory: TextStyle;
  productListSingleProductTextContainer: ViewStyle;
  productOnListTextPrice: TextStyle;
  productHeaderText: TextStyle;
  bold: TextStyle;
  conversationBoxContainer: ViewStyle;
  image: ImageStyle;
  unreadedConversation: TextStyle;
  readedConversation: TextStyle;
  productContentText: ViewStyle;
  productOnListTextContainer: TextStyle;
  mainModalContainer: TextStyle;
  userDetailsModalContentContainer: ViewStyle;
  relative: ViewStyle;
  userDetailsHeader: ViewStyle;
  userDetailsImage: ViewStyle;
  productDetailsHeader: ViewStyle;
  userDetailsHeaderText: TextStyle;
  userDetailsContent: ViewStyle;
  userDetailsContentHeader: TextStyle;
  userDetailsContentHobbyContainer: ViewStyle;
  userDetailsRedirectMessageBtnContainer: ViewStyle;
  userDetailsRedirectMessageBtn: TextStyle;
  buttonCloseModal: TextStyle;
  userMessageHeader: TextStyle;
  userMessageTextArea: TextStyle;
  userMessageBtn: TextStyle;
  userListSingleUserContainer: TextStyle;
  userListSingleUserImage: ViewStyle;
  userListSingleUserBtn: TextStyle;
  userListImage: ImageStyle;
  userListText: TextStyle;
  userContainer: TextStyle;
  productContent: ViewStyle;
  showUserDetails: TextStyle;
  container: ViewStyle;
  productDetailsImage: ImageStyle;
  pageTitle: any;
  productDetailsBtn: any;
  pageSubTitle: TextStyle;
  productList: ViewStyle;
  productListSingleProductContainer: ViewStyle;
  productListSingleProductImage: ImageStyle;
  productListSingleProductBtn: TextStyle;
}

export default StyleSheet.create<Style>({
  productOnListTextName: {
    fontWeight: "bold",
    textAlign: "left",
    color: "#333"
  },
  productDetailsBtn: btnFullWidth,
  productOnListTextCategory: {
    color: "#333",
    textAlign: "left",
    fontSize: 12
  },
  productOnListTextPrice: {
    color: "#333",
    textAlign: "left",
    fontSize: 12
  },
  pageTitle: pageTitleBlack,
  pageSubTitle: {
    textAlign: "center",
    color: darkGrayColor,
    fontWeight: "400",
    fontSize: fontSizeMedium,
    paddingBottom: 20
  },
  productList: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  productListSingleProductTextContainer: {
    paddingLeft: 10,
    width: "75%"
  },
  productListSingleProductContainer: {
    width: "100%",
    borderWidth: 1,
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: lightBorderRadius,
    marginBottom: 10,
    paddingLeft: 10
  },
  productListSingleProductImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25
  },
  productListSingleProductBtn: {
    height: 35,
    width: 120,
    marginTop: 10,
    borderRadius: lightBorderRadius,
    borderColor: peachColor,
    borderWidth: 2,
    backgroundColor: peachColor,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  conversationBoxContainer: { borderWidth: 1, width: "100%" },
  image: { width: 45, height: 45 },
  unreadedConversation: { color: "blue" },
  readedConversation: { color: "#000" },
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
  userDetailsHeader: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30
  },
  userDetailsImage: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  userDetailsHeaderText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20
  },
  userDetailsContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  userDetailsContentHeader: {
    fontSize: 16,
    fontWeight: "600"
  },
  userDetailsContentHobbyContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  userDetailsRedirectMessageBtnContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  userDetailsRedirectMessageBtn: {
    height: 35,
    width: 120,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  productHeaderText: {
    fontSize: fontSizeBig,
    marginTop: 10,
    marginBottom: 20
  },
  bold: {
    fontWeight: "bold"
  },
  productDetailsHeader: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30
  },
  productContentText: {
    marginBottom: 8
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
  userMessageHeader: {
    fontSize: 20,
    marginBottom: 20
  },
  userMessageTextArea: {
    height: 40,
    borderWidth: 1,
    borderRadius: lightBorderRadius,
    padding: 5
  },
  productDetailsImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: lightBorderRadius
  },
  productContent: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  userMessageBtn: {
    height: 35,
    width: 120,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10
  },
  userListSingleUserContainer: {
    width: "46%",
    margin: "2%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    position: "relative",
    height: 180
  },
  productOnListTextContainer: {
    textAlign: "center"
  },
  userListSingleUserImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 5
  },
  userListSingleUserBtn: {
    height: 35,
    width: 120,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  userListImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  userListText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    fontWeight: "400"
  },
  userContainer: {
    borderRadius: 5,
    borderColor: "#e07b8d",
    borderWidth: 1,
    padding: 5
  },
  showUserDetails: {
    height: 35,
    width: 100,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 10
  }
});
