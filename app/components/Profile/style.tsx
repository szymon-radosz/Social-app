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
  listItemContainer,
  listItemSingleContainer,
  listItemImage,
  listItemTextContainer,
  listItemMainText,
  lightBorderRadius,
  filterBtnContainer,
  singleButtonCol2Container,
  filterBtnActive,
  filterBtn,
  filterBtnTextActive,
  filterBtnText
} from "./../../assets/global/globalStyles";

interface Style {
  container: ViewStyle;
  pageTitle: any;
  buttonOption: any;
  listItemContainer: any;
  listItemSingleContainer: any;
  listItemImage: any;
  listItemTextContainer: any;
  listItemMainText: any;
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
  listItemContainer: listItemContainer,
  listItemSingleContainer: listItemSingleContainer,
  listItemImage: listItemImage,
  listItemTextContainer: listItemTextContainer,
  listItemMainText: listItemMainText,
  optionHeader: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "600",
    fontFamily: "Open Sans"
  },
  optionText: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
    color: "#424242",
    fontFamily: "Open Sans"
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
