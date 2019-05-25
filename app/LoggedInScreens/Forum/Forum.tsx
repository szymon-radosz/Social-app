import React, { Component } from "react";
import {
  Platform,
  Button,
  Text,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  View
} from "react-native";
import axios from "axios";
import SinglePostOnList from "./utils/SinglePostOnList";
import PostDetails from "./utils/PostDetails";
import SavePost from "./utils/SavePost";
import SingleCategory from "./utils/SingleCategory";
import forumBg from "./../../assets/images/forumBgMin.jpg";
import styles from "./style";

interface ForumProps {
  API_URL: string;
  user: any;
}

interface ForumState {
  showPostDetails: boolean;
  showSortByCategory: boolean;
  showSavePost: boolean;
  showPostDetailsId: number;
  postList: any;
  showSortByCategoryId: number;
  showPosts: boolean;
  categoryName: string;
}
export default class Forum extends Component<ForumProps, ForumState> {
  constructor(props: ForumProps) {
    super(props);
    this.state = {
      showPostDetails: false,
      showSavePost: false,
      showSortByCategory: false,
      showPostDetailsId: 0,
      showSortByCategoryId: 0,
      showPosts: false,
      categoryName: "",
      postList: []
    };

    this.getPosts = this.getPosts.bind(this);
    this.setShowPostDetails = this.setShowPostDetails.bind(this);
    this.savePost = this.savePost.bind(this);
    this.setShowSavePost = this.setShowSavePost.bind(this);
    this.setShowSortByCategory = this.setShowSortByCategory.bind(this);
    this.getPostByCategoryId = this.getPostByCategoryId.bind(this);
  }

  setShowPostDetails = (): void => {
    this.setState(prevState => ({
      showPostDetails: !prevState.showPostDetails
    }));
    if (this.state.showSortByCategoryId === 0) {
      this.getPosts();
    } else {
      this.getPostByCategoryId(
        this.state.showSortByCategoryId,
        this.state.categoryName,
        false
      );
    }
  };

  setShowSavePost = (): void => {
    this.setState(prevState => ({
      showSavePost: !prevState.showSavePost
    }));
  };

  setShowSortByCategory = (hidePost: boolean): void => {
    if (hidePost) {
      this.setState(prevState => ({
        showSortByCategory: !prevState.showSortByCategory,
        showPosts: false
      }));
    } else {
      this.setState(prevState => ({
        showSortByCategory: !prevState.showSortByCategory,
        showPosts: true
      }));
    }
  };

  getPostByCategoryId = (
    categoryId: number,
    categoryName: string,
    closeModal: boolean
  ): void => {
    let API_URL = this.props.API_URL;

    let that = this;

    console.log(["getPostByCategoryId", categoryName]);

    axios
      .post(API_URL + "/api/getPostByCategoryId", {
        categoryId: categoryId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          //console.log(["getAuctionProducts", response]);
          that.setState({ postList: [] });
          that.setState({
            categoryName: categoryName,
            showSortByCategoryId: categoryId,
            postList: response.data.result,
            showPosts: true
          });

          if (closeModal) {
            that.setShowSortByCategory(false);
          }

          console.log(["getPostByCategoryId", response.data]);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
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
            that.setState({ showSavePost: false, showSortByCategoryId: 0 });
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
    /*this.getPosts();*/

    this.setState({ showSortByCategory: true });
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.showPostDetails && !this.state.showPosts && (
          <ImageBackground source={forumBg} style={{ width: "100%" }}>
            <Text style={styles.pageTitle}>
              Podziel się swoją
              {"\n"}wiedzą.
            </Text>
          </ImageBackground>
        )}

        <View style={{ width: "100%" }}>
          {this.state.showPostDetails &&
            this.state.showPostDetailsId &&
            !this.state.showSavePost &&
            !this.state.showSortByCategory && (
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

          {!this.state.showPostDetails &&
            !this.state.showSavePost &&
            this.state.showSortByCategory && (
              <SingleCategory
                API_URL={this.props.API_URL}
                user={this.props.user}
                getPostByCategoryId={this.getPostByCategoryId}
              />
            )}

          {this.state.postList &&
            this.state.showPosts &&
            !this.state.showPostDetails && (
              <View>
                <TouchableOpacity style={styles.buttonCloseModal}>
                  <Button
                    title="<"
                    onPress={() => {
                      this.setShowSortByCategory(true);
                    }}
                    color="#fff"
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    paddingTop: 15,
                    paddingBottom: 20,
                    fontSize: 18,
                    textAlign: "center"
                  }}
                >
                  Kategoria: {this.state.categoryName}
                </Text>
              </View>
            )}

          {this.state.postList &&
            this.state.showPosts &&
            !this.state.showPostDetails &&
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
                    showPosts={this.state.showPosts}
                    key={i}
                    post={post}
                  />
                );
              }
            )}

          {!this.state.showPostDetails &&
            !this.state.showSavePost &&
            this.state.showSortByCategory && (
              <TouchableHighlight style={styles.addPostBtn}>
                <Button
                  title="Dodaj post"
                  color="#fff"
                  onPress={() => this.setShowSavePost()}
                />
              </TouchableHighlight>
            )}
        </View>
      </View>
    );
  }
}
