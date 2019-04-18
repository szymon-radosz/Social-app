import React, { Component } from "react";
import {
  Platform,
  Button,
  Text,
  TouchableHighlight,
  ScrollView,
  View
} from "react-native";
import axios from "axios";
import SinglePostOnList from "./utils/SinglePostOnList";
import PostDetails from "./utils/PostDetails";
import SavePost from "./utils/SavePost";
import styles from "./style";

interface ForumProps {
  API_URL: string;
  user: any;
}

interface ForumState {
  showPostDetails: boolean;
  showSavePost: boolean;
  showPostDetailsId: number;
  postList: any;
}
export default class Forum extends Component<ForumProps, ForumState> {
  constructor(props: ForumProps) {
    super(props);
    this.state = {
      showPostDetails: false,
      showSavePost: false,
      showPostDetailsId: 0,
      postList: []
    };

    this.getPosts = this.getPosts.bind(this);
    this.setShowPostDetails = this.setShowPostDetails.bind(this);
    this.savePost = this.savePost.bind(this);
    this.setShowSavePost = this.setShowSavePost.bind(this);
  }

  setShowPostDetails = (): void => {
    this.setState(prevState => ({
      showPostDetails: !prevState.showPostDetails
    }));
  };

  setShowSavePost = (): void => {
    this.setState(prevState => ({
      showSavePost: !prevState.showSavePost
    }));
  };

  getPosts = (): void => {
    let API_URL = this.props.API_URL;

    let that = this;

    axios
      .get(API_URL + "/api/posts")
      .then(function(response) {
        if (response.data.status === "OK") {
          //console.log(["getAuctionProducts", response]);

          that.setState({
            postList: response.data.result
          });

          console.log(response.data);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getPostDetails = (postId: number): void => {
    this.setState({ showPostDetailsId: postId });
    this.setShowPostDetails();
  };

  savePost = (
    title: string,
    description: string,
    userId: number,
    categoryId: number
  ): void => {
    let API_URL = this.props.API_URL;

    if (
      title !== "" &&
      description !== "" &&
      userId !== 0 &&
      categoryId !== 0
    ) {
      console.log([title, description, userId, categoryId]);

      let that = this;

      axios
        .post(API_URL + "/api/savePost", {
          title: title,
          description: description,
          userId: userId,
          categoryId: categoryId
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            console.log(["savePost", response]);
            that.setState({ showSavePost: false });
            that.getPosts();
          } else {
            console.log(response.data.result);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log("uzupelnij wszystkie dane");
    }
  };

  componentDidMount = (): void => {
    this.getPosts();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>E-mamy.pl Forum</Text>

        {this.state.showPostDetails &&
          this.state.showPostDetailsId &&
          !this.state.showSavePost && (
            <PostDetails
              postDetailsId={this.state.showPostDetailsId}
              API_URL={this.props.API_URL}
              user={this.props.user}
              setShowPostDetails={this.setShowPostDetails}
            />
          )}

        {!this.state.showPostDetails && this.state.showSavePost && (
          <SavePost
            API_URL={this.props.API_URL}
            user={this.props.user}
            savePost={this.savePost}
            setShowSavePost={this.setShowSavePost}
          />
        )}

        <ScrollView>
          {this.state.postList &&
            this.state.postList.map(
              (
                post: {
                  title: string;
                  comments: any;
                  created_at: string;
                  votes: any;
                  id: number;
                },
                i: number
              ) => {
                return (
                  <SinglePostOnList
                    getPostDetails={this.getPostDetails}
                    key={i}
                    post={post}
                  />
                );
              }
            )}

          <TouchableHighlight style={styles.buttonCloseModal}>
            <Button
              title="Dodaj post"
              color="#000"
              onPress={() => this.setShowSavePost()}
            />
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}
