import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  viewContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  image: { width: 45, height: 45 },
  sendMEssage: { alignSelf: "flex-end", position: "absolute", bottom: 35 }
});
