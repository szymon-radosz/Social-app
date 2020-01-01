import React, { Component } from "react";
import { Text, View } from "react-native";
import SingleCategoryOnList from "./SingleCategoryOnList";
import styles from "../style";
import axios from "axios";
import lang from "./../../../assets/lang/Forum/utils/CategoriesList";

interface CategoriesListState {
  categories: [];
}

interface CategoriesListProps {
  API_URL: string;
  user: any;
  getPostByCategoryId: any;
}

export default class CategoriesList extends Component<
  CategoriesListProps,
  CategoriesListState
> {
  constructor(props: CategoriesListProps) {
    super(props);
    this.state = {
      categories: []
    };
  }

  getCategories = (): void => {
    try {
      let API_URL = this.props.API_URL;

      axios
        .get(API_URL + "/api/getPostsCategories")
        .then(response => {
          if (response.data.status === "OK") {
            this.setState({ categories: response.data.result });
          }
        })
        .catch(error => {
          //console.log(error);
        });
    } catch (e) {
      //console.log(e);
    }
  };

  componentDidMount = (): void => {
    this.getCategories();
  };

  render() {
    const { categories } = this.state;

    return (
      <View style={styles.relative}>
        <View style={styles.categoriesListContainer}>
          <Text style={styles.categoriesListTextHeader}>
            {lang.categories["en"]}
          </Text>
          <View style={styles.categoriesListContainer}>
            {categories.map((category: any, i: number) => {
              return (
                <SingleCategoryOnList
                  key={`SingleCategoryOnList-${i}`}
                  getPostByCategoryId={this.props.getPostByCategoryId}
                  category={category}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}
