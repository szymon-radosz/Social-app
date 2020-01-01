import React, { Component, Suspense } from "react";
import {
  Text,
  ImageBackground,
  View,
  SafeAreaView,
  Image,
  ScrollView
} from "react-native";
import Alert from "./../Alert/Alert";
import BottomPanel from "./../SharedComponents/BottomPanel";
import axios from "axios";
import CategoryDetailsSinglePostOnList from "./utils/CategoryDetailsSinglePostOnList";
import styles from "./style";
import PageHeader from "./../SharedComponents/PageHeader";
import { GlobalContext } from "./../../Context/GlobalContext";
import ButtonComponent from "./../Utils/ButtonComponent";
import { withNavigation } from "react-navigation";
import lang from "./../../assets/lang/Forum/Forum";

const forumBg: any = require("./../../assets/images/forumBgMin.jpg");
const loaderImage: any = require("./../../assets/images/loader.gif");

const CategoriesList = React.lazy(() => import("./utils/CategoriesList"));

interface ForumProps {
  setShowFeedbackModal: any;
  navigation: any;
}

interface ForumState {
  showPostDetails: boolean;
  showSortByCategory: boolean;
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
      showSortByCategory: false,
      showPostDetailsId: 0,
      showSortByCategoryId: 0,
      showPosts: false,
      categoryName: "",
      postList: []
    };
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

    this.context.setShowLoader(true);

    axios
      .post(API_URL + "/api/getPostByCategoryId", {
        categoryId: categoryId
      })
      .then(async response => {
        if (response.data.status === "OK") {
          //await that.setState({ postList: [] });
          await this.setState({
            categoryName: categoryName,
            showSortByCategoryId: categoryId,
            postList: response.data.result,
            showPosts: true
          });

          await this.context.setShowLoader(false);

          if (closeModal) {
            this.setShowSortByCategory(false);
          }
        }
      })
      .catch(async error => {
        await this.context.setAlert(
          true,
          "danger",
          lang.categoryListError["en"]
        );

        await this.context.setShowLoader(false);
      });
  };

  getPosts = (): void => {
    let API_URL = this.context.API_URL;

    this.context.setShowLoader(true);

    axios
      .get(API_URL + "/api/posts")
      .then(async response => {
        if (response.data.status === "OK") {
          //console.log(["posts", response.data.result]);
          await this.setState({
            postList: response.data.result
          });

          await this.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        await this.context.setAlert(
          true,
          "danger",
          lang.categoryListError["en"]
        );

        await this.context.setShowLoader(false);
      });
  };

  getPostDetails = (postId: number): void => {
    this.setState({ showPostDetailsId: postId });
    this.setShowPostDetails();
  };

  componentDidMount = (): void => {
    /*if (this.context.userData) {
      this.getMessages();
      this.setState({ displayPrivateMessages: true, showFilterPanel: true });
    }*/

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
      this.setState({ showSortByCategory: true });

      this.context.setCurrentNavName("FORUM");
    });
  };

  componentWillUnmount() {
    //console.log("Focus listener unmount messages");

    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    const {
      showPostDetails,
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
            {this.context.showLoader ? (
              <View style={styles.loaderContainer} data-test="loader">
                <Image
                  style={{ width: 100, height: 100 }}
                  source={loaderImage}
                />
              </View>
            ) : (
              <React.Fragment>
                <ScrollView>
                  {!showPostDetails && !showPosts && (
                    <ImageBackground
                      source={forumBg}
                      style={{ width: "100%" }}
                      data-test="ImageBackground"
                    >
                      <Text style={styles.pageTitle}>{lang.header["en"]}</Text>
                    </ImageBackground>
                  )}

                  <View style={{ width: "100%", marginBottom: 20 }}>
                    {!showPostDetails && showSortByCategory && (
                      <Suspense fallback={<Text>{lang.loading["en"]}</Text>}>
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
                        boldText={lang.category["en"]}
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
                                navigation={this.props.navigation}
                              />
                            );
                          }
                        )}
                    </View>

                    {!showPostDetails && showSortByCategory && (
                      <Text
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                        onPress={() =>
                          this.props.navigation.navigate("FeedbackModal", {})
                        }
                        data-test="ask"
                      >
                        {lang.suggestNewCategory["en"]}{" "}
                        <Text style={{ fontWeight: "600" }}>
                          {lang.writeToUs["en"]}
                        </Text>
                      </Text>
                    )}

                    {!showPostDetails && showSortByCategory && (
                      <ButtonComponent
                        pressButtonComponent={() =>
                          this.props.navigation.navigate("AddNewPost", {})
                        }
                        buttonComponentText={lang.addNewPost["en"]}
                        fullWidth={true}
                        underlayColor="#dd904d"
                        data-test="ButtonComponent"
                        whiteBg={false}
                        showBackIcon={false}
                      />
                    )}
                  </View>
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
Forum.contextType = GlobalContext;
export default withNavigation(Forum);
