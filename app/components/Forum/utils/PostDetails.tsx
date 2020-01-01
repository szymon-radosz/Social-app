import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  SafeAreaView
} from "react-native";
import Alert from "./../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import SinglePostDetailsComment from "./SinglePostDetailsComment";
import styles from "./../style";
import axios from "axios";
import SavePostComment from "./SavePostComment";
import PageHeader from "./../../SharedComponents/PageHeader";
import { GlobalContext } from "./../../../Context/GlobalContext";
import lang from "./../../../assets/lang/Forum/utils/PostDetails";
import moment from "moment";

const like: any = require("./../../../assets/images/like.png");
const comment: any = require("./../../../assets/images/comment.png");
const loaderImage: any = require("./../../../assets/images/loader.gif");

interface PostDetailsState {
  postTitle: string;
  postDesc: string;
  postVotes: any;
  postDate: string;
  authorId: number;
  authorName: string;
  authorEmail: string;
  authorPhotoPath: string;
  comments: any;
  commentMessage: string;
}

interface PostDetailsProps {
  navigation: any;
}

class PostDetails extends Component<PostDetailsProps, PostDetailsState> {
  constructor(props: PostDetailsProps) {
    super(props);
    this.state = {
      postTitle: "",
      postDesc: "",
      postVotes: 0,
      postDate: "",
      authorId: 0,
      authorName: "",
      authorEmail: "",
      authorPhotoPath: "",
      comments: [],
      commentMessage: ""
    };
  }

  setCommentMessage = (message: string): void => {
    this.setState({ commentMessage: message });
  };

  clearCommentMessage = (): void => {
    this.setState({ commentMessage: "" });
  };

  getPostById = (id: number): void => {
    try {
      let API_URL = this.context.API_URL;
      let postId = id;

      this.context.setShowLoader(true);

      axios
        .post(API_URL + "/api/getPostById", {
          postId: postId
        })
        .then(async response => {
          if (response.data.status === "OK") {
            /*console.log([
              "response.data.result[0]",
              response.data.result[0],
              response.data.result[0].users.id,
              that.context.userData.id
            ]);*/
            await this.setState({
              postTitle: response.data.result[0].title,
              postDesc: response.data.result[0].description,
              postVotes: response.data.result[0].votes.length,
              postDate: response.data.result[0].created_at,
              authorId: response.data.result[0].users.id,
              authorName: response.data.result[0].users.name,
              authorEmail: response.data.result[0].users.email,
              authorPhotoPath: response.data.result[0].users.photo_path,
              comments: response.data.result[0].comments
            });

            await this.context.setShowLoader(false);
          }
        })
        .catch(async error => {
          await this.context.setAlert(
            true,
            "danger",
            lang.postDetailsError["en"]
          );

          await this.context.setShowLoader(false);
        });
    } catch (e) {
      this.context.setAlert(true, "danger", lang.postDetailsError["en"]);
    }
  };

  savePostVote = (): void => {
    let API_URL = this.context.API_URL;
    let userId = this.context.userData.id;
    let postId = this.props.navigation.state.params.postId;

    if (userId != this.state.authorId) {
      axios
        .post(API_URL + "/api/savePostVote", {
          postId: postId,
          userId: userId
        })
        .then(response => {
          if (response.data.status === "OK") {
            this.context.setAlert(true, "success", lang.voteSaveSuccess["en"]);
            this.getPostById(this.props.navigation.state.params.postId);
          } else {
            this.context.setAlert(
              true,
              "danger",
              lang.existsCommentVoteError["en"]
            );
          }
        })
        .catch(error => {
          this.context.setAlert(true, "danger", lang.voteSaveError["en"]);
        });
    } else {
      this.context.setAlert(true, "danger", lang.voteSaveError["en"]);
    }
  };

  getPostComments = (): void => {
    let API_URL = this.context.API_URL;
    let postId = this.props.navigation.state.params.postId;

    axios
      .post(API_URL + "/api/getPostCommentsByPostId", {
        postId: postId
      })
      .then(response => {
        if (response.data.status === "OK") {
          this.setState({ comments: [] });
          this.setState({ comments: response.data.result });
        }
      })
      .catch(error => {
        this.context.setAlert(true, "danger", lang.commentListError["en"]);
      });
  };

  checkIfUserAddedVote = (votes: any, userId: number) => {
    return new Promise(resolve => {
      let allowUserVote = true;

      votes.map((vote: any, i: number) => {
        //user add vote to comment in the past
        if (vote.user_id === userId) {
          allowUserVote = false;
        }
      });

      resolve(allowUserVote);
    });
  };

  saveCommentVote = async (
    commentId: number,
    commentAuthorId: number,
    votes: any
  ) => {
    let API_URL = this.context.API_URL;
    let userId = this.context.userData.id;

    if (commentAuthorId && commentAuthorId !== userId) {
      let allowUserVote = await this.checkIfUserAddedVote(votes, userId);

      if (allowUserVote) {
        axios
          .post(API_URL + "/api/saveCommentVote", {
            commentId: commentId,
            userId: userId
          })
          .then(response => {
            //console.log(response.data);
            if (response.data.status === "OK") {
              this.context.setAlert(
                true,
                "success",
                lang.voteSaveSuccess["en"]
              );
              this.getPostComments();
            }
          })
          .catch(error => {
            this.context.setAlert(true, "danger", lang.voteSaveError["en"]);
          });
      } else {
        this.context.setAlert(
          true,
          "danger",
          lang.existsCommentVoteError["en"]
        );
      }
    } else {
      this.context.setAlert(true, "danger", lang.selfCommentVoteError["en"]);
    }
  };

