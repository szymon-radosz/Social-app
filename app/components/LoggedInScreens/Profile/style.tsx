import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Dimensions
} from "react-native";
import {
  pageTitleWhite,
  btnFullWidth,
  lightBorderRadius,
  fontSizeSmall,
  darkGrayColor
} from "./../../../assets/global/globalStyles";

interface Style {
  container: ViewStyle;
  pageTitle: any;
  profileHeaderContainer: ViewStyle;
  profileHeaderImage: ImageStyle;
  profileHeaderName: TextStyle;
  profileHeaderLocation: TextStyle;
  profileHeaderInfoContainer: ViewStyle;
  profileHeaderSingleInfoContainerMainText: TextStyle;
  profileHeaderSingleInfoContainerSubText: TextStyle;
  buttonOption: any;
  userPreviewSectionContainer: ViewStyle;
  userPreviewSectionHeaderContainer: ViewStyle;
  userPreviewSectionHeaderImage: ImageStyle;
  userPreviewSectionHeaderText: TextStyle;
  userPreviewSectionListText: TextStyle;
  userPreviewListItemContainer: ViewStyle;
  userPreviewListItemImage: ImageStyle;
  userListContainer: ViewStyle;
  userListSingleUserContainer: ViewStyle;
  userListSingleUserImage: ImageStyle;
  userListTextContainer: ViewStyle;
  userListText: TextStyle;
  optionHeader: TextStyle;
  productListSingleProductContainer: ViewStyle;
  productListSingleProductImage: ImageStyle;
  productListSingleProductTextContainer: ViewStyle;
  productOnListTextName: TextStyle;
  productOnListTextCategory: TextStyle;
  productOnListTextPrice: TextStyle;
}

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

export default StyleSheet.create<Style>({
  container: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  profileHeaderName: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24
  },
  profileHeaderLocation: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 30
  },
  profileHeaderInfoContainer: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%"
  },
  profileHeaderSingleInfoContainerMainText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  profileHeaderSingleInfoContainerSubText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  },
  profileHeaderContainer: {
    backgroundColor: "#ffd2ad",
    paddingTop: 20,
    paddingBottom: 20
  },
  profileHeaderImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 40,
    marginLeft: "auto",
    marginRight: "auto"
  },
  buttonOption: btnFullWidth,
  pageTitle: pageTitleWhite,
  userPreviewSectionContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  userPreviewSectionHeaderContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
    marginTop: 20
  },
  userPreviewSectionHeaderImage: {
    width: 45,
    height: 45
  },
  userPreviewSectionHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20
  },
  userPreviewSectionListText: {
    fontSize: 16
  },
  userPreviewListItemContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 65
  },
  userPreviewListItemImage: {
    width: 15,
    height: 15,
    marginRight: 10
  },
  userListContainer: {
    width: "100%",
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8
  },
  userListSingleUserContainer: {
    width: "96%",
    borderWidth: 1,
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: lightBorderRadius,
    paddingLeft: 10,
    paddingRight: 10
  },
  userListSingleUserImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 25
  },
  userListTextContainer: {
    paddingLeft: 10,
    width: "85%",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  userListText: {
    fontSize: fontSizeSmall,
    textAlign: "left",
    color: darkGrayColor,
    fontWeight: "400"
  },
  optionHeader: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 10
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
  productListSingleProductTextContainer: {
    paddingLeft: 10,
    width: "75%"
  },
  productOnListTextName: {
    fontWeight: "bold",
    textAlign: "left",
    color: "#333"
  },
  productOnListTextCategory: {
    color: "#333",
    textAlign: "left",
    fontSize: 12
  },
  productOnListTextPrice: {
    color: "#333",
    textAlign: "left",
    fontSize: 12
  }
});
