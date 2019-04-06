import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  Button,
  Image,
  CheckBox,
  Picker,
  Text,
  View,
  TouchableHighlight,
  NativeModules
} from "react-native";
import axios from "axios";
import styles from "./style";
import Alert from "./../../../Alert/Alert";
import ImagePicker from "react-native-image-picker";
//import ImagePicker from "react-native-image-crop-picker";
import { v4 as uuid } from "uuid";

export default class AddNewProductBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      alertMessage: "",
      alertType: "",
      categories: [],
      selectedCategoryId: 0,
      price: 0,
      selectedProductState: 1,
      photo: null,
      photos: [],
      maleGender: true,
      femaleGender: false,
      newProduct: true,
      secondHandProduct: false
    };

    this.getCategories = this.getCategories.bind(this);
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
    this.setGender = this.setGender.bind(this);
    this.setCategoryId = this.setCategoryId.bind(this);
    this.setProductState = this.setProductState.bind(this);
    this.addNewProduct = this.addNewProduct.bind(this);
  }

  setGender(gender) {
    console.log(gender);
    if (gender === "girl") {
      this.setState({ maleGender: false, femaleGender: true });
    } else if (gender === "boy") {
      this.setState({ maleGender: true, femaleGender: false });
    }
  }

  setProductState(productState) {
    console.log(productState);
    if (productState === "new") {
      this.setState({ newProduct: true, secondHandProduct: false });
    } else if (productState === "secondHand") {
      this.setState({ newProduct: false, secondHandProduct: true });
    }
  }

  setCategoryId(id) {
    console.log(id);
    this.setState({ selectedCategoryId: id });
  }

  getCategories() {
    let API_URL = this.props.API_URL;

    let that = this;

    axios
      .get(API_URL + "/api/getCategories")
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["getCategories", response]);
          that.setState({
            categories: response.data.result
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChoosePhoto() {
    const options = {
      noData: true,
      maxWidth: 500,
      maxHeight: 500,
      quality: 1.0
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        //console.log(response.uri);
        this.setState({ photo: response.uri });

        this.setState(prevState => ({
          photos: [...prevState.photos, response.uri]
        }));

        console.log(this.state.photos);
      }
    });
  }

  addNewProduct() {
    let childGender;
    let productState;
    let API_URL = this.props.API_URL;
    let photosArray = "[" + '"' + this.state.photos.join('","') + '"' + "]";

    if (this.state.maleGender) {
      childGender = "boy";
    } else if (this.state.femaleGender) {
      childGender = "girl";
    }

    if (this.state.newProduct) {
      productState = 0;
    } else if (this.state.secondHandProduct) {
      productState = 1;
    }
    console.log([
      this.props.currentUser.id,
      this.state.name,
      this.state.selectedCategoryId,
      childGender,
      this.state.price,
      this.props.currentUser.lattitude,
      this.props.currentUser.longitude,
      0,
      productState,
      photosArray
    ]);

    let that = this;

    axios
      .post(API_URL + "/api/saveProduct", {
        userId: this.props.currentUser.id,
        name: this.state.name,
        categoryId: this.state.selectedCategoryId,
        childGender: childGender,
        price: this.state.price,
        lat: this.props.currentUser.lattitude,
        lng: this.props.currentUser.longitude,
        status: 0,
        state: productState,
        photos: photosArray
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["saveProduct", response]);

          that.props.changeDisplayNewProductBox();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log(["currentUser", this.props.currentUser]);
    this.getCategories();
  }
  render() {
    return (
      <View style={styles.mainModalContainer}>
        <View style={styles.userDetailsModalContentContainer}>
          <View style={styles.relative}>
            <TouchableHighlight style={styles.buttonCloseModal}>
              <Button
                title="X"
                color="#000"
                onPress={() => this.props.changeDisplayNewProductBox()}
              />
            </TouchableHighlight>
            <View style={styles.userDetailsHeader}>
              <Text style={styles.userMessageHeader}>Dodaj nowy produkt</Text>
            </View>

            <TextInput
              multiline={false}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              style={{ height: 20 }}
              placeholder="Nazwa"
              placeholderTextColor="#333"
              style={styles.userMessageTextArea}
            />

            <View>
              <Text>Kategoria</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {this.state.categories.map((category, i) => {
                  return (
                    <View style={{ flexDirection: "row" }} key={uuid()}>
                      <TouchableHighlight
                        onPress={() => this.setCategoryId(category.id)}
                        style={
                          this.state.selectedCategoryId == category.id
                            ? {
                                width: 30,
                                height: 30,
                                borderWidth: 1,
                                backgroundColor: "red"
                              }
                            : {
                                width: 30,
                                height: 30,
                                borderWidth: 1,
                                backgroundColor: "white"
                              }
                        }
                      >
                        <Button
                          title="v"
                          color="#000"
                          onPress={() => this.setCategoryId(category.id)}
                        />
                      </TouchableHighlight>

                      <Text
                        style={{ marginTop: 5 }}
                        onPress={() => this.setCategoryId(category.id)}
                      >
                        {category.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View>
              <Text>Płeć dziecka</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableHighlight
                    onPress={() => this.setGender("boy")}
                    style={
                      this.state.maleGender
                        ? {
                            width: 30,
                            height: 30,
                            borderWidth: 1,
                            backgroundColor: "red"
                          }
                        : {
                            width: 30,
                            height: 30,
                            borderWidth: 1,
                            backgroundColor: "white"
                          }
                    }
                  >
                    <Button
                      title="v"
                      color="#000"
                      onPress={() => this.setGender("boy")}
                    />
                  </TouchableHighlight>

                  <Text
                    style={{ marginTop: 5 }}
                    onPress={() => this.setGender("boy")}
                  >
                    Chłopiec
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableHighlight
                    onPress={() => this.setGender("girl")}
                    style={
                      this.state.femaleGender
                        ? {
                            width: 30,
                            height: 30,
                            borderWidth: 1,
                            backgroundColor: "red"
                          }
                        : {
                            width: 30,
                            height: 30,
                            borderWidth: 1,
                            backgroundColor: "white"
                          }
                    }
                  >
                    <Button
                      title="v"
                      color="#000"
                      onPress={() => this.setGender("girl")}
                    />
                  </TouchableHighlight>

                  <Text
                    onPress={() => this.setGender("girl")}
                    style={{ marginTop: 5 }}
                  >
                    Dziewczynka
                  </Text>
                </View>
              </View>
            </View>

            <TextInput
              multiline={false}
              onChangeText={price => this.setState({ price })}
              value={this.state.price}
              style={{ height: 20 }}
              placeholder="Cena w zł"
              placeholderTextColor="#333"
              style={styles.userMessageTextArea}
            />

            <View>
              <Text>Stan produktu</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableHighlight
                    onPress={() => this.setProductState("new")}
                    style={
                      this.state.newProduct
                        ? {
                            width: 30,
                            height: 30,
                            borderWidth: 1,
                            backgroundColor: "red"
                          }
                        : {
                            width: 30,
                            height: 30,
                            borderWidth: 1,
                            backgroundColor: "white"
                          }
                    }
                  >
                    <Button
                      title="v"
                      color="#000"
                      onPress={() => this.setProductState("new")}
                    />
                  </TouchableHighlight>

                  <Text
                    style={{ marginTop: 5 }}
                    onPress={() => this.setProductState("new")}
                  >
                    Nowe
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableHighlight
                    onPress={() => this.setProductState("secondHand")}
                    style={
                      this.state.secondHandProduct
                        ? {
                            width: 30,
                            height: 30,
                            borderWidth: 1,
                            backgroundColor: "red"
                          }
                        : {
                            width: 30,
                            height: 30,
                            borderWidth: 1,
                            backgroundColor: "white"
                          }
                    }
                  >
                    <Button
                      title="v"
                      color="#000"
                      onPress={() => this.setProductState("secondHand")}
                    />
                  </TouchableHighlight>

                  <Text
                    onPress={() => this.setProductState("secondHand")}
                    style={{ marginTop: 5 }}
                  >
                    Uzywane
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {this.state.photos &&
                this.state.photos.map((photo, i) => {
                  return (
                    <Image
                      key={uuid()}
                      style={{ width: 50, height: 50 }}
                      source={{ uri: this.state.photos[i] }}
                    />
                  );
                })}
            </View>

            {this.state.photos.length <= 3 && (
              <TouchableHighlight
                style={{ width: 50, height: 50, backgroundColor: "#000" }}
              >
                <Button
                  title="+"
                  color="#fff"
                  onPress={this.handleChoosePhoto}
                />
              </TouchableHighlight>
            )}

            <TouchableHighlight style={styles.userMessageBtn}>
              <Button
                title="Dodaj"
                onPress={() => {
                  this.addNewProduct();
                }}
                color="#fff"
              />
            </TouchableHighlight>
          </View>
        </View>
        {this.state.alertMessage != "" && (
          <Alert
            alertType={this.state.alertType}
            alertMessage={this.state.alertMessage}
          />
        )}
      </View>
    );
  }
}
