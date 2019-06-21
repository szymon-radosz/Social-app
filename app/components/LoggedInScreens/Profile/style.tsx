import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import {
  pageTitleWhite,
  btnFullWidth,
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
  userListText
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
  userTextLocation: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  buttonOption: btnFullWidth,
  pageTitle: pageTitleWhite,
  userListContainer: userListContainer,
  userListSingleUserContainer: userListSingleUserContainer,
  userListSingleUserImage: userListSingleUserImage,
  userListTextContainer: userListTextContainer,
  userListText: userListText,
  optionHeader: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 15
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 40,
    color: "#fff"
  },
  productListSingleProductContainer: productListSingleProductContainer,
  productListSingleProductImage: productListSingleProductImage,
  productListSingleProductTextContainer: productListSingleProductTextContainer,
  productOnListTextName: productOnListTextName,
  productOnListTextCategory: productOnListTextCategory,
  productOnListTextPrice: productOnListTextPrice,
  userTextLocation: {
    fontSize: 10
  }
});