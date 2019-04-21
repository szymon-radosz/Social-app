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
  fontSizeMedium
} from "./../../assets/global/globalStyles";
const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

interface Style {
  pageTitle: any;
  pageSubTitle: TextStyle;
  userListContainer: ViewStyle;
  mainModalContainer: ViewStyle;
  userDetailsModalContentContainer: ViewStyle;
  relative: ViewStyle;
  userDetailsHeader: TextStyle;
  userDetailsImage: ImageStyle;
  userDetailsHeaderText: TextStyle;
  userDetailsContent: ViewStyle;
  userDetailsContentHeader: TextStyle;
  userDetailsContentHobbyContainer: ViewStyle;
  userDetailsRedirectMessageBtnContainer: TextStyle;
  userDetailsRedirectMessageBtn: TextStyle;
  buttonCloseModal: ViewStyle;
  userMessageHeader: TextStyle;
  userMessageTextArea: ViewStyle;
  userMessageBtn: TextStyle;
  userListSingleUserContainer: TextStyle;
  userDetails: ViewStyle;
  userListSingleUserImage: ImageStyle;
  container: ViewStyle;
  userListImage: ImageStyle;
  userListText: TextStyle;
  userContainer: TextStyle;
  showUserDetails: TextStyle;
}

export default StyleSheet.create<Style>({
  pageTitle: pageTitleWhite,
  userListContainer: {
    width: "100%",
    /*position: "relative",*/
    flex: 1,
    margin: 8
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
    paddingBottom: 10
  },
  userDetailsRedirectMessageBtnContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  userDetailsRedirectMessageBtn: btnFullWidth,
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
  userListSingleUserImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: lightBorderRadius
  },

  container: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  userListImage: {
    width: 50,
    height: 50,
    borderRadius: lightBorderRadius
  },
  userListText: {
    fontSize: fontSizeMedium,
    textAlign: "center",
    color: darkGrayColor,
    fontWeight: "400"
  },
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
