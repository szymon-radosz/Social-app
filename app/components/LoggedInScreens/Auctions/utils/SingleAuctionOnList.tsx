import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from "react-native";
import styles from "./../style";

const SingleAuctionOnList = (props: {
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
}): any => {
  return (
    <TouchableHighlight
      onPress={() => {
        props.setSelectedProduct(props.product.id, props.product.user_id);
      }}
    >
      <View style={styles.productListSingleProductContainer}>
        <TouchableOpacity
          onPress={() => {
            props.setSelectedProduct(props.product.id, props.product.user_id);
          }}
        >
          <Image
            style={styles.productListSingleProductImage}
            source={{
              uri: `${props.API_URL}productPhotos/${
                props.product.product_photos[0].path
              }`
            }}
          />
        </TouchableOpacity>
        <View style={styles.productListSingleProductTextContainer}>
          <Text style={styles.productOnListTextName}>{props.product.name}</Text>
          <Text style={styles.productOnListTextCategory}>
            Kategoria: {props.product.categoryName[0].name}
          </Text>
          <Text style={styles.productOnListTextPrice}>
            Cena: {props.product.price} zł
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default SingleAuctionOnList;