  saveComment = (postId: number, userId: number, body: string): void => {
    let API_URL = this.context.API_URL;
    let openDetailsId = 0;

    if (!body || postId === 0 || userId === 0) {
      this.context.setAlert(true, "danger", lang.commentContentError["en"]);
    } else {
      axios
        .post(API_URL + "/api/savePostComment", {
          body: body,
          userId: userId,
          postId: postId
        })
        .then(response => {
          if (response.data.status === "OK") {
            openDetailsId = response.data.result.post_id;

            this.getPostComments();

            this.context.setAlert(
              true,
              "success",
              lang.addingCommentSuccess["en"]
            );
          }
        })
        .then(response =>
          axios.post(API_URL + "/api/addNotification", {
            type: "comment_for_your_forum_post",
            message: lang.addedCommentToYourPost["en"],
            userId: this.state.authorId,
            senderId: this.context.userData.id,
            openDetailsId: openDetailsId
          })
        )
        .catch(error => {
          this.context.setAlert(true, "danger", lang.addingCommentError["en"]);
        });
    }
  };

  componentDidMount = (): void => {
    //console.log(["PostDetails", this.props.navigation.state.params.postId]);

    this.getPostById(this.props.navigation.state.params.postId);
  };

  render() {
    const {
      postTitle,
      postDesc,
      postVotes,
      postDate,
      authorId,
      authorName,
      authorEmail,
      authorPhotoPath,
      comments,
      commentMessage
    } = this.state;
    const postDateConverted = moment(postDate).format("LLL");
    return (
      <React.Fragment>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff"
          }}
        >
          {this.context.showAlert && (
            <Alert
              alertType={this.context.alertType}
              alertMessage={this.context.alertMessage}
              closeAlert={this.context.closeAlert}
            />
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
            data-test="Forum"
          >
            {this.context.showLoader ? (
              <View style={styles.loaderContainer} data-test="loader">
                <Image
                  style={{ width: 100, height: 100 }}
                  source={loaderImage}
                />
              </View>
            ) : (
              <React.Fragment>
                <ScrollView keyboardShouldPersistTaps={"always"}>
                  <PageHeader
                    boldText={postTitle}
                    normalText={""}
                    closeMethod={() => this.props.navigation.goBack(null)}
                    closeMethodParameter={""}
                  />

                  <View style={styles.postDetailsContainerPadding}>
                    <View style={styles.postDetailsContainer}>
                      <TouchableOpacity>
                        <Image
                          style={styles.image}
                          source={{
                            uri: authorPhotoPath
                          }}
                        />
                      </TouchableOpacity>
                      <View style={styles.postDetailsAuthorContainer}>
                        <Text style={styles.postDetailsAuthorContainerName}>
                          {authorName}
                        </Text>
                        {authorId !== this.context.userData.id && (
                          <TouchableHighlight
                            onPress={async () => {
                              this.props.navigation.navigate("UserDetails", {
                                userId: authorId,
                                showBtns: true
                              });
                            }}
                            underlayColor={"#fff"}
                          >
                            <Text style={styles.conversationDetailsSeeMore}>
                              {lang.seeProfile["en"]}
                            </Text>
                          </TouchableHighlight>
                        )}
                      </View>
                    </View>
                    <Text style={styles.postDetailsDesc}>{postDesc}</Text>
                    <Text style={styles.postDetailsPostDate}>
                      {lang.createdAt["en"]} {postDateConverted}
                    </Text>
                    <View style={styles.postDetailsPostVoteContainer}>
                      <View style={styles.postDetailsPostVoteWrapper}>
                        <Text style={styles.postDetailsPostVoteCount}>
                          {postVotes}
                        </Text>
                        <TouchableOpacity onPress={this.savePostVote}>
                          <Image
                            style={styles.postDetailsPostVoteImage}
                            resizeMode="contain"
                            source={like}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.postDetailsPostCommentCountWrapper}>
                        <Text style={styles.postDetailsPostCommentCountText}>
                          {comments.length}
                        </Text>
                        <TouchableOpacity>
                          <Image
                            style={styles.postDetailsPostVoteImage}
                            resizeMode="contain"
                            source={comment}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {comments.length > 0 ? (
                      <Text style={styles.postDetailsPostCommentListHeader}>
                        {lang.comments["en"]}
                      </Text>
                    ) : null}

                    {comments.map((comment: any, i: number) => {
                      return (
                        <SinglePostDetailsComment
                          API_URL={this.context.API_URL}
                          key={`SinglePostDetailsComment-${i}`}
                          comment={comment}
                          saveCommentVote={this.saveCommentVote}
                          navigation={this.props.navigation}
                        />
                      );
                    })}
                  </View>
                  <SavePostComment
                    saveComment={this.saveComment}
                    postId={this.props.navigation.state.params.postId}
                    user={this.context.userData}
                    setCommentMessage={this.setCommentMessage}
                    commentMessage={commentMessage}
                    clearCommentMessage={this.clearCommentMessage}
                  />
                </ScrollView>

                <BottomPanel
                  data-test="BottomPanel"
                  navigation={this.props.navigation}
                />
              </React.Fragment>
            )}
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
PostDetails.contextType = GlobalContext;
export default PostDetails;
