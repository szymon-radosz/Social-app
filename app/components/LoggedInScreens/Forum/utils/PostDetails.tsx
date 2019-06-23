import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, ScrollView } from "react-native";
import SinglePostDetailsComment from "./SinglePostDetailsComment";
import styles from "./../style";
import axios from "axios";
import SavePostComment from "./SavePostComment";
import { v4 as uuid } from "uuid";
import PageHeader from "./../../SharedComponents/PageHeader";

const like: any = require("./../../../../assets/images/like.png");
const comment: any = require("./../../../../assets/images/comment.png");

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
  postDetailsId: number;
  API_URL: string;
  setShowPostDetails: any;
  user: any;
}

export default class PostDetails extends Component<
  PostDetailsProps,
  PostDetailsState
> {
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

    this.getPostById = this.getPostById.bind(this);
    this.savePostVote = this.savePostVote.bind(this);
    this.getPostComments = this.getPostComments.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.setCommentMessage = this.setCommentMessage.bind(this);
    this.clearCommentMessage = this.clearCommentMessage.bind(this);
  }

  setCommentMessage = (message: string): void => {
    this.setState({ commentMessage: message });
  };

  clearCommentMessage = (): void => {
    this.setState({ commentMessage: "" });
  };

  getPostById = (): void => {
    try {
      let API_URL = this.props.API_URL;
      let postId = this.props.postDetailsId;

      let that = this;

      axios
        .post(API_URL + "/api/getPostById", {
          postId: postId
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            that.setState({
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
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  savePostVote = (): void => {
    let API_URL = this.props.API_URL;
    let userId = this.props.user.id;
    let postId = this.props.postDetailsId;

    let that = this;

    if (userId != this.state.authorId) {
      axios
        .post(API_URL + "/api/savePostVote", {
          postId: postId,
          userId: userId
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            that.setState({ postVotes: that.state.postVotes + 1 });
          } else {
            console.log(response.data.result);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log("nie mozesz glosowac na swoje posty");
    }
  };

  getPostComments = (): void => {
    let API_URL = this.props.API_URL;
    let postId = this.props.postDetailsId;

    let that = this;

    axios
      .post(API_URL + "/api/getPostCommentsByPostId", {
        postId: postId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({ comments: [] });
          that.setState({ comments: response.data.result });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  saveCommentVote = (commentId: number): void => {
    let API_URL = this.props.API_URL;
    let userId = this.props.user.id;

    console.log([commentId, userId, this.state.authorId]);

    let that = this;

    axios
      .post(API_URL + "/api/saveCommentVote", {
        commentId: commentId,
        userId: userId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["saveCommentVote", response]);

          that.getPostComments();
        } else {
          console.log(response.data.result);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  saveComment = (postId: number, userId: number, body: string): void => {
    let API_URL = this.props.API_URL;
    let that = this;

    axios
      .post(API_URL + "/api/addNotification", {
        type: "comment_for_your_forum_post",
        message: `Użytkowniczka ${this.props.user.name} (${
          this.props.user.email
        }) dodała komentarz do Twojego posta na forum.`,
        userId: this.state.authorId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["started_conversation_user addNotification", response]);
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .post(API_URL + "/api/savePostComment", {
        body: body,
        userId: userId,
        postId: postId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["savePostComment", response]);

          that.getPostComments();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount = (): void => {
    this.getPostById();
  };

  render() {
    const {
      postTitle,
      postDesc,
      postVotes,
      postDate,
      authorName,
      authorEmail,
      authorPhotoPath,
      comments,
      commentMessage
    } = this.state;
    return (
      <View style={{ position: "relative" }}>
        <PageHeader
          boldText={postTitle}
          normalText={""}
          closeMethod={this.props.setShowPostDetails}
          closeMethodParameter={""}
        />

        <ScrollView>
          <View style={styles.postDetailsContainerPadding}>
            <View style={styles.postDetailsContainer}>
              <TouchableOpacity>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${this.props.API_URL}userPhotos/${authorPhotoPath}`
                  }}
                />
              </TouchableOpacity>
              <View style={styles.postDetailsAuthorContainer}>
                <Text style={styles.postDetailsAuthorContainerName}>
                  {authorName}
                </Text>
                <Text style={styles.postDetailsAuthorContainerEmail}>
                  {authorEmail}
                </Text>
              </View>
            </View>
            <Text style={styles.postDetailsDesc}>{postDesc}</Text>
            <Text style={styles.postDetailsPostDate}>
              Utworzono: {postDate}
            </Text>
            <View style={styles.postDetailsPostVoteContainer}>
              <View style={styles.postDetailsPostVoteWrapper}>
                <Text style={styles.postDetailsPostVoteCount}>{postVotes}</Text>
                <TouchableOpacity onPress={() => this.savePostVote()}>
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
                Komentarze:
              </Text>
            ) : null}

            {comments.map((comment: any, i: number) => {
              return (
                <SinglePostDetailsComment
                  API_URL={this.props.API_URL}
                  key={uuid()}
                  comment={comment}
                  saveCommentVote={this.saveCommentVote}
                />
              );
            })}
          </View>
          <SavePostComment
            saveComment={this.saveComment}
            postId={this.props.postDetailsId}
            user={this.props.user}
            setCommentMessage={this.setCommentMessage}
            commentMessage={commentMessage}
            clearCommentMessage={this.clearCommentMessage}
          />
        </ScrollView>
      </View>
    );
  }
}
