import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: {
    textAlign: "center",
    color: "#333",
    fontWeight: "800",
    fontSize: 24,
    paddingBottom: 10
  },
  logoDesc: {
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
    fontSize: 16,
    paddingBottom: 30
  },
  loginBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 20
  },
  registerBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 20
  }
});
