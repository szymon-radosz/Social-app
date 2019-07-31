import {
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Dimensions
} from "react-native";
const fullHeight = Dimensions.get("window").height;
import {
  pageTitleWhite,
  peachColor,
  darkGrayColor,
  btnFullWidth,
  lightBorderRadius,
  peachBtnText,
  loaderContainer
} from "./../../../assets/global/globalStyles";
interface Style {
  container: ViewStyle;
  headerText: any;
  headerTwoText: TextStyle;
  map: ViewStyle;
  dataPicker: ViewStyle;
  image: ImageStyle;
  hobbiesContainer: ViewStyle;
  btnContainer: ViewStyle;
  hobbyContainer: ViewStyle;
  activeHobbyContainer: ViewStyle;
  subText: TextStyle;
  infoContainer: ViewStyle;
  kidsInfoContainer: ViewStyle;
  input: ViewStyle;
  previousBtn: any;
  nextBtn: any;
  fillInfoHeader: TextStyle;
  activeCheckbox: ViewStyle;
  inActiveCheckbox: ViewStyle;
  checkboxWrapper: ViewStyle;
  checkboxText: ViewStyle;
  checkboxContainer: ViewStyle;
  childGenderContainer: ViewStyle;
  childGenderText: ViewStyle;
  removeFilterBtnText: TextStyle;
  hobbyOptionContainer: ViewStyle;
  hobbyOptionText: TextStyle;
  hobbyOptionImage: ImageStyle;
  loaderContainer: any;
  peachBtnText: any;
}

export default StyleSheet.create<Style>({
  peachBtnText: peachBtnText,
  container: { flex: 1, alignItems: "center" },
  headerText: pageTitleWhite,
  headerTwoText: {
    textAlign: "center",
    color: darkGrayColor,
    fontWeight: "600",
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 35,
    fontFamily: "Open Sans"
  },
  fillInfoHeader: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "300",
    textAlign: "center",
    fontFamily: "Open Sans"
  },
  map: {
    width: "100%",
    height: fullHeight - 260,
    marginTop: 15
  },
  dataPicker: {
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: lightBorderRadius,
    height: 40,
    borderColor: "#8c8c8c",
    borderWidth: 2,
    marginLeft: "auto",
    marginRight: "auto"
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 15,
    marginLeft: "auto",
    marginRight: "auto"
  },
  hobbiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  btnContainer: {
    justifyContent: "center",
    flexDirection: "column"
  },
  hobbyOptionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  hobbyContainer: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: "center",
    borderWidth: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderColor: "#8c8c8c",
    borderRadius: lightBorderRadius
  },
  activeHobbyContainer: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: "center",
    borderWidth: 2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    borderColor: peachColor,
    borderRadius: lightBorderRadius
  },
  infoContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  kidsInfoContainer: {
    marginTop: 10
  },
  subText: {
    textAlign: "left",
    color: darkGrayColor,
    fontWeight: "400",
    fontSize: 12,
    paddingTop: 20,
    fontFamily: "Open Sans"
  },
  input: {
    width: "100%",
    marginBottom: 10,
    borderRadius: lightBorderRadius,
    height: 40,
    borderColor: "gray",
    paddingLeft: 10,
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto"
  },
  previousBtn: btnFullWidth,
  nextBtn: btnFullWidth,
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
  checkboxContainer: { flexDirection: "row", flexWrap: "wrap" },
  checkboxWrapper: { flexDirection: "row" },
  checkboxText: { marginTop: 2, marginRight: 15 },
  childGenderContainer: { paddingLeft: 10, paddingRight: 10, marginBottom: 10 },
  childGenderText: { paddingBottom: 5 },

  removeFilterBtnText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 15,
    color: "#fff",
    fontFamily: "Open Sans"
  },
  hobbyOptionText: {
    width: "100%"
  },
  hobbyOptionImage: {
    width: 40,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10
  },
  loaderContainer: loaderContainer
});
