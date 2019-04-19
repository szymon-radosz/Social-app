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
import Alert from "./../../../Alert/Alert";
import { v4 as uuid } from "uuid";
import styles from "./../style";
import axios from "axios";

interface SortByCategoryState {
  categories: [];
}

interface SortByCategoryProps {
  API_URL: string;
  user: any;
  setShowSortByCategory: any;
  getPostByCategoryId: any;
  showSortByCategoryId: number;
}

export default class SortByCategory extends Component<
  SortByCategoryProps,
  SortByCategoryState
> {
  constructor(props: SortByCategoryProps) {
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
      <View style={styles.mainModalContainer}>
        <View style={styles.userDetailsModalContentContainer}>
          <View style={styles.relative}>
            <TouchableHighlight style={styles.buttonCloseModal}>
              <Button
                title="X"
                color="#000"
                onPress={() => this.props.setShowSortByCategory()}
              />
            </TouchableHighlight>

            <ScrollView style={styles.postDetailsContainer}>
              {categories.map((category: any, i: number) => {
                return (
                  <TouchableHighlight>
                    <Button
                      title={category.name}
                      onPress={() =>
                        this.props.getPostByCategoryId(category.id, true)
                      }
                      color={
                        category.id === this.props.showSortByCategoryId
                          ? "blue"
                          : "#000"
                      }
                    />
                  </TouchableHighlight>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
