import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Dimensions
} from "react-native";
import {
  pageTitleWhite,
  btnFullWidth
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
  }
});
