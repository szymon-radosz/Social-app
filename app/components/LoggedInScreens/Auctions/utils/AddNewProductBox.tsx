import React, { Component } from "react";
import {
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  NativeModules,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import styles from "./../style";
import { v4 as uuid } from "uuid";
import PageHeader from "./../../SharedComponents/PageHeader";

const trash: any = require("./../../../../assets/images/trash.png");

var ImagePicker = NativeModules.ImageCropPicker;

interface AddNewProductBoxProps {
  API_URL: string;
  currentUser: {
    id: number;
    lattitude: number;
    longitude: number;
  };
  addNewProduct: any;
  changeDisplayNewProductBox: any;
}

interface AddNewProductBoxState {
  name: string;
  description: string;
  categories: string[];
  selectedCategoryId: number;
  price: string;
  selectedProductState: number;
  photo: any;
  photos: any;
  maleGender: boolean;
  femaleGender: boolean;
  newProduct: boolean;
  secondHandProduct: boolean;
}
export default class AddNewProductBox extends Component<
  AddNewProductBoxProps,
  AddNewProductBoxState
> {
  constructor(props: AddNewProductBoxProps) {
    super(props);
    this.state = {
      name: "",
      description: "",
      categories: [],
      selectedCategoryId: 0,
      price: "",
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
    this.clearPhotos = this.clearPhotos.bind(this);
  }

  clearPhotos = (): void => {
    this.setState({ photos: [] });
  };

  setGender = (gender: string): void => {
    if (gender === "girl") {
      this.setState({ maleGender: false, femaleGender: true });
    } else if (gender === "boy") {
      this.setState({ maleGender: true, femaleGender: false });
    }
  };

  setProductState = (productState: string): void => {
    if (productState === "new") {
      this.setState({ newProduct: true, secondHandProduct: false });
    } else if (productState === "secondHand") {
      this.setState({ newProduct: false, secondHandProduct: true });
    }
  };

  setCategoryId = (id: number): void => {
    this.setState({ selectedCategoryId: id });
  };

  getCategories = (): void => {
    let API_URL = this.props.API_URL;

    let that = this;

    axios
      .get(API_URL + "/api/getCategories")
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({
            categories: response.data.result
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleChoosePhoto = (): void => {
    ImagePicker.openPicker({
      height: 300,
      cropping: true,
      multiple: true,
      forceJpg: true,
      maxFiles: 4,
      compressImageMaxHeight: 300,
      cropperCircleOverlay: false,
      freeStyleCropEnabled: true,
      compressImageQuality: 1,
      compressVideoPreset: "MediumQuality",
      includeBase64: true
    })
      .then((images: any) => {
        images.map((photo: any, i: number) => {
          this.setState(prevState => ({
            photos: [...prevState.photos, photo.path]
          }));
        });
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  componentDidMount = (): void => {
    this.getCategories();
  };
  render() {
    const {
      name,
      description,
      categories,
      selectedCategoryId,
      maleGender,
      femaleGender,
      price,
      newProduct,
      secondHandProduct,
      photos
    } = this.state;
    return (
      <ScrollView style={styles.relative}>
        <PageHeader
          boldText={"Dodaj nowy produkt"}
          normalText={""}
          closeMethod={this.props.changeDisplayNewProductBox}
          closeMethodParameter={""}
        />
        <View style={styles.addNewProductInputContainer}>
          <TextInput
            multiline={false}
            onChangeText={name => this.setState({ name })}
            value={name}
            placeholder="Podaj nazwę produktu"
            placeholderTextColor="#333"
            maxLength={50}
            style={styles.userMessageTextArea}
          />
        </View>

        <View style={styles.addNewProductDescInput}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            onChangeText={description => this.setState({ description })}
            value={description}
            placeholder="Podaj opis produktu"
            placeholderTextColor="#333"
            maxLength={150}
            style={styles.sellerVoteBoxTextArea}
          />
        </View>

        <View style={styles.addNewProductOptionContainer}>
          <Text style={styles.addNewProductOptionHeaderText}>Kategoria</Text>
          <View style={styles.addNewProductOptionWrapper}>
            {categories.map((category: any, i: number) => {
              return (
                <View style={{ flexDirection: "row" }} key={uuid()}>
                  <TouchableHighlight
                    onPress={() => this.setCategoryId(category.id)}
                    style={
                      selectedCategoryId == category.id
                        ? {
                            width: 20,
                            height: 20,
                            borderWidth: 1,
                            backgroundColor: "#f7b67e",
                            borderColor: "#f7b67e",
                            borderRadius: 20,
                            marginRight: 5
                          }
                        : {
                            width: 20,
                            height: 20,
                            borderWidth: 1,
                            backgroundColor: "white",
                            borderRadius: 20,
                            marginRight: 5
                          }
                    }
                  >
                    <Button
                      title=""
                      color="#333"
                      onPress={() => this.setCategoryId(category.id)}
                    />
                  </TouchableHighlight>

                  <Text
                    style={styles.addNewProductOptionText}
                    onPress={() => this.setCategoryId(category.id)}
                  >
                    {category.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.addNewProductOptionContainer}>
          <Text style={styles.addNewProductOptionHeaderText}>Płeć dziecka</Text>
          <View style={styles.addNewProductOptionWrapper}>
            <View style={{ flexDirection: "row" }}>
              <TouchableHighlight
                onPress={() => this.setGender("boy")}
                style={
                  maleGender
                    ? {
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        backgroundColor: "#f7b67e",
                        borderColor: "#f7b67e",
                        borderRadius: 20,
                        marginRight: 5
                      }
                    : {
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        backgroundColor: "white",
                        borderRadius: 20,
                        marginRight: 5
                      }
                }
              >
                <Button
                  title=""
                  color="#333"
                  onPress={() => this.setGender("boy")}
                />
              </TouchableHighlight>

              <Text
                style={styles.addNewProductOptionText}
                onPress={() => this.setGender("boy")}
              >
                Chłopiec
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableHighlight
                onPress={() => this.setGender("girl")}
                style={
                  femaleGender
                    ? {
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        backgroundColor: "#f7b67e",
                        borderColor: "#f7b67e",
                        borderRadius: 20,
                        marginRight: 5
                      }
                    : {
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        backgroundColor: "white",
                        borderRadius: 20,
                        marginRight: 5
                      }
                }
              >
                <Button
                  title=""
                  color="#333"
                  onPress={() => this.setGender("girl")}
                />
              </TouchableHighlight>

              <Text
                onPress={() => this.setGender("girl")}
                style={styles.addNewProductOptionText}
              >
                Dziewczynka
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
          <Text style={{ paddingBottom: 5, fontWeight: "600" }}>Cena</Text>
          <TextInput
            multiline={false}
            maxLength={4}
            onChangeText={price => this.setState({ price })}
            value={price}
            placeholder="Cena w zł"
            placeholderTextColor="#333"
            style={styles.userMessageTextArea}
          />
        </View>

        <View style={styles.addNewProductOptionContainer}>
          <Text style={styles.addNewProductOptionHeaderText}>
            Stan produktu
          </Text>
          <View style={styles.addNewProductOptionWrapper}>
            <View style={{ flexDirection: "row" }}>
              <TouchableHighlight
                onPress={() => this.setProductState("new")}
                style={
                  newProduct
                    ? {
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        backgroundColor: "#f7b67e",
                        borderColor: "#f7b67e",
                        borderRadius: 20,
                        marginRight: 5
                      }
                    : {
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        backgroundColor: "white",
                        borderRadius: 20,
                        marginRight: 5
                      }
                }
              >
                <Button
                  title=""
                  color="#333"
                  onPress={() => this.setProductState("new")}
                />
              </TouchableHighlight>

              <Text
                style={styles.addNewProductOptionText}
                onPress={() => this.setProductState("new")}
              >
                Nowe
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableHighlight
                onPress={() => this.setProductState("secondHand")}
                style={
                  secondHandProduct
                    ? {
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        backgroundColor: "#f7b67e",
                        borderColor: "#f7b67e",
                        borderRadius: 20,
                        marginRight: 5
                      }
                    : {
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        backgroundColor: "white",
                        borderRadius: 20,
                        marginRight: 5
                      }
                }
              >
                <Button
                  title=""
                  color="#333"
                  onPress={() => this.setProductState("secondHand")}
                />
              </TouchableHighlight>

              <Text
                onPress={() => this.setProductState("secondHand")}
                style={styles.addNewProductOptionText}
              >
                Uzywane
              </Text>
            </View>
          </View>
        </View>

        {photos.length === 0 && (
          <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
            <Text style={{ paddingBottom: 5, fontWeight: "600" }}>
              Dodaj zdjęcia
            </Text>
            <TouchableHighlight
              style={{
                width: 50,
                height: 50,
                paddingTop: 5,
                borderRadius: 6,
                backgroundColor: "#f7b67e"
              }}
            >
              <Button title="+" color="#333" onPress={this.handleChoosePhoto} />
            </TouchableHighlight>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingLeft: 10,
            paddingRight: 10,
            marginBottom: 10
          }}
        >
          {photos &&
            photos.map((photo: any, i: number) => {
              return (
                <Image
                  key={uuid()}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 6,
                    marginRight: 10
                  }}
                  source={{ uri: photo }}
                />
              );
            })}

          {photos && photos.length > 0 && (
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                paddingTop: 5,
                borderRadius: 6,
                backgroundColor: "#f7b67e"
              }}
            >
              <Button title="X" color="#333" onPress={this.clearPhotos} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableHighlight style={styles.productDetailsBtn}>
          <Button
            title="Dodaj"
            onPress={() => {
              this.props.addNewProduct(
                photos,
                maleGender,
                femaleGender,
                newProduct,
                secondHandProduct,
                this.props.currentUser,
                name,
                description,
                selectedCategoryId,
                price
              );
            }}
            color="#fff"
          />
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
