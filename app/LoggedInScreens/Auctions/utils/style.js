import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  conversationBoxContainer: { borderWidth: 1, width: "100%" },
  image: { width: 45, height: 45 },
  unreadedConversation: { color: "blue" },
  readedConversation: { color: "#000" },
  mainModalContainer: {
    width: fullWidth,
    height: fullHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: -80,
    zIndex: 5
  },
  userDetailsModalContentContainer: {
    backgroundColor: "#fff",
    width: fullWidth - 40,
    height: fullHeight / 2,
    position: "absolute",
    top: fullHeight / 6,
    left: 20,
    zIndex: 10,
    borderRadius: 5
  },
  relative: {
    position: "relative"
  },
  userDetailsHeader: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30
  },
  userDetailsImage: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  userDetailsHeaderText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20
  },
  userDetailsContent: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  userDetailsContentHeader: {
    fontSize: 16,
    fontWeight: "600"
  },
  userDetailsContentHobbyContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  userDetailsRedirectMessageBtnContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  userDetailsRedirectMessageBtn: {
    height: 35,
    width: 120,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonCloseModal: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 11,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: "#7f7f7f",
    borderBottomColor: "#7f7f7f"
  },
  userMessageHeader: {
    fontSize: 20,
    marginBottom: 20
  },
  userMessageTextArea: {
    height: 80,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    padding: 5
  },
  userMessageBtn: {
    height: 35,
    width: 120,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10
  },
  userListSingleUserContainer: {
    width: "46%",
    margin: "2%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    position: "relative",
    height: 180
  },
  userListSingleUserImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 5
  },
  userListSingleUserBtn: {
    height: 35,
    width: 120,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  userListImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  userListText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    fontWeight: "400"
  },
  userContainer: {
    borderRadius: 5,
    borderColor: "#e07b8d",
    borderWidth: 1,
    padding: 5
  },
  showUserDetails: {
    height: 35,
    width: 100,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 10
  }
});
