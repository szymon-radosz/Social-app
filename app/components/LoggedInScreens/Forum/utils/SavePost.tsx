import React, { Component } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import styles from "./../style";
import axios from "axios";
import { v4 as uuid } from "uuid";
import PageHeader from "./../../SharedComponents/PageHeader";

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
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 6,
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
              padding: 10,
              height: 40,
              borderColor: "#424242",
              textAlignVertical: "top"
            }}
            multiline={false}
            maxLength={150}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            placeholder="Temat"
            placeholderTextColor="#333"
          />

          <TextInput
            multiline={true}
            style={styles.savePostCommentDescInput}
            onChangeText={description => this.setState({ description })}
            maxLength={500}
            value={this.state.description}
            placeholder="Treść postu"
            placeholderTextColor="#333"
          />

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
                key={uuid()}
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

          <TouchableHighlight
            style={styles.addPostBtn}
            onPress={() =>
              this.props.savePost(
                this.state.title,
                this.state.description,
                this.props.user.id,
                this.state.categoryId
              )
            }
            underlayColor={"#dd904d"}
          >
            <Text style={styles.peachBtnText}>Dodaj</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
