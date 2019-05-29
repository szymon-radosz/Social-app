import React, { Component } from "react";
import {
  TextInput,
  Button,
  View,
  TouchableHighlight,
  ScrollView
} from "react-native";
import styles from "./../style";
import axios from "axios";

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
        <TouchableHighlight style={styles.buttonCloseModal}>
          <Button
            title="X"
            color="#000"
            onPress={() => this.props.setShowSavePost()}
          />
        </TouchableHighlight>

        <ScrollView style={styles.postDetailsContainer}>
          <TextInput
            multiline={false}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            placeholder="Temat"
            placeholderTextColor="#333"
          />

          <TextInput
            multiline={false}
            onChangeText={description => this.setState({ description })}
            value={this.state.description}
            placeholder="Treść postu"
            placeholderTextColor="#333"
          />

          {categories.map((category: any, i: number) => {
            return (
              <TouchableHighlight>
                <Button
                  title={category.name}
                  onPress={() => this.selectCategoryId(category.id)}
                  color={
                    category.id === this.state.categoryId ? "blue" : "#000"
                  }
                />
              </TouchableHighlight>
            );
          })}

          <TouchableHighlight>
            <Button
              title="Dodaj"
              onPress={() =>
                this.props.savePost(
                  this.state.title,
                  this.state.description,
                  this.props.user.id,
                  this.state.categoryId
                )
              }
              color="#000"
            />
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}
