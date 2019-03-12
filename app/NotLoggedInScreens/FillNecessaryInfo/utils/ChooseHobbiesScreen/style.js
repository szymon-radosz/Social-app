import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  headerText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 22,
    paddingBottom: 20,
    paddingTop: 20
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

  previousBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto"
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
