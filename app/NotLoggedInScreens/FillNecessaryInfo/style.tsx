import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";
import {
  pageTitleWhite,
  peachColor,
  darkGrayColor,
  btnFullWidth,
  lightBorderRadius,
  fontSizeBig,
  fontSizeMedium,
  fontSizeSmall
} from "./../../assets/global/globalStyles";
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
  previousBtn: ViewStyle;
  nextBtn: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: { flex: 1, alignItems: "center" },
  headerText: pageTitleWhite,
  headerTwoText: {
    textAlign: "center",
    color: darkGrayColor,
    fontWeight: "600",
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 20
  },
  map: {
    width: "100%",
    height: 250,
    marginTop: 15
  },
  dataPicker: {
    width: "100%",
    marginBottom: 10,
    borderRadius: lightBorderRadius,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,

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
    //justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
    //flex: 1
  },
  btnContainer: {
    justifyContent: "center",
    flexDirection: "column"
  },
  hobbyContainer: {
    width: 100,
    height: 100,
    margin: 10,
    //justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: darkGrayColor,
    borderRadius: lightBorderRadius
  },
  activeHobbyContainer: {
    width: 100,
    height: 100,
    margin: 10,
    //justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
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
    fontSize: fontSizeSmall,
    paddingTop: 10,
    paddingBottom: 5
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
  nextBtn: btnFullWidth
});
