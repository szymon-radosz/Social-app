import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  }
});
