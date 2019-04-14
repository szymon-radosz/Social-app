import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";

interface Style {
  container: ViewStyle;
  headerText: TextStyle;
  headerTwoText: TextStyle;
  map: ViewStyle;
  dataPicker: ViewStyle;
  image: ImageStyle;
  hobbiesContainer: ViewStyle;
  btnContainer: ViewStyle;
  hobbyContainer: ViewStyle;
  activeHobbyContainer: ViewStyle;
  subText: TextStyle;
  input: ViewStyle;
  previousBtn: ViewStyle;
  nextBtn: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: { flex: 1, alignItems: "center" },
  headerText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 22,
    paddingBottom: 20,
    paddingTop: 20
  },
  headerTwoText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 20
  },
  map: {
    width: "100%",
    height: 250
  },

  dataPicker: {
    width: "90%",
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "auto"
  },
  image: {
    width: 200,
    height: 200,
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
    borderColor: "#333",
    borderRadius: 5
  },
  activeHobbyContainer: {
    width: 100,
    height: 100,
    margin: 10,
    //justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e07b8d",
    borderRadius: 5
  },
  subText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "400",
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 5
  },
  input: {
    width: "90%",
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "auto"
  },
  previousBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 20
  },
  nextBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto"
  }
});
