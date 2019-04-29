import React, { Component } from "react";
import {
  Platform,
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Alert from "../../../Alert/Alert";
import { v4 as uuid } from "uuid";
import styles from "../style";
import axios from "axios";

interface SingleCategoryState {
  categories: [];
}

interface SingleCategoryProps {
  API_URL: string;
  user: any;
  getPostByCategoryId: any;
}

export default class SingleCategory extends Component<
  SingleCategoryProps,
  SingleCategoryState
> {
  constructor(props: SingleCategoryProps) {
    super(props);
    this.state = {
      categories: []
    };

    this.getCategories = this.getCategories.bind(this);
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

  componentDidMount = (): void => {
    this.getCategories();
  };

  render() {
    let { categories } = this.state;

    return (
      <View style={styles.relative}>
        <ScrollView style={styles.postDetailsContainer}>
          {categories.map((category: any, i: number) => {
            return (
              <TouchableHighlight
                onPress={() =>
                  this.props.getPostByCategoryId(category.id, true)
                }
              >
                <View style={{ borderWidth: 1, width: "100%" }}>
                  <Text>{category.name}</Text>
                  <Text>{category.posts.length} Posty</Text>
                  {/*<Button
                  title={category.name}
                 
                  color={
                    category.id === this.props.showSingleCategoryId
                      ? "blue"
                      : "#000"
                  }
                />*/}
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
