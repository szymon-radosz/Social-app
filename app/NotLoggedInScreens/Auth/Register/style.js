import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  headerText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 24,
    marginTop: 40,
    paddingBottom: 20
  },
  logoDesc: {
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
    fontSize: 16,
    paddingBottom: 30
  },
  input: {
    width: "90%",
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  loginBtn: {
    height: 45,
    width: 180,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 30
  },
  askDesc: {
    fontSize: 14,
    fontWeight: "300"
  },
  registerBtn: {}
});
