import React, { Component } from "react";
import { Text, View, TouchableHighlight, ScrollView } from "react-native";
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
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              marginTop: 10,
              marginBottom: 20
            }}
          >
            Kategorie
          </Text>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            {categories.map((category: any, i: number) => {
              return (
                <TouchableHighlight
                  onPress={() =>
                    this.props.getPostByCategoryId(
                      category.id,
                      category.name,
                      true
                    )
                  }
                >
                  <View
                    style={{
                      borderWidth: 1,
                      width: "100%",
                      marginBottom: 10,
                      padding: 10,
                      borderRadius: 6
                    }}
                  >
                    <Text>{category.name}</Text>
                    <Text style={{ fontSize: 10 }}>
                      {category.posts.length} Posty
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
