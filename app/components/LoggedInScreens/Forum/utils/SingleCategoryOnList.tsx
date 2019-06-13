import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";

const SingleCategoryOnList = (props: {
  getPostByCategoryId: any;
  category: {
    id: number;
    name: string;
    posts: any;
  };
}): any => {
  return (
    <TouchableHighlight
      onPress={() =>
        props.getPostByCategoryId(props.category.id, props.category.name, true)
      }
    >
      <View style={styles.singleCategoryOnListContainer}>
        <Text>{props.category.name}</Text>
        <Text style={styles.singleCategoryOnListPostsLength}>
          {props.category.posts.length} Posty
        </Text>
      </View>
    </TouchableHighlight>
  );
};
export default SingleCategoryOnList;
