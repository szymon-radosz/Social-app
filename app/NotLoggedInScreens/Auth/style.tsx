import { StyleSheet, ViewStyle, TextStyle } from "react-native";

//TextStyle for elements which contains e.g. fontWeight, textAlign
//ViewStyle for elements which contains e.g. backgroundColor, borderStyle
interface Style {
  container: ViewStyle;
  headerText: TextStyle;
  logoDesc: TextStyle;
  input: ViewStyle;
  mainBtn: TextStyle;
  subMainBtn: TextStyle;
  askDesc: TextStyle;
}

export default StyleSheet.create<Style>({
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
  mainBtn: {
    height: 45,
    width: 180,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 30
  },
  subMainBtn: {
    color: "#e07b8d"
  },
  askDesc: {
    fontSize: 14,
    fontWeight: "300"
  }
});
