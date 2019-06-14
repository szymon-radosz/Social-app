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
import { StyleSheet } from "react-native";

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
  profileHeaderSingleInfoContainerSubText: profileHeaderSingleInfoContainerSubText
});
