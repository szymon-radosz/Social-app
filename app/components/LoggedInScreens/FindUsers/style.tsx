import {
  Dimensions,
  TextStyle,
  StyleSheet,
  ViewStyle,
  ImageStyle
} from "react-native";
import {
  pageTitleWhite,
  peachColor,
  darkGrayColor,
  btnFullWidth,
  lightBorderRadius,
  fontSizeBig,
  fontSizeSmall,
  fontSizeMedium,
  userListContainer,
  userListSingleUserContainer,
  userListSingleUserImage,
  userListTextContainer,
  userListText
} from "./../../../assets/global/globalStyles";
const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

interface Style {
  pageTitle: any;
  pageSubTitle: TextStyle;
  userListContainer: any;
  mainModalContainer: ViewStyle;
  userDetailsModalContentContainer: ViewStyle;
  relative: ViewStyle;
  userDetailsHeader: TextStyle;
  userDetailsImage: ImageStyle;
  userDetailsHeaderText: TextStyle;
  userTextLocation: TextStyle;
  removeFilterBtn: ViewStyle;
  removeFilterBtnText: TextStyle;
  removeFilterBtnContainer: ViewStyle;
  removeFilterText: ViewStyle;
  userDetailsContent: ViewStyle;
  userDetailsContentHeader: TextStyle;
  userDetailsContentHobbyContainer: TextStyle;
  userDetailsRedirectMessageBtnContainer: TextStyle;
  userDetailsRedirectMessageBtn: TextStyle;
  buttonCloseModal: ViewStyle;
  userMessageHeader: TextStyle;
  userMessageTextArea: ViewStyle;
  activeFiltersText: ViewStyle;
  userMessageBtn: TextStyle;
  userListSingleUserContainer: any;
  userDetails: ViewStyle;
  userListSingleUserImage: any;
  container: ViewStyle;
  userListImage: ImageStyle;
  userListText: any;
  userListTextContainer: any;
  userContainer: TextStyle;
  showUserDetails: TextStyle;
  fullWidth: any;
  fullHeight: any;
}

export default StyleSheet.create<Style>({
  pageTitle: pageTitleWhite,
  userListContainer: userListContainer,
  fullWidth: fullWidth,
  fullHeight: fullHeight,
  userTextLocation: {
    fontSize: 10
  },
  pageSubTitle: {
    textAlign: "center",
    color: darkGrayColor,
    fontWeight: "400",
    fontSize: fontSizeMedium,
    paddingBottom: 20
  },
  mainModalContainer: {
    width: fullWidth,
    height: fullHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: -120,
    zIndex: 5
  },
  userDetailsModalContentContainer: {
    backgroundColor: "#fff",
    width: fullWidth - 40,
    //height: fullHeight - 300,
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    borderRadius: lightBorderRadius
  },
  relative: {
    position: "relative",
    width: "100%"
  },
  userDetails: {
    position: "absolute",
    zIndex: 20,
    top: 0,
    width: fullWidth,
    backgroundColor: "#fff"
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
    borderRadius: lightBorderRadius
  },
  userDetailsHeaderText: {
    fontSize: fontSizeBig,
    marginTop: 10,
    marginBottom: 20
  },
  userDetailsContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  userDetailsContentHeader: {
    fontSize: fontSizeMedium,
    fontWeight: "600"
  },
  userDetailsContentHobbyContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 0,
    paddingTop: 30,
    textAlign: "center"
  },
  userDetailsRedirectMessageBtnContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  userListTextContainer: userListTextContainer,
  userDetailsRedirectMessageBtn: btnFullWidth,
  buttonCloseModal: {
    position: "absolute",
    top: -110,
    left: 10,
    width: 40,
    height: 40,
    zIndex: 11,
    paddingRight: 3,
    backgroundColor: peachColor,
    //borderBottomRightRadius: lightBorderRadius
    borderRadius: 50
  },
  userMessageHeader: {
    fontSize: fontSizeBig,
    marginBottom: 20
  },
  userMessageTextArea: {
    height: 80,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: lightBorderRadius,
    padding: 5
  },
  userMessageBtn: {
    height: 35,
    width: 120,
    marginTop: 10,
    borderRadius: lightBorderRadius,
    borderColor: peachColor,
    borderWidth: 2,
    backgroundColor: peachColor,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10
  },
  removeFilterBtn: {
    height: 25,
    width: 40,
    borderRadius: lightBorderRadius,
    borderColor: peachColor,
    borderWidth: 2,
    backgroundColor: peachColor,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10
  },
  removeFilterText: {
    marginTop: 5
  },
  removeFilterBtnText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 15,
    color: "#fff"
  },
  removeFilterBtnContainer: {
    margin: 5,
    paddingLeft: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  activeFiltersText: {
    paddingTop: 10,
    paddingLeft: 10
  },
  userListSingleUserContainer: userListSingleUserContainer,
  userListSingleUserImage: userListSingleUserImage,
  container: {
    position: "relative"
    /*flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"*/
  },
  userListImage: {
    width: 50,
    height: 50,
    borderRadius: lightBorderRadius
  },
  userListText: userListText,
  userContainer: {
    borderRadius: lightBorderRadius,
    borderColor: peachColor,
    borderWidth: 1,
    padding: 5
  },
  showUserDetails: {
    height: 35,
    width: 100,
    marginTop: 10,
    borderRadius: lightBorderRadius,
    borderColor: peachColor,
    borderWidth: 2,
    backgroundColor: peachColor,
    marginBottom: 10
  }
});
