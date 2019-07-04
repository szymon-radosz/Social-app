import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import {
  fontSizeBig,
  lightBorderRadius,
  btnFullWidth,
  peachBtnText
} from "./../../assets/global/globalStyles";

interface Style {
  container: ViewStyle;
  feedbackHeaderText: TextStyle;
  feedbackSubHeaderText: TextStyle;
  feedbackMessage: TextStyle;
  feedbackBtn: any;
  checkboxWrapper: ViewStyle;
  activeCheckbox: ViewStyle;
  inActiveCheckbox: ViewStyle;
  checkboxText: TextStyle;
  feedbackTopic: TextStyle;
  peachBtnText: any;
  checkboxTextActive: TextStyle;
}

export default StyleSheet.create<Style>({
  peachBtnText: peachBtnText,
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  feedbackHeaderText: {
    textAlign: "center",
    color: "#424242",
    fontWeight: "600",
    fontSize: fontSizeBig,
    marginTop: 30,
    paddingBottom: 30,
    fontFamily: "Open Sans"
  },
  feedbackSubHeaderText: {
    textAlign: "center",
    color: "#424242",
    fontWeight: "300",
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 40,
    fontFamily: "Open Sans"
  },
  feedbackMessage: {
    textAlignVertical: "top",
    height: 80,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    borderColor: "#424242",
    borderRadius: lightBorderRadius,
    padding: 5
  },
  feedbackBtn: btnFullWidth,
  checkboxWrapper: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5
  },
  activeCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    backgroundColor: "#f7b67e",
    borderColor: "#f7b67e",
    borderRadius: 20,
    marginRight: 5
  },
  inActiveCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 20,
    marginRight: 5
  },
  checkboxText: {
    marginTop: 2,
    marginRight: 15,
    color: "#424242"
  },
  checkboxTextActive: {
    marginTop: 2,
    marginRight: 15,
    color: "#424242",
    fontWeight: "600"
  },
  feedbackTopic: {
    paddingLeft: 10,
    paddingBottom: 10,
    fontWeight: "600",
    color: "#424242"
  }
});
