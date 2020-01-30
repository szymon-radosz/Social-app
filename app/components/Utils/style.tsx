import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  customBlueColor,
  whiteBtnText,
  lightBorderRadius,
  peachBtnText,
  btnFullWidth,
  btnFullWidthWhite,
  listItemContainer,
  listItemSingleContainer,
  listItemImage,
  listItemTextContainer,
  listItemMainText,
  listItemSubText,
  listItemSingleContainerActive
} from "./../../assets/global/globalStyles";

interface Style {
  peachBtnText: any;
  whiteBtnText: any;
  buttonComponent: ViewStyle;
  buttonComponentFullWidth: any;
  buttonComponentFullWidthWhite: any;
  input: TextStyle;
  textarea: TextStyle;
  removeFilterBtnContainer: ViewStyle;
  removeFilterText: TextStyle;
  removeFilterBtn: ViewStyle;
  listItemContainer: any;
  listItemSingleContainer: any;
  listItemSingleContainerActive: any;
  listItemImage: any;
  listItemTextContainer: any;
  listItemMainText: any;
  listItemSubText: any;
}

export default StyleSheet.create<Style>({
  peachBtnText: peachBtnText,
  whiteBtnText: whiteBtnText,
  buttonComponent: {
    height: 45,
    width: 180,
    borderRadius: lightBorderRadius,
    borderColor: customBlueColor,
    borderWidth: 2,
    backgroundColor: customBlueColor,
    marginTop: 20,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  buttonComponentFullWidth: btnFullWidth,
  buttonComponentFullWidthWhite: btnFullWidthWhite,
  input: {
    width: "100%",
    marginTop: 10,
    borderRadius: lightBorderRadius,
    height: 40,
    borderColor: "#8c8c8c",
    color: "#424242",
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "Open Sans"
  },
  textarea: {
    borderWidth: 2,
    borderRadius: 6,
    marginTop: 10,
    padding: 10,
    height: 60,
    width: "100%",
    borderColor: "#8c8c8c",
    color: "#424242",
    textAlignVertical: "top"
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
    borderColor: customBlueColor,
    borderWidth: 2,
    backgroundColor: customBlueColor,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  listItemContainer: listItemContainer,

  listItemSingleContainer: listItemSingleContainer,
  listItemSingleContainerActive: listItemSingleContainerActive,
  listItemImage: listItemImage,
  listItemTextContainer: listItemTextContainer,
  listItemMainText: listItemMainText,
  listItemSubText: listItemSubText
});
