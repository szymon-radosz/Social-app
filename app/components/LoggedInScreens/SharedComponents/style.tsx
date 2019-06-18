import {
  userPreviewSectionContainer,
  userPreviewSectionHeaderContainer,
  userPreviewSectionHeaderImage,
  userPreviewSectionHeaderText,
  userPreviewListItemContainer,
  userPreviewListItemImage,
  userPreviewSectionListText,
  userPreviewDescription,
  profileHeaderContainer,
  profileHeaderImage,
  profileHeaderName,
  profileHeaderLocation,
  profileHeaderInfoContainer,
  profileHeaderSingleInfoContainerMainText,
  profileHeaderSingleInfoContainerSubText
} from "./../../../assets/global/globalStyles";
import {
  peachColor,
  lightBorderRadius,
  btnFullWidth,
  darkGrayColor
} from "./../../../assets/global/globalStyles";
import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";

interface Style {
  userPreviewSectionContainer: any;
  userPreviewSectionHeaderContainer: any;
  userPreviewSectionHeaderImage: any;
  userPreviewSectionHeaderText: any;
  userPreviewListItemContainer: any;
  userPreviewListItemImage: any;
  userPreviewSectionListText: any;
  userPreviewDescription: any;
  profileHeaderContainer: any;
  profileHeaderImage: any;
  profileHeaderName: any;
  profileHeaderLocation: any;
  profileHeaderInfoContainer: any;
  profileHeaderSingleInfoContainerMainText: any;
  profileHeaderSingleInfoContainerSubText: any;
  activeFiltersText: TextStyle;
  removeFilterBtnContainer: ViewStyle;
  removeFilterText: ViewStyle;
  removeFilterBtn: ViewStyle;
  removeFilterBtnText: TextStyle;
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
  userPreviewSectionContainer: userPreviewSectionContainer,
  userPreviewSectionHeaderContainer: userPreviewSectionHeaderContainer,
  userPreviewSectionHeaderImage: userPreviewSectionHeaderImage,
  userPreviewSectionHeaderText: userPreviewSectionHeaderText,
  userPreviewListItemContainer: userPreviewListItemContainer,
  userPreviewListItemImage: userPreviewListItemImage,
  userPreviewSectionListText: userPreviewSectionListText,
  userPreviewDescription: userPreviewDescription,
  profileHeaderContainer: profileHeaderContainer,
  profileHeaderImage: profileHeaderImage,
  profileHeaderName: profileHeaderName,
  profileHeaderLocation: profileHeaderLocation,
  profileHeaderInfoContainer: profileHeaderInfoContainer,
  profileHeaderSingleInfoContainerMainText: profileHeaderSingleInfoContainerMainText,
  profileHeaderSingleInfoContainerSubText: profileHeaderSingleInfoContainerSubText,
  activeFiltersText: {
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: "600"
  },
  removeFilterBtnContainer: {
    margin: 5,
    paddingLeft: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  removeFilterText: {
    marginTop: 5
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
  removeFilterBtnText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 15,
    color: "#fff"
  },
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
