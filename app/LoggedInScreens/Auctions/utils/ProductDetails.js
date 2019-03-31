import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Image,
  View
} from "react-native";
import axios from "axios";
import styles from "./style";
import ProductMessageBox from "./ProductMessageBox";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: [],
      showProductMessageBox: false,
      usersAreInTheSameConversation: false
    };

    this.getProductDetails = this.getProductDetails.bind(this);
    this.changeShowProductMessageBox = this.changeShowProductMessageBox.bind(
      this
    );
    this.checkIfUsersBelongToConversationProduct = this.checkIfUsersBelongToConversationProduct.bind(
      this
    );
  }

  changeShowProductMessageBox() {
    this.setState({ showProductMessageBox: !this.state.showProductMessageBox });
  }

  getProductDetails() {
    let API_URL = this.props.API_URL;
    let productId = this.props.productId;

    let that = this;

    axios
      .post(API_URL + "/api/loadProductBasedOnId", {
        productId: productId
      })
      .then(function(response) {
        console.log(["getProductDetails", response]);

        that.setState({
          productDetails: response.data.productDetails
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  checkIfUsersBelongToConversationProduct() {
    //check if users are in the same conversation - start messaging
    let API_URL = this.props.API_URL;
    let searchedUser = this.props.productUserId;
    let loggedInUser = this.props.currentUser.id;
    let productId = this.props.productId;

    console.log([
      "propscheckIfUsersBelongToConversationProduct",
      this.props.productUserId,
      this.props.currentUser.id,
      this.props.productId
    ]);

    let that = this;

    axios
      .post(API_URL + "/api/checkIfUsersBelongsToConversation", {
        searchedUser: searchedUser,
        loggedInUser: loggedInUser,
        productId: productId
      })
      .then(function(response) {
        console.log(["checkIfUsersBelongToConversationProduct", response.data]);

        that.setState({
          usersAreInTheSameConversation:
            response.data.usersAreInTheSameConversation
        });
        /*that.setState({
          alertType: "success",
          alertMessage: "Poprawnie wysłano nową wiadomość"
        });*/
      })
      .catch(function(error) {
        console.log(error);

        that.setState({
          alertType: "danger",
          alertMessage: "Nie udało się pobrać danych o uzytkowniku"
        });
      });
  }

  componentDidMount() {
    //load all products based on user coords
    this.getProductDetails();
    this.checkIfUsersBelongToConversationProduct();
  }

  render() {
    return (
      <View>
        {this.state.productDetails[0] && !this.state.showProductMessageBox ? (
          <View>
            <TouchableOpacity>
              <Image
                style={styles.image}
                source={{
                  uri: `${this.props.API_URL}productPhotos/${
                    this.state.productDetails[0].product_photos[0].path
                  }`
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>
              {this.state.productDetails[0].name}
            </Text>
            <Text>
              Kategoria: {this.state.productDetails[0].categoryName[0].name}
            </Text>
            <Text>Cena: {this.state.productDetails[0].price} zł</Text>
            {this.state.productDetails[0].user_id !=
              this.props.currentUser.id &&
            !this.state.usersAreInTheSameConversation ? (
              <TouchableHighlight>
                <Button
                  title="Wyślij wiadomość"
                  color="#000"
                  onPress={this.changeShowProductMessageBox}
                  /*onPress={() =>
              this.props.sendMessage(
                this.props.senderId,
                this.props.receiverId,
                this.props.receiverName,
                this.props.receiverEmail,
                this.props.receiverPhotoPath,
                this.state.message,
                this.props.conversationId,
                0
              )
            }*/
                />
              </TouchableHighlight>
            ) : this.state.productDetails[0].user_id !=
                this.props.currentUser.id &&
              this.state.usersAreInTheSameConversation ? (
              <Text>Jestescie juz w konwersacji dotyczacej produktu</Text>
            ) : (
              <TouchableHighlight>
                <Button
                  title="Zamknij Sprzedaz"
                  color="#000"
                  /*onPress={() =>
          this.props.sendMessage(
            this.props.senderId,
            this.props.receiverId,
            this.props.receiverName,
            this.props.receiverEmail,
            this.props.receiverPhotoPath,
            this.state.message,
            this.props.conversationId,
            0
          )
        }*/
                />
              </TouchableHighlight>
            )}
          </View>
        ) : (
          <ProductMessageBox
            currentUser={this.props.currentUser}
            product={this.state.productDetails[0]}
            changeShowProductMessageBox={this.changeShowProductMessageBox}
          />
        )}
      </View>
    );
  }
}
