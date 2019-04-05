import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  messagesList: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  conversationBoxContainer: { borderWidth: 1, width: "100%" },
  image: { width: 45, height: 45 },
  unreadedConversation: { color: "blue" },
  readedConversation: { color: "#000" },
  senderBox: {
    width: "80%",
    textAlign: "right",
    alignSelf: "flex-end",
    backgroundColor: "#ccc",
    fontSize: 12
  },
  receiverBox: {
    width: "80%",
    marginLeft: 0,
    backgroundColor: "green",
    fontSize: 12
  },
  messageDate: {
    width: "80%",
    textAlign: "right",
    alignSelf: "flex-end",
    fontSize: 12
  },
  viewContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  image: { width: 45, height: 45 },
  sendMEssage: { alignSelf: "flex-end", position: "absolute", bottom: 35 }
});
