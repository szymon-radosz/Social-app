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
      <View style={styles.mainModalContainer}>
        <View style={styles.userDetailsModalContentContainer}>
          <View style={styles.relative}>
            <TouchableHighlight style={styles.buttonCloseModal}>
              <Button
                title="X"
                color="#000"
                onPress={() => this.props.setShowPostDetails()}
              />
            </TouchableHighlight>

            <ScrollView style={styles.postDetailsContainer}>
              <TouchableOpacity>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${this.props.API_URL}userPhotos/${authorPhotoPath}`
                  }}
                />
              </TouchableOpacity>
              <Text>
                {authorName} ({authorEmail})
              </Text>
              <Text>Utworzono: {postDate}</Text>
              <Text>{postTitle}</Text>
              <Text>{postDesc}</Text>
              <Text>Głosy: {postVotes}</Text>
              <TouchableHighlight>
                <Button
                  title="Zagłosuj"
                  onPress={() => this.savePostVote()}
                  color="#000"
                />
              </TouchableHighlight>

              {comments.map((comment: any, i: number) => {
                return (
                  <View style={styles.postDetailsComment}>
                    <Text>
                      {comment.users.name} ({comment.users.email})
                    </Text>
                    <Text>{comment.created_at}</Text>

                    <Text>{comment.body}</Text>

                    <Text>Głosy: {comment.votes.length}</Text>

                    <TouchableHighlight>
                      <Button
                        title="Zagłosuj"
                        onPress={() => this.saveCommentVote(comment.id)}
                        color="#000"
                      />
                    </TouchableHighlight>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
