import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./../style";
import axios from "axios";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../../Utils/ButtonComponent";
import InputComponent from "./../../../Utils/InputComponent";
import TextAreaComponent from "./../../../Utils/TextAreaComponent";

interface SavePostState {
  title: string;
  description: string;
  categoryId: number;
  categories: any;
}

interface SavePostProps {
  API_URL: string;
  user: any;
  savePost: any;
  setShowSavePost: any;
}

export default class SavePost extends Component<SavePostProps, SavePostState> {
  constructor(props: SavePostProps) {
    super(props);
    this.state = {
      title: "",
      description: "",
      categories: [],
      categoryId: 0
    };

    this.getCategories = this.getCategories.bind(this);
    this.selectCategoryId = this.selectCategoryId.bind(this);
  }

  getCategories = (): void => {
    try {
      let API_URL = this.props.API_URL;

      let that = this;

      axios
        .get(API_URL + "/api/getPostsCategories")
        .then(function(response) {
          console.log(response);
          if (response.data.status === "OK") {
            that.setState({ categories: response.data.result });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  selectCategoryId = (categoryId: number): void => {
    this.setState({ categoryId: categoryId });
    console.log(categoryId);
  };

  componentDidMount = (): void => {
    this.getCategories();
  };

  render() {
    let { categories } = this.state;

    return (
      <View style={styles.relative}>
        <PageHeader
          boldText={"Dodaj nowy post"}
          normalText={""}
          closeMethod={this.props.setShowSavePost}
          closeMethodParameter={""}
        />
        <View style={{ marginBottom: 10 }}>
          <View style={styles.savePostInputContainer}>
            <InputComponent
              placeholder="Temat"
              inputOnChange={(title: string) => this.setState({ title })}
              value={this.state.title}
              secureTextEntry={false}
              maxLength={400}
            />

            <TextAreaComponent
              placeholder="Treść postu..."
              inputOnChange={(description: string) =>
                this.setState({ description })
              }
              value={this.state.description}
              maxLength={500}
              multiline={true}
              numberOfLines={10}
            />
          </View>

          <Text style={styles.savePostCategoryHeaderText}>Kategoria: </Text>

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
              this.props.savePost(
                this.state.title,
                this.state.description,
                this.props.user.id,
                this.state.categoryId
              )
            }
            buttonComponentText="Dodaj"
            fullWidth={true}
            underlayColor="#dd904d"
          />
        </View>
      </View>
    );
  }
}
