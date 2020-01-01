import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";
import lang from "./../../../assets/lang/Forum/utils/SingleCategoryOnList";

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
      underlayColor={"#fff"}
    >
      <View style={styles.singleCategoryOnListContainer}>
        <Text>{props.category.name}</Text>
        <Text style={styles.singleCategoryOnListPostsLength}>
          {props.category.posts.length} {lang.posts["en"]}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
export default SingleCategoryOnList;
