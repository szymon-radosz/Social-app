import React, { Component, Suspense } from "react";
import {
  Button,
  Text,
  TouchableHighlight,
  ImageBackground,
  View
} from "react-native";
import axios from "axios";
import CategoryDetailsSinglePostOnList from "./utils/CategoryDetailsSinglePostOnList";
import styles from "./style";
import { v4 as uuid } from "uuid";
import PageHeader from "./../SharedComponents/PageHeader";
import Alert from "./../../../Alert/Alert";

const forumBg: any = require("./../../../assets/images/forumBgMin.jpg");

const PostDetails = React.lazy(() => import("./utils/PostDetails"));
const SavePost = React.lazy(() => import("./utils/SavePost"));
const CategoriesList = React.lazy(() => import("./utils/CategoriesList"));

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
  showAlert: boolean;
  alertType: string;
  alertMessage: string;
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
      postList: [],
      showAlert: false,
      alertType: "",
      alertMessage: ""
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
            that.setState({ showAlert: false });
            that.setState({
              showAlert: true,
              alertType: "success",
              alertMessage: "Dziękujemy za dodanie nowego posta.",
              showSavePost: false,
              showSortByCategoryId: 0
            });
            that.getPosts();
          } else {
            console.log(response.data.result);
            that.setState({ showAlert: false });

            that.setState({
              showAlert: true,
              alertType: "danger",
              alertMessage: "Problem z dodaniem nowego posta."
            });
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
    this.setState({ showSortByCategory: true });
  };

  render() {
    const {
      showPostDetails,
      showPostDetailsId,
      showSavePost,
      showSortByCategory,
      showPosts,
      postList,
      categoryName,
      showAlert,
      alertType,
      alertMessage
    } = this.state;
    return (
      <View style={styles.container}>
        {!showPostDetails && !showPosts && !showSavePost && (
          <ImageBackground source={forumBg} style={{ width: "100%" }}>
            <Text style={styles.pageTitle}>
              Podziel się swoją
              {"\n"}wiedzą.
            </Text>
          </ImageBackground>
        )}

        <View style={{ width: "100%" }}>
          {showPostDetails &&
            showPostDetailsId &&
            !showSavePost &&
            !showSortByCategory && (
              <Suspense fallback={<Text>Wczytywanie...</Text>}>
                <PostDetails
                  postDetailsId={showPostDetailsId}
                  API_URL={this.props.API_URL}
                  user={this.props.user}
                  setShowPostDetails={this.setShowPostDetails}
                />
              </Suspense>
            )}

          {!showPostDetails && showSavePost && (
            <Suspense fallback={<Text>Wczytywanie...</Text>}>
              <SavePost
                API_URL={this.props.API_URL}
                user={this.props.user}
                savePost={this.savePost}
                setShowSavePost={this.setShowSavePost}
              />
            </Suspense>
          )}

          {!showPostDetails && !showSavePost && showSortByCategory && (
            <Suspense fallback={<Text>Wczytywanie...</Text>}>
              <CategoriesList
                API_URL={this.props.API_URL}
                user={this.props.user}
                getPostByCategoryId={this.getPostByCategoryId}
              />
            </Suspense>
          )}

          {postList && showPosts && !showPostDetails && (
            <PageHeader
              boldText={"Kategoria: "}
              normalText={categoryName}
              closeMethod={this.setShowSortByCategory}
              closeMethodParameter={true}
            />
          )}

          <View style={{ paddingTop: 10 }}>
            {postList &&
              showPosts &&
              !showPostDetails &&
              postList.map(
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
                    <CategoryDetailsSinglePostOnList
                      getPostDetails={this.getPostDetails}
                      showPosts={showPosts}
                      key={uuid()}
                      post={post}
                    />
                  );
                }
              )}
          </View>

          {!showPostDetails && !showSavePost && showSortByCategory && (
            <TouchableHighlight style={styles.addPostBtn}>
              <Button
                title="Dodaj post"
                color="#fff"
                onPress={() => this.setShowSavePost()}
              />
            </TouchableHighlight>
          )}
        </View>
        {showAlert != false && (
          <Alert alertType={alertType} alertMessage={alertMessage} />
        )}
      </View>
    );
  }
}
