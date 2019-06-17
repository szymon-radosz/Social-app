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
  lightBorderRadius
} from "./../../../assets/global/globalStyles";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

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
  }
});
