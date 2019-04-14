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

interface SingleAuctionOnListProps {
  setSelectedProduct: any;
  product: {
    id: number;
    user_id: number;
    product_photos: any;
    name: string;
    categoryName: any;
    price: number;
  };
  API_URL: string;
}

export default class SingleAuctionOnList extends Component<
  SingleAuctionOnListProps
> {
  render() {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.setSelectedProduct(
            this.props.product.id,
            this.props.product.user_id
          );
        }}
      >
        <View style={styles.conversationBoxContainer}>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={{
                uri: `${this.props.API_URL}productPhotos/${
                  this.props.product.product_photos[0].path
                }`
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text>{this.props.product.name}</Text>
          <Text>{this.props.product.categoryName[0].name}</Text>
          <Text>{this.props.product.price}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
