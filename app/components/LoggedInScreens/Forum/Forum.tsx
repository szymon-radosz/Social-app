import React, { Component, Suspense } from "react";
import { Text, ImageBackground, View, SafeAreaView } from "react-native";
import Alert from "./../../../Alert/Alert";
import BottomPanel from "./../SharedComponents/BottomPanel";
import axios from "axios";
import CategoryDetailsSinglePostOnList from "./utils/CategoryDetailsSinglePostOnList";
import styles from "./style";
import PageHeader from "./../SharedComponents/PageHeader";
import { GlobalContext } from "./../../Context/GlobalContext";
import ButtonComponent from "./../../Utils/ButtonComponent";

const forumBg: any = require("./../../../assets/images/forumBgMin.jpg");

const PostDetails = React.lazy(() => import("./utils/PostDetails"));
const SavePost = React.lazy(() => import("./utils/SavePost"));
const CategoriesList = React.lazy(() => import("./utils/CategoriesList"));

interface ForumProps {
  setShowFeedbackModal: any;
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
class Forum extends Component<ForumProps, ForumState> {
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
    let API_URL = this.context.API_URL;

    let that = this;

    axios
      .post(API_URL + "/api/getPostByCategoryId", {
        categoryId: categoryId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
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
        }
      })
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Wystąpił błąd z wyświetleniem szczegółów kategorii."
        );
      });
  };

  getPosts = (): void => {
    let API_URL = this.context.API_URL;

    let that = this;

    axios
      .get(API_URL + "/api/posts")
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["posts", response.data.result]);
          that.setState({
            postList: response.data.result
          });
        }
      })
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Wystąpił błąd z wyświetleniem listy postów."
        );
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
    let API_URL = this.context.API_URL;

    if (!title || !description || categoryId === 0) {
      this.context.setAlert(
        true,
        "danger",
        "Prosimy o uzupełnienie wszystkich danych."
      );
    }

    if (
      title !== "" &&
      description !== "" &&
      userId !== 0 &&
      categoryId !== 0
    ) {
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
            that.setState({
              showSavePost: false,
              showSortByCategoryId: 0
            });
            that.getPosts();

            that.context.setAlert(
              true,
              "success",
              "Dziękujemy za dodanie nowego posta."
            );
          } else {
            that.context.setAlert(
              true,
              "danger",
              "Problem z dodaniem nowego posta."
            );
          }
        })
        .catch(function(error) {
          that.context.setAlert(
            true,
            "danger",
            "Problem z dodaniem nowego posta."
          );
        });
    } else {
      this.context.setAlert(
        true,
        "danger",
        "Prosimy o uzupełnienie wszystkich danych."
      );
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
      categoryName
    } = this.state;
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
            <View>
              {!showPostDetails && !showPosts && !showSavePost && (
                <ImageBackground
                  source={forumBg}
                  style={{ width: "100%" }}
                  data-test="ImageBackground"
                >
                  <Text style={styles.pageTitle}>
                    Podziel się swoją
                    {"\n"}wiedzą.
                  </Text>
                </ImageBackground>
              )}

              <View style={{ width: "100%", marginBottom: 20 }}>
                {showPostDetails &&
                  showPostDetailsId &&
                  !showSavePost &&
                  !showSortByCategory && (
                    <Suspense fallback={<Text>Wczytywanie...</Text>}>
                      <PostDetails
                        postDetailsId={showPostDetailsId}
                        setShowPostDetails={this.setShowPostDetails}
                        data-test="PostDetails"
                      />
                    </Suspense>
                  )}

                {!showPostDetails && showSavePost && (
                  <Suspense fallback={<Text>Wczytywanie...</Text>}>
                    <SavePost
                      API_URL={this.context.API_URL}
                      user={this.context.userData}
                      savePost={this.savePost}
                      setShowSavePost={this.setShowSavePost}
                      data-test="SavePost"
                    />
                  </Suspense>
                )}

                {!showPostDetails && !showSavePost && showSortByCategory && (
                  <Suspense fallback={<Text>Wczytywanie...</Text>}>
                    <CategoriesList
                      API_URL={this.context.API_URL}
                      user={this.context.userData}
                      getPostByCategoryId={this.getPostByCategoryId}
                      data-test="CategoriesList"
                    />
                  </Suspense>
                )}

                {postList && showPosts && !showPostDetails && (
                  <PageHeader
                    boldText={"Kategoria: "}
                    normalText={categoryName}
                    closeMethod={this.setShowSortByCategory}
                    closeMethodParameter={true}
                    data-test="PageHeader"
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
                            key={`CategoryDetailsSinglePostOnList-${i}`}
                            post={post}
                            data-test="CategoryDetailsSinglePostOnList"
                          />
                        );
                      }
                    )}
                </View>

                {!showPostDetails && !showSavePost && showSortByCategory && (
                  <Text
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    onPress={this.props.setShowFeedbackModal}
                    data-test="ask"
                  >
                    Masz pomysł na nową kategorię?{" "}
                    <Text style={{ fontWeight: "600" }}>Napisz do nas!</Text>
                  </Text>
                )}

                {!showPostDetails && !showSavePost && showSortByCategory && (
                  <ButtonComponent
                    pressButtonComponent={this.setShowSavePost}
                    buttonComponentText="Dodaj post"
                    fullWidth={true}
                    underlayColor="#dd904d"
                    data-test="ButtonComponent"
                    whiteBg={false}
                    showBackIcon={false}
                  />
                )}
              </View>
            </View>
            <BottomPanel data-test="BottomPanel" />
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
Forum.contextType = GlobalContext;
export default Forum;
