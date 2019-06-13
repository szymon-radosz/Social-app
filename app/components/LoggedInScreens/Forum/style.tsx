import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Dimensions
} from "react-native";
import {
  pageTitleWhite,
  peachColor,
  btnFullWidth,
  lightBorderRadius
} from "./../../../assets/global/globalStyles";

interface Style {
  container: ViewStyle;
  singlePostContainer: ViewStyle;
  buttonCloseModal: TextStyle;
  mainModalContainer: TextStyle;
  userDetailsModalContentContainer: ViewStyle;
  relative: ViewStyle;
  addCommentBtn: any;
  addPostBtn: any;
  categoriesListContainer: ViewStyle;
  postDetailsComment: ViewStyle;
  image: ImageStyle;
  activePostCategory: TextStyle;
  pageTitle: any;
  categoryHeaderText: TextStyle;
  singlePostTitle: TextStyle;
  singlePostDate: TextStyle;
  singlePostCommentLength: TextStyle;
  singlePostLikeContainer: ViewStyle;
  singlePostLikeContainerVoteLength: TextStyle;
  singlePostLikeContainerLikeIcon: ImageStyle;
  categoriesListTextHeader: TextStyle;
  singleCategoryOnListContainer: ViewStyle;
  singleCategoryOnListPostsLength: TextStyle;
  postDetailsContainerPadding: ViewStyle;
  postDetailsContainer: ViewStyle;
  postDetailsAuthorContainer: ViewStyle;
  postDetailsAuthorContainerName: TextStyle;
  postDetailsAuthorContainerEmail: TextStyle;
  postDetailsTitle: TextStyle;
  postDetailsDesc: ViewStyle;
  postDetailsPostDate: TextStyle;
  postDetailsPostVoteContainer: ViewStyle;
  postDetailsPostVoteWrapper: ViewStyle;
  postDetailsPostVoteCount: TextStyle;
  postDetailsPostVoteImage: ImageStyle;
  postDetailsPostCommentCountWrapper: ViewStyle;
  postDetailsPostCommentCountText: TextStyle;
  postDetailsPostCommentListHeader: ViewStyle;
  savePostCommentInput: ViewStyle;
}

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

export default StyleSheet.create<Style>({
  container: {
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  pageTitle: pageTitleWhite,
  addPostBtn: btnFullWidth,
  addCommentBtn: btnFullWidth,
  singlePostContainer: {
    borderWidth: 1,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 6,
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonCloseModal: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 11,
    paddingRight: 3,
    backgroundColor: peachColor,
    borderBottomRightRadius: lightBorderRadius
  },
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
    height: fullHeight - 300,
    position: "absolute",
    top: fullHeight / 6,
    left: 20,
    zIndex: 10,
    borderRadius: 5
  },
  relative: {
    position: "relative"
  },
  postDetailsComment: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6
  },
  activePostCategory: { color: "blue" },
  image: { width: 50, height: 50, borderRadius: 6 },
  categoryHeaderText: {
    paddingTop: 15,
    paddingBottom: 20,
    fontSize: 18,
    textAlign: "center"
  },
  singlePostTitle: { fontSize: 18 },
  singlePostDate: { fontSize: 12 },
  singlePostCommentLength: { fontSize: 12 },
  singlePostLikeContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row"
  },
  singlePostLikeContainerVoteLength: { color: "#f7b67e", fontSize: 18 },
  singlePostLikeContainerLikeIcon: { height: 20 },
  categoriesListTextHeader: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20
  },
  categoriesListContainer: { marginLeft: 10, marginRight: 10, width: "100%" },
  singleCategoryOnListContainer: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 6
  },
  singleCategoryOnListPostsLength: { fontSize: 10 },
  postDetailsContainerPadding: { padding: 10 },
  postDetailsContainer: {
    marginLeft: 35,
    marginTop: 10,
    marginBottom: 20,
    position: "relative",
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  postDetailsAuthorContainer: { paddingLeft: 10 },
  postDetailsAuthorContainerName: { fontSize: 16 },
  postDetailsAuthorContainerEmail: { fontSize: 12 },
  postDetailsTitle: { fontSize: 16, marginBottom: 5 },
  postDetailsDesc: { marginBottom: 10 },
  postDetailsPostDate: { marginBottom: 5, fontSize: 12 },
  postDetailsPostVoteContainer: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5
  },
  postDetailsPostVoteWrapper: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5
  },
  postDetailsPostVoteCount: { color: "#f7b67e", fontSize: 18 },
  postDetailsPostVoteImage: { height: 20 },
  postDetailsPostCommentCountWrapper: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row"
  },
  postDetailsPostCommentCountText: { color: "#f7b67e", fontSize: 18 },
  postDetailsPostCommentListHeader: { marginBottom: 10 },
  savePostCommentInput: {
    borderWidth: 1,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 10
  }
});
