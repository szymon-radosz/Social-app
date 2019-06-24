import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import {
  pageTitleWhite,
  btnFullWidth,
  peachColor,
  productListSingleProductContainer,
  productListSingleProductImage,
  productListSingleProductTextContainer,
  productOnListTextName,
  productOnListTextCategory,
  productOnListTextPrice,
  userListContainer,
  userListSingleUserContainer,
  userListSingleUserImage,
  userListTextContainer,
  userListText,
  lightBorderRadius,
  filterBtnContainer,
  singleButtonCol2Container,
  filterBtnActive,
  filterBtn,
  filterBtnTextActive,
  filterBtnText
} from "./../../../assets/global/globalStyles";

interface Style {
  container: ViewStyle;
  pageTitle: any;
  buttonOption: any;
  userListContainer: any;
  userListSingleUserContainer: any;
  userListSingleUserImage: any;
  userListTextContainer: any;
  userListText: any;
  optionHeader: TextStyle;
  productListSingleProductContainer: any;
  productListSingleProductImage: ImageStyle;
  productListSingleProductTextContainer: ViewStyle;
  productOnListTextName: any;
  productOnListTextCategory: any;
  productOnListTextPrice: any;
  optionText: TextStyle;
  userTextLocation: TextStyle;
  singleNotificationContainer: ViewStyle;
  singleNotificationContainerActive: ViewStyle;
  filterBtnContainer: any;
  singleButtonCol2Container: any;
  filterBtnActive: any;
  filterBtn: any;
  filterBtnTextActive: any;
  filterBtnText: any;
}

export default StyleSheet.create<Style>({
  container: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  filterBtnContainer: filterBtnContainer,
  singleButtonCol2Container: singleButtonCol2Container,
  filterBtnActive: filterBtnActive,
  filterBtn: filterBtn,
  filterBtnTextActive: filterBtnTextActive,
  filterBtnText: filterBtnText,
  buttonOption: {
    width: "48%",
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 0,
    borderRadius: lightBorderRadius,
    borderColor: "#8c8c8c",
    borderWidth: 2
  },
  pageTitle: pageTitleWhite,
  userListContainer: userListContainer,
  userListSingleUserContainer: userListSingleUserContainer,
  userListSingleUserImage: userListSingleUserImage,
  userListTextContainer: userListTextContainer,
  userListText: userListText,
  optionHeader: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "600"
  },
  optionText: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
    color: "#424242"
  },
  productListSingleProductContainer: productListSingleProductContainer,
  productListSingleProductImage: productListSingleProductImage,
  productListSingleProductTextContainer: productListSingleProductTextContainer,
  productOnListTextName: productOnListTextName,
  productOnListTextCategory: productOnListTextCategory,
  productOnListTextPrice: productOnListTextPrice,
  userTextLocation: {
    fontSize: 10
  },
  singleNotificationContainer: {
    width: "100%",
    borderWidth: 1,
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: lightBorderRadius,
    marginBottom: 10
  },
  singleNotificationContainerActive: {
    width: "100%",
    borderWidth: 1,
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: lightBorderRadius,
    marginBottom: 10,
    backgroundColor: "#ffeee0"
  }
});
