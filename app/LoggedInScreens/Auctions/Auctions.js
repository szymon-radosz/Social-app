import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";
import axios from "axios";
import SingleAuctionOnList from "./utils/SingleAuctionOnList";
import ProductDetails from "./utils/ProductDetails";
import styles from "./style";

export default class Auctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      displayProductDetails: false,
      displayNewProductBox: false,
      selectedProductId: 0,
      selectedProductUserId: 0
    };

    this.getProducts = this.getProducts.bind(this);
    this.setSelectedProduct = this.setSelectedProduct.bind(this);
  }

  getProducts() {
    let API_URL = this.props.API_URL;
    let userLat = this.props.user.lattitude;
    let userLng = this.props.user.longitude;

    let that = this;

    axios
      .post(API_URL + "/api/loadProductBasedOnCoords", {
        lat: userLat,
        lng: userLng
      })
      .then(function(response) {
        console.log(["getAuctionProducts", response]);

        that.setState({
          productList: response.data.productList
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  setSelectedProduct(id, productUserId) {
    console.log(["setSelectedProduct", id, productUserId]);

    this.setState({
      selectedProductId: id,
      displayProductDetails: true,
      selectedProductUserId: productUserId
    });
  }

  componentDidMount() {
    //load all products based on user coords
    this.getProducts();
  }

  render() {
    return (
      <View>
        {!this.state.displayProductDetails && (
          <View>
            <Text style={styles.pageTitle}>
              Targ - sprzedawaj niepotrzebne rzeczy i kupuj od innych.
            </Text>
            <View style={styles.productList}>
              {this.state.productList &&
                this.state.productList.map((product, i) => {
                  return (
                    <SingleAuctionOnList
                      product={product}
                      API_URL={this.props.API_URL}
                      setSelectedProduct={this.setSelectedProduct}
                    />
                  );
                  //return <Text>{product.name}</Text>;
                })}
            </View>
          </View>
        )}

        {this.state.displayProductDetails && (
          <ProductDetails
            currentUser={this.props.user}
            API_URL={this.props.API_URL}
            productId={this.state.selectedProductId}
            productUserId={this.state.selectedProductUserId}
          />
        )}
      </View>
    );
  }
}
