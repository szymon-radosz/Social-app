import React, { Component } from "react";
import {
  TouchableHighlight,
  ImageBackground,
  Button,
  Text,
  View
} from "react-native";
import { btnFullWidth } from "./../../../assets/global/globalStyles";
import axios from "axios";
import auctionsBg from "./../../../assets/images/auctionsBgMin.jpg";
import SingleAuctionOnList from "./utils/SingleAuctionOnList";
import ProductDetails from "./utils/ProductDetails";
import AddNewProductBox from "./utils/AddNewProductBox";
import styles from "./style";
import { v4 as uuid } from "uuid";

interface AuctionsProps {
  API_URL: string;
  user: {
    lattitude: number;
    longitude: number;
    id: number;
  };
  openMessages: any;
  openAuctionId: number;
  openAuctionUserId: number;
}

interface AuctionsState {
  productList: any;
  displayProductDetails: boolean;
  displayNewProductBox: boolean;
  selectedProductId: number;
  selectedProductUserId: number;
}

export default class Auctions extends Component<AuctionsProps, AuctionsState> {
  constructor(props: AuctionsProps) {
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
    this.changeDisplayNewProductBox = this.changeDisplayNewProductBox.bind(
      this
    );
    this.setDisplayProductDetails = this.setDisplayProductDetails.bind(this);
  }

  changeDisplayNewProductBox = (): void => {
    //this.setState({ showMessageDate: !this.state.showMessageDate });
    //setState — it’s actually asynchronous.
    //React batches state changes for performance reasons, so
    //the state may not change immediately after setState is called.
    //That means you should not rely on the current state when calling
    //setState — since you can’t be sure what that state will be!
    //this.setState({ displayNewProductBox: !this.state.displayNewProductBox });

    this.setState(prevState => ({
      displayNewProductBox: !prevState.displayNewProductBox
    }));
    this.getProducts();
  };

  getProducts = (): void => {
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
        console.log(["loadProductBasedOnCoords", userLat, userLng]);
        if (response.data.status === "OK") {
          //console.log(["getAuctionProducts", response]);

          that.setState({
            productList: response.data.result
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  setDisplayProductDetails = (): void => {
    this.setState(prevState => ({
      displayProductDetails: !prevState.displayProductDetails
    }));
  };

  setSelectedProduct = (id: number, productUserId: number) => {
    //console.log(["setSelectedProduct", id, productUserId]);

    this.setState({
      selectedProductId: id,
      displayProductDetails: true,
      selectedProductUserId: productUserId
    });
  };

  componentDidMount = (): void => {
    //load all products based on user coords
    this.getProducts();

    console.log(["this.props.openAuctionId", this.props.openAuctionId]);
    if (
      this.props.openAuctionId &&
      this.props.openAuctionId !== 0 &&
      this.props.openAuctionUserId &&
      this.props.openAuctionUserId !== 0
    ) {
      this.setSelectedProduct(
        this.props.openAuctionId,
        this.props.openAuctionUserId
      );
    }
  };

  render() {
    const {
      displayProductDetails,
      selectedProductUserId,
      displayNewProductBox,
      productList,
      selectedProductId
    } = this.state;
    return (
      <View>
        {!displayProductDetails && !displayNewProductBox && (
          <ImageBackground source={auctionsBg} style={{ width: "100%" }}>
            <Text style={styles.pageTitle}>Sprzedawaj i{"\n"}kupuj</Text>
          </ImageBackground>
        )}
        {!displayProductDetails && !displayNewProductBox && (
          <View>
            <View style={{ padding: 10 }}>
              {productList &&
                productList.map((product: any, i: number) => {
                  console.log(["uuid", uuid()]);
                  return (
                    <SingleAuctionOnList
                      product={product}
                      key={uuid()}
                      API_URL={this.props.API_URL}
                      setSelectedProduct={this.setSelectedProduct}
                    />
                  );
                })}
            </View>

            <TouchableHighlight style={btnFullWidth}>
              <Button
                title="Dodaj produkt"
                onPress={() => this.changeDisplayNewProductBox()}
                color="#fff"
              />
            </TouchableHighlight>
          </View>
        )}

        {displayProductDetails && (
          <ProductDetails
            currentUser={this.props.user}
            API_URL={this.props.API_URL}
            openMessages={this.props.openMessages}
            productId={selectedProductId}
            productUserId={selectedProductUserId}
            setDisplayProductDetails={this.setDisplayProductDetails}
          />
        )}

        {displayNewProductBox && (
          <AddNewProductBox
            currentUser={this.props.user}
            API_URL={this.props.API_URL}
            changeDisplayNewProductBox={this.changeDisplayNewProductBox}
          />
        )}
      </View>
    );
  }
}
