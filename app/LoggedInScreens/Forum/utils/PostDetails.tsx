import React, { Component } from "react";
import {
  Platform,
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Alert from "./../../../Alert/Alert";
import { v4 as uuid } from "uuid";
import styles from "./../style";
import axios from "axios";
import SavePostComment from "./SavePostComment";
import like from "./../../../assets/images/like.png";
import comment from "./../../../assets/images/comment.png";

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
      comments: []
    };

    this.getPostById = this.getPostById.bind(this);
    this.savePostVote = this.savePostVote.bind(this);
    this.getPostComments = this.getPostComments.bind(this);
    this.saveComment = this.saveComment.bind(this);
  }

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
          console.log(response);
          if (response.data.status === "OK") {
            console.log(response.data.result[0]);
            console.log(response.data.result[0].users.name);

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

    console.log([postId, userId, this.state.authorId]);

    let that = this;

    if (userId != this.state.authorId) {
      axios
        .post(API_URL + "/api/savePostVote", {
          postId: postId,
          userId: userId
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            console.log(["savePostVote", response]);

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

    console.log([postId]);

    let that = this;

    axios
      .post(API_URL + "/api/getPostCommentsByPostId", {
        postId: postId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["getPostCommentsByPostId", response]);

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

    console.log(["saveComment", postId, userId, body]);
    let that = this;

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
        } else {
          console.log(response.data.result);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount = (): void => {
    console.log(this.props.postDetailsId);
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
      comments
    } = this.state;
    return (
      <View style={{ position: "relative" }}>
        <TouchableHighlight style={styles.buttonCloseModal}>
          <Button
            title="<"
            color="#fff"
            onPress={() => this.props.setShowPostDetails()}
          />
        </TouchableHighlight>

        <ScrollView style={styles.postDetailsContainer}>
          <View style={{ padding: 10 }}>
            <View
              style={{
                marginLeft: 35,
                marginTop: 10,
                marginBottom: 20,
                position: "relative",
                flexWrap: "wrap",
                alignItems: "flex-start",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${this.props.API_URL}userPhotos/${authorPhotoPath}`
                  }}
                />
              </TouchableOpacity>
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 16 }}>{authorName}</Text>
                <Text style={{ fontSize: 12 }}>{authorEmail}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{postTitle}</Text>
            <Text style={{ marginBottom: 10 }}>{postDesc}</Text>
            <Text style={{ marginBottom: 5, fontSize: 12 }}>
              Utworzono: {postDate}
            </Text>
            <View
              style={{
                flexWrap: "wrap",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 5,
                marginTop: 5
              }}
            >
              <View
                style={{
                  flexWrap: "wrap",
                  alignItems: "center",
                  flexDirection: "row",
                  marginBottom: 5
                }}
              >
                <Text style={{ color: "#f7b67e", fontSize: 18 }}>
                  {postVotes}
                </Text>
                <TouchableOpacity>
                  <Image
                    style={{ height: 20 }}
                    resizeMode="contain"
                    source={like}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexWrap: "wrap",
                  alignItems: "center",
                  flexDirection: "row"
                }}
              >
                <Text style={{ color: "#f7b67e", fontSize: 18 }}>
                  {comments.length}
                </Text>
                <TouchableOpacity>
                  <Image
                    style={{ height: 20 }}
                    resizeMode="contain"
                    source={comment}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableHighlight
              style={{
                height: 35,
                width: 180,
                marginTop: 5,
                fontSize: 10,
                borderRadius: 6,
                borderColor: "#f7b67e",
                borderWidth: 2,
                backgroundColor: "#f7b67e",
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() => this.savePostVote()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                To mi się podoba!
              </Text>
            </TouchableHighlight>
            {/* <Text>Głosy: {postVotes}</Text>
          <TouchableHighlight>
            <Button
              title="Zagłosuj"
              onPress={() => this.savePostVote()}
              color="#000"
            />
            </TouchableHighlight>*/}
            <Text style={{ marginBottom: 10 }}>Komentarze:</Text>
            {comments.map((comment: any, i: number) => {
              return (
                <View style={styles.postDetailsComment}>
                  <View
                    style={{
                      flexWrap: "wrap",
                      alignItems: "center",
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        style={styles.image}
                        source={{
                          uri: `${this.props.API_URL}userPhotos/${
                            comment.users.photo_path
                          }`
                        }}
                      />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 10 }}>
                      <Text>{comment.users.name}</Text>
                      <Text>{comment.users.email}</Text>
                    </View>
                  </View>
                  <Text style={{ marginTop: 10, marginBottom: 10 }}>
                    {comment.body}
                  </Text>
                  <Text style={{ marginBottom: 5, fontSize: 12 }}>
                    {comment.created_at}
                  </Text>

                  <View
                    style={{
                      flexWrap: "wrap",
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: 5,
                      marginTop: 5
                    }}
                  >
                    <View
                      style={{
                        flexWrap: "wrap",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBottom: 5
                      }}
                    >
                      <Text style={{ color: "#f7b67e", fontSize: 18 }}>
                        {comment.votes.length}
                      </Text>
                      <TouchableOpacity>
                        <Image
                          style={{ height: 20 }}
                          resizeMode="contain"
                          source={like}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableHighlight
                    style={{
                      height: 35,
                      width: 180,
                      marginTop: 5,
                      fontSize: 10,
                      borderRadius: 6,
                      borderColor: "#f7b67e",
                      borderWidth: 2,
                      backgroundColor: "#f7b67e",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={() => this.saveCommentVote(comment.id)}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      To mi się podoba!
                    </Text>
                  </TouchableHighlight>

                  {/*<TouchableHighlight>
                  <Button
                    title="Zagłosuj"
                    onPress={() => this.saveCommentVote(comment.id)}
                    color="#000"
                  />
                </TouchableHighlight>*/}
                </View>
              );
            })}
          </View>
          <SavePostComment
            saveComment={this.saveComment}
            postId={this.props.postDetailsId}
            user={this.props.user}
          />
        </ScrollView>
      </View>
    );
  }
}
