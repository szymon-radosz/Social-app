import React, { Component } from "react";
import { Platform, Button, Text, ScrollView, View } from "react-native";
import axios from "axios";
import SinglePostOnList from "./utils/SinglePostOnList";
import PostDetails from "./utils/PostDetails";
import styles from "./style";

interface ForumProps {
  API_URL: string;
  user: any;
}

interface ForumState {
  showPostDetails: boolean;
  showPostDetailsId: number;
  postList: any;
}
export default class Forum extends Component<ForumProps, ForumState> {
  constructor(props: ForumProps) {
    super(props);
    this.state = {
      showPostDetails: false,
      showPostDetailsId: 0,
      postList: []
    };

    this.getPosts = this.getPosts.bind(this);
    this.setShowPostDetails = this.setShowPostDetails.bind(this);
  }

  setShowPostDetails = (): void => {
    this.setState(prevState => ({
      showPostDetails: !prevState.showPostDetails
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

  componentDidMount = (): void => {
    this.getPosts();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>E-mamy.pl Forum</Text>

        {this.state.showPostDetails && this.state.showPostDetailsId && (
          <PostDetails
            postDetailsId={this.state.showPostDetailsId}
            API_URL={this.props.API_URL}
            user={this.props.user}
            setShowPostDetails={this.setShowPostDetails}
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
        </ScrollView>
      </View>
    );
  }
}
