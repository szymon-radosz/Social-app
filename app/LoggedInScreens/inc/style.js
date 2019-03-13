import { StyleSheet, Dimensions } from "react-native";

export default (styles = StyleSheet.create({
  buttonBottom: {
    color: "red",
    fontWeight: "bold",
    backgroundColor: "#fff",
    fontSize: 8
  },
  bottomPanel: {
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    width: "100%"
  },
  buttonImage: {
    height: 25,
    marginBottom: 5
  },
  buttonText: {
    fontSize: 10,
    textAlign: "center"
  }
}));
