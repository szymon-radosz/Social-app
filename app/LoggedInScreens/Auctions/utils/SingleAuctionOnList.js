import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from "react-native";
import styles from "./style";

const SingleAuctionOnList = props => {
  console.log(["SingleAuctionOnList", props]);
  return (
    <TouchableHighlight
      onPress={() => {
        props.setSelectedProduct(props.product.id, props.product.user_id);
      }}
    >
      <View style={styles.conversationBoxContainer}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: `${props.API_URL}productPhotos/${
                props.product.product_photos[0].path
              }`
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text>{props.product.name}</Text>
        <Text>{props.product.categoryName[0].name}</Text>
        <Text>{props.product.price}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default SingleAuctionOnList;
