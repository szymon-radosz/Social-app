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
  peachBtnText,
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
  removeFilterText: TextStyle;
  removeFilterBtn: ViewStyle;
  removeFilterBtnText: TextStyle;
  buttonBottom: TextStyle;
  bottomPanel: ViewStyle;
  buttonImage: ImageStyle;
  buttonText: TextStyle;
  unreadedMessagesNotificationContainer: ViewStyle;
  unreadedMessagesNotificationDot: ImageStyle;
  unreadedMessagesNotificationDotText: TextStyle;
  unreadedMessagesNotificationLongDotText: TextStyle;
  buttonCloseModal: ViewStyle;
  productDetailsBtn: any;
  filterModalContainer: ViewStyle;
  filterModalHeaderTextContainer: TextStyle;
  filterModalHeaderTextBold: TextStyle;
  filterModalOptionContainer: ViewStyle;
  filterModalOptionActive: ViewStyle;
  filterModalOptionInactive: ViewStyle;
  activeFiltersConatiner: ViewStyle;
  pageHeaderContainer: ViewStyle;
  pageHeaderImage: ImageStyle;
  buttonTextActive: TextStyle;
  bottomPanelImageActive: ViewStyle;
  bottomPanelImage: ViewStyle;
  logoutContainer: ViewStyle;
  logoutImage: ImageStyle;
  logoutText: TextStyle;
  peachBtnText: any;
}

export default StyleSheet.create<Style>({
  peachBtnText: peachBtnText,
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
    fontWeight: "600",
    color: "#424242",
    fontFamily: "Open Sans"
  },
  removeFilterBtnContainer: {
    paddingLeft: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
  removeFilterText: {
    marginTop: 10,
    color: "#424242",
    fontFamily: "Open Sans"
  },
  removeFilterBtn: {
    height: 40,
    width: 40,
    borderColor: peachColor,
    borderWidth: 2,
    backgroundColor: peachColor,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  removeFilterBtnText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 15,
    color: "#fff",
    fontFamily: "Open Sans"
  },
  productDetailsBtn: btnFullWidth,
  buttonBottom: {
    color: peachColor,
    fontWeight: "600",
    backgroundColor: darkGrayColor,
    fontSize: 8,
    fontFamily: "Open Sans",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  bottomPanel: {
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 2,
    borderTopColor: "#8c8c8c",
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
  buttonTextActive: {
    fontSize: 10,
    textAlign: "center",
    color: peachColor,
    fontWeight: "600",
    fontFamily: "Open Sans"
  },
  bottomPanelImageActive: {
    opacity: 1
  },
  bottomPanelImage: {
    opacity: 0.7
  },
  buttonText: {
    fontSize: 10,
    color: "#424242",
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "Open Sans"
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
    fontSize: 14,
    fontWeight: "600",
    left: 5,
    top: 2,
    fontFamily: "Open Sans"
  },
  unreadedMessagesNotificationLongDotText: {
    position: "absolute",
    color: darkGrayColor,
    left: 5,
    fontSize: 10,
    top: 5
  },
  buttonCloseModal: {
    //width: "20%"
  },
  filterModalContainer: { paddingLeft: 10, paddingRight: 10 },
  filterModalHeaderTextContainer: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 16,
    paddingLeft: 10,
    paddingRight: 10
  },
  filterModalHeaderTextBold: {
    fontWeight: "600",
    color: "#424242",
    fontFamily: "Open Sans"
  },
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
    padding: 10,
    borderColor: "#424242"
  },
  activeFiltersConatiner: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    marginTop: 5,
    marginBottom: 10
  },
  pageHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
  pageHeaderImage: { width: 40, height: 40 },
  logoutContainer: {
    width: 68,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginRight: 20
  },
  logoutImage: {
    width: 25,
    height: 25,
    marginLeft: "auto",
    marginRight: "auto"
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 5,
    fontFamily: "Open Sans"
  }
});
