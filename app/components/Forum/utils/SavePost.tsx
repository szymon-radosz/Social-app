import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView
} from "react-native";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import Alert from "./../../Alert/Alert";
import styles from "./../style";
import axios from "axios";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../Utils/ButtonComponent";
import InputComponent from "./../../Utils/InputComponent";
import TextAreaComponent from "./../../Utils/TextAreaComponent";
import { GlobalContext } from "./../../../Context/GlobalContext";
import lang from "./../../../assets/lang/Forum/utils/SavePost";

const loaderImage: any = require("./../../../assets/images/loader.gif");

interface SavePostState {
  title: string;
  description: string;
  categoryId: number;
  categories: any;
}

interface SavePostProps {
  API_URL: string;
  user: any;
  setShowSavePost: any;
  navigation: any;
}

class SavePost extends Component<SavePostProps, SavePostState> {
  constructor(props: SavePostProps) {
    super(props);
    this.state = {
      title: "",
      description: "",
      categories: [],
      categoryId: 0
    };
  }

  savePost = (
    title: string,
    description: string,
    userId: number,
    categoryId: number
  ): void => {
    let API_URL = this.context.API_URL;

    if (!title || !description || categoryId === 0) {
      this.context.setAlert(true, "danger", lang.allFieldsError["en"]);
    }

    if (
      title !== "" &&
      description !== "" &&
      userId !== 0 &&
      categoryId !== 0
    ) {
      axios
        .post(API_URL + "/api/savePost", {
          title: title,
          description: description,
          userId: userId,
          categoryId: categoryId
        })
        .then(response => {
          if (response.data.status === "OK") {
            this.setState({ title: "", description: "", categoryId: 0 });

            this.props.navigation.navigate("PostDetails", {
              postId: response.data.result.id
            });

            this.context.setAlert(true, "success", lang.postAddedSuccess["en"]);
          } else {
            this.context.setAlert(true, "danger", lang.postAddedError["en"]);
          }
        })
        .catch(error => {
          this.context.setAlert(true, "danger", lang.postAddedError["en"]);
        });
    } else {
      this.context.setAlert(true, "danger", lang.allFieldsError["en"]);
    }
  };

  getCategories = (): void => {
    try {
      let API_URL = this.context.API_URL;

      this.context.setShowLoader(true);

      axios
        .get(API_URL + "/api/getPostsCategories")
        .then(async response => {
          //console.log(response);
          if (response.data.status === "OK") {
            await this.setState({ categories: response.data.result });

            this.context.setShowLoader(false);
          }
        })
        .catch(async error => {
          //console.log(error);

          this.context.setShowLoader(false);
        });
    } catch (e) {
      //console.log(e);
    }
  };

  selectCategoryId = (categoryId: number): void => {
    this.setState({ categoryId: categoryId });
    //console.log(categoryId);
  };

  componentDidMount = (): void => {
    this.getCategories();
  };

  render() {
    const { categories } = this.state;

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
                <ScrollView
                  keyboardShouldPersistTaps={"always"}
                  style={styles.relative}
                >
                  <PageHeader
                    boldText={lang.addNewPost["en"]}
                    normalText={""}
                    closeMethod={() => this.props.navigation.goBack(null)}
                    closeMethodParameter={""}
                  />
                  <View style={{ marginBottom: 10 }}>
                    <View style={styles.savePostInputContainer}>
                      <InputComponent
                        placeholder={lang.subject["en"]}
                        inputOnChange={(title: string) =>
                          this.setState({ title })
                        }
                        value={this.state.title}
                        secureTextEntry={false}
                        maxLength={400}
                      />

                      <TextAreaComponent
                        placeholder={lang.content["en"]}
                        inputOnChange={(description: string) =>
                          this.setState({ description })
                        }
                        value={this.state.description}
                        maxLength={500}
                        multiline={true}
                        numberOfLines={10}
                      />
                    </View>

                    <Text style={styles.savePostCategoryHeaderText}>
                      {lang.category["en"]}
                    </Text>

                    {categories.map((category: any, i: number) => {
                      return (
                        <View
                          style={{
                            flexWrap: "wrap",
                            alignItems: "flex-start",
                            flexDirection: "row",
                            paddingBottom: 10,
                            paddingLeft: 10
                          }}
                          key={`categories-${i}`}
                        >
                          <TouchableOpacity
                            onPress={() => this.selectCategoryId(category.id)}
                            style={
                              category.id == this.state.categoryId
                                ? {
                                    width: 20,
                                    height: 20,
                                    borderWidth: 1,
                                    backgroundColor: "#f7b67e",
                                    borderColor: "#f7b67e",
                                    borderRadius: 20,
                                    marginRight: 5
                                  }
                                : {
                                    width: 20,
                                    height: 20,
                                    borderWidth: 1,
                                    backgroundColor: "white",
                                    borderRadius: 20,
                                    marginRight: 5
                                  }
                            }
                          />

                          <Text
                            style={
                              category.id == this.state.categoryId
                                ? styles.optionTextActive
                                : styles.optionText
                            }
                            onPress={() => this.selectCategoryId(category.id)}
                          >
                            {category.name}
                          </Text>
                        </View>
                      );
                    })}

                    <ButtonComponent
                      pressButtonComponent={() =>
                        this.savePost(
                          this.state.title,
                          this.state.description,
                          this.context.userData.id,
                          this.state.categoryId
                        )
                      }
                      buttonComponentText={lang.addNewPost["en"]}
                      fullWidth={true}
                      underlayColor="#dd904d"
                      whiteBg={false}
                      showBackIcon={false}
                    />
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
SavePost.contextType = GlobalContext;
export default SavePost;
