import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  conversationBoxContainer: { borderWidth: 1, width: "100%" },
  image: { width: 45, height: 45 },
  unreadedConversation: { color: "blue" },
  readedConversation: { color: "#000" }
});
