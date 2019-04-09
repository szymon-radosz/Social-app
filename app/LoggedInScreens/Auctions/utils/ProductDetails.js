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
import ProductVoteBox from "./ProductVoteBox";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetails: [],
      showProductMessageBox: false,
      showVoteBox: false,
      foundVoteUserList: [],
      usersAreInTheSameConversation: false,
      productClosed: false
    };

    this.getProductDetails = this.getProductDetails.bind(this);
    this.checkIfUsersBelongToConversationProduct = this.checkIfUsersBelongToConversationProduct.bind(
      this
    );
    this.sendNewConversationProduct = this.sendNewConversationProduct.bind(
      this
    );
    this.changeShowProductMessageBox = this.changeShowProductMessageBox.bind(
      this
    );
    this.changeVoteBox = this.changeVoteBox.bind(this);
    this.searchUsersByName = this.searchUsersByName.bind(this);
  }

  searchUsersByName(name) {
    let API_URL = this.props.API_URL;

    if (name) {
      let that = this;

      axios
        .post(API_URL + "/api/loadUserByName", {
          name: name
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            console.log(["searchUsersByName", response.data]);

            that.setState({
              foundVoteUserList: []
            });

            that.setState({
              foundVoteUserList: response.data.result
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  changeShowProductMessageBox() {
    this.setState({ showProductMessageBox: !this.state.showProductMessageBox });
  }

  changeVoteBox() {
    this.setState({ showVoteBox: !this.state.showVoteBox });
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
        if (response.data.status === "OK") {
          console.log(["getProductDetails", response]);

          that.setState({
            productDetails: response.data.result
          });
        }
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
      .post(API_URL + "/api/checkIfUsersBelongsToProductConversation", {
        searchedUser: searchedUser,
        loggedInUser: loggedInUser,
        productId: productId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log([
            "checkIfUsersBelongToConversationProduct",
            response.data
          ]);

          that.setState({
            usersAreInTheSameConversation: response.data.result
          });
          /*that.setState({
            alertType: "success",
            alertMessage: "Poprawnie wysłano nową wiadomość"
          });*/
        }
      })
      .catch(function(error) {
        console.log(error);

        that.setState({
          alertType: "danger",
          alertMessage: "Nie udało się pobrać danych o uzytkowniku"
        });
      });
  }

  sendNewConversationProduct(message) {
    if (message) {
      let API_URL = this.props.API_URL;
      let senderId = this.props.currentUser.id;
      let receiverId = this.state.productDetails[0].user_id;
      let productId = this.state.productDetails[0].id;

      console.log([senderId, receiverId, productId, message]);

      let that = this;

      axios
        .post(API_URL + "/api/saveConversationProduct", {
          senderId: senderId,
          receiverId: receiverId,
          message: message,
          productId: productId
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            console.log(["saveConversationProduct", response.data.result]);

            that.setState({
              usersAreInTheSameConversation: true,
              showProductMessageBox: false,
              showVoteBox: false
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    //load all products based on user coords
    this.getProductDetails();
    this.checkIfUsersBelongToConversationProduct();
  }

  render() {
    return (
      <View>
        {this.state.showProductMessageBox && !this.state.showVoteBox ? (
          <ProductMessageBox
            currentUser={this.props.currentUser}
            product={this.state.productDetails[0]}
            changeShowProductMessageBox={this.changeShowProductMessageBox}
            sendNewConversationProduct={this.sendNewConversationProduct}
          />
        ) : !this.state.showProductMessageBox && this.state.showVoteBox ? (
          <ProductVoteBox
            currentUser={this.props.currentUser}
            product={this.state.productDetails[0]}
            API_URL={this.props.API_URL}
            changeVoteBox={this.changeVoteBox}
            searchUsersByName={this.searchUsersByName}
            foundVoteUserList={this.state.foundVoteUserList}
            getProductDetails={this.getProductDetails}
          />
        ) : this.state.productDetails[0] ? (
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
              this.state.productDetails[0].status != 1 ? (
                <TouchableHighlight>
                  <Button
                    title="Wyślij wiadomość"
                    color="#000"
                    onPress={this.changeShowProductMessageBox}
                  />
                </TouchableHighlight>
              ) : (
                <Text>Produkt sprzedany</Text>
              )
            ) : this.state.productDetails[0].user_id !=
                this.props.currentUser.id &&
              this.state.usersAreInTheSameConversation ? (
              this.state.productDetails[0].status == 1 ? (
                <Text>Produkt sprzedany, jesteście w konwersacji</Text>
              ) : (
                <Text>Jestescie juz w konwersacji dotyczacej produktu</Text>
              )
            ) : this.state.productDetails[0].status != 1 ? (
              <TouchableHighlight>
                <Button
                  title="Zamknij Sprzedaz"
                  onPress={() => this.changeVoteBox()}
                  color="#000"
                />
              </TouchableHighlight>
            ) : (
              <Text>Sprzedaz produktu zakonczona</Text>
            )}
          </View>
        ) : null}
      </View>
    );
  }
}
