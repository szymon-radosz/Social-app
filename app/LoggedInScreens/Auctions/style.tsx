import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  pageTitle: TextStyle;
  pageSubTitle: TextStyle;
  productList: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  pageTitle: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10
  },
  pageSubTitle: {
    textAlign: "center",
    color: "#333",
    fontWeight: "400",
    fontSize: 14,
    paddingBottom: 20
  },
  productList: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  }
});
