import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
  ImageStyle
} from "react-native";
import {
  pageTitleBlack,
  darkGrayColor,
  fontSizeMedium,
  lightBorderRadius,
  peachBtnText,
  peachColor,
  btnFullWidth,
  productListSingleProductContainer,
  productListSingleProductImage,
  productListSingleProductTextContainer,
  productOnListTextName,
  productOnListTextCategory,
  productOnListTextPrice,
  loaderContainer,
  filterBtnContainer,
  singleButtonCol2Container,
  filterBtnActive,
  filterBtn,
  filterBtnTextActive,
  filterBtnText
} from "./../../assets/global/globalStyles";
import { ViewportUserZoomProperty } from "csstype";
const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

interface Style {
  filterBtnContainer: any;
  singleButtonCol2Container: any;
  filterBtnActive: any;
  filterBtn: any;
  filterBtnText: any;
  filterBtnTextActive: any;
  productOnListTextName: any;
  productOnListTextCategory: any;
  productListSingleProductTextContainer: any;
  productOnListTextPrice: any;
  productHeaderText: TextStyle;
  bold: TextStyle;
  conversationBoxContainer: ViewStyle;
  image: ImageStyle;
  unreadedConversation: TextStyle;
  readedConversation: TextStyle;
  productContentText: ViewStyle;
  productClosed: TextStyle;
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
  sellerVoteBoxTextArea: TextStyle;
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
  productListSingleProductContainer: any;
  productListSingleProductImage: any;
  productListSingleProductBtn: TextStyle;
  sellerVoteBoxUserListContainer: ViewStyle;
  sellerVoteBoxUserListSingleUserContainer: ViewStyle;
  sellerVoteBoxUserListSingleUserImage: ImageStyle;
  sellerVoteBoxUserListSingleUserTextContainer: ViewStyle;
  sellerVoteBoxVoteContainer: ViewStyle;
  sellerVoteBoxVoteWrapper: ViewStyle;
  sellerVoteBoxVote: ViewStyle;
  sellerVoteBoxVotePreview: ViewStyle;
  fullWidth: any;
  sellerVoteBoxContainer: ViewStyle;
  sellerVoteBoxVoteActive: ViewStyle;
  filterResultsCarousel: ViewStyle;
  filterResultsHeaderText: TextStyle;
  addNewProductInputContainer: ViewStyle;
  addNewProductDescInput: ViewStyle;
  addNewProductOptionContainer: ViewStyle;
  addNewProductOptionHeaderText: TextStyle;
  addNewProductOptionWrapper: ViewStyle;
  addNewProductOptionText: ViewStyle;
  userProductMessageTextArea: TextStyle;
  peachBtnText: any;
  addNewProductOptionTextActive: TextStyle;
  sellerVoteBoxText: ViewStyle;
  loaderContainer: any;
}

export default StyleSheet.create<Style>({
  filterBtnContainer: filterBtnContainer,
  singleButtonCol2Container: singleButtonCol2Container,
  filterBtnActive: filterBtnActive,
  filterBtn: filterBtn,
  filterBtnText: filterBtnText,
  filterBtnTextActive: filterBtnTextActive,
  peachBtnText: peachBtnText,
  productOnListTextName: productOnListTextName,
  fullWidth: fullWidth,
  productDetailsBtn: btnFullWidth,
  productOnListTextCategory: productOnListTextCategory,
  productOnListTextPrice: productOnListTextPrice,
  pageTitle: pageTitleBlack,
  pageSubTitle: {
    textAlign: "center",
    color: darkGrayColor,
    fontWeight: "400",
    fontSize: fontSizeMedium,
    paddingBottom: 20,
    fontFamily: "Open Sans"
  },
  productList: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  productListSingleProductTextContainer: productListSingleProductTextContainer,
  productListSingleProductContainer: productListSingleProductContainer,
  productListSingleProductImage: productListSingleProductImage,
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
  readedConversation: { color: "#333" },
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
    marginBottom: 20,
    fontFamily: "Open Sans"
  },
  userDetailsContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  userDetailsContentHeader: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Open Sans"
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
    fontSize: 12,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 30,
    fontFamily: "Open Sans"
  },
  bold: {
    fontWeight: "600",
    fontFamily: "Open Sans"
  },
  productDetailsHeader: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30
  },
  productClosed: {
    color: peachColor,
    fontWeight: "600",
    fontFamily: "Open Sans"
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
    marginBottom: 20,
    fontFamily: "Open Sans"
  },
  userMessageTextArea: {
    height: 40,
    borderWidth: 1,
    borderRadius: lightBorderRadius,
    marginTop: 10,
    paddingLeft: 5,
    paddingTop: 10,
    textAlignVertical: "top"
  },
  userProductMessageTextArea: {
    height: 60,
    borderWidth: 1,
    borderRadius: lightBorderRadius,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 5,
    textAlignVertical: "top"
  },
  sellerVoteBoxTextArea: {
    height: 60,
    borderWidth: 1,
    borderRadius: lightBorderRadius,
    padding: 5,
    marginBottom: 5,
    textAlignVertical: "top"
  },
  productDetailsImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50
  },
  productContent: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30
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
    fontWeight: "400",
    fontFamily: "Open Sans"
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
  },
  sellerVoteBoxUserListContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  sellerVoteBoxUserListSingleUserContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    marginBottom: 5
  },
  sellerVoteBoxUserListSingleUserImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  sellerVoteBoxUserListSingleUserTextContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  sellerVoteBoxVoteContainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  sellerVoteBoxVoteWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 6
  },
  sellerVoteBoxVote: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 7,
    borderWidth: 1,
    borderRadius: 20
  },
  sellerVoteBoxVoteActive: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 7,
    borderWidth: 1,
    borderColor: peachColor,
    borderRadius: 20
  },
  sellerVoteBoxVotePreview: {
    marginTop: 20,
    paddingBottom: 10
  },
  sellerVoteBoxContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  filterResultsCarousel: {
    paddingLeft: 10,
    paddingRight: 10
  },
  filterResultsHeaderText: {
    paddingLeft: 10,
    paddingTop: 10,
    fontWeight: "600",
    color: "#424242",
    fontFamily: "Open Sans"
  },
  addNewProductInputContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  addNewProductDescInput: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20
  },
  addNewProductOptionContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10
  },
  addNewProductOptionHeaderText: {
    paddingBottom: 5,
    fontWeight: "600",
    fontFamily: "Open Sans"
  },
  addNewProductOptionWrapper: { flexDirection: "row", flexWrap: "wrap" },
  addNewProductOptionText: { marginTop: 2, marginRight: 15 },
  addNewProductOptionTextActive: {
    marginTop: 2,
    marginRight: 15,
    fontWeight: "600"
  },
  sellerVoteBoxText: {
    paddingTop: 10
  },
  loaderContainer: loaderContainer
});
