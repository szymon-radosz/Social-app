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
import styles from "./../style";

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
        <View style={styles.productListSingleProductContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.setSelectedProduct(
                this.props.product.id,
                this.props.product.user_id
              );
            }}
          >
            <Image
              style={styles.productListSingleProductImage}
              source={{
                uri: `${this.props.API_URL}productPhotos/${
                  this.props.product.product_photos[0].path
                }`
              }}
            />
          </TouchableOpacity>
          <View style={styles.productListSingleProductTextContainer}>
            <Text style={styles.productOnListTextName}>
              {this.props.product.name}
            </Text>
            <Text style={styles.productOnListTextCategory}>
              Kategoria: {this.props.product.categoryName[0].name}
            </Text>
            <Text style={styles.productOnListTextPrice}>
              Cena: {this.props.product.price} zł
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
