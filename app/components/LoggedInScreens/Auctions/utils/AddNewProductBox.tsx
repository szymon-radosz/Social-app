import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  NativeModules,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import axios from "axios";
import Alert from "./../../../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../../Utils/ButtonComponent";
import InputComponent from "./../../../Utils/InputComponent";
import TextAreaComponent from "./../../../Utils/TextAreaComponent";
import { GlobalContext } from "./../../../Context/GlobalContext";

const trash: any = require("./../../../../assets/images/trash.png");
const upload: any = require("./../../../../assets/images/upload.png");

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
  navigation: any;
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
  showPhotoArr: any;
  maleGender: boolean;
  femaleGender: boolean;
  newProduct: boolean;
  secondHandProduct: boolean;
}
class AddNewProductBox extends Component<
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
      showPhotoArr: [],
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

  addNewProduct = async (
    photos: any,
    maleGender: boolean,
    femaleGender: boolean,
    newProduct: boolean,
    secondHandProduct: boolean,
    currentUser: any,
    name: string,
    description: string,
    selectedCategoryId: any,
    price: string
  ) => {
    console.log([
      photos,
      maleGender,
      femaleGender,
      newProduct,
      secondHandProduct,
      currentUser,
      name,
      description,
      selectedCategoryId,
      price
    ]);
    let childGender;
    let productState;
    let API_URL = this.context.API_URL;

    let photosArray = "[" + '"' + photos.join('","') + '"' + "]";

    if (maleGender) {
      childGender = "boy";
    } else if (femaleGender) {
      childGender = "girl";
    }

    if (newProduct) {
      productState = 0;
    } else if (secondHandProduct) {
      productState = 1;
    }

    if (
      !photos ||
      photos.length === 0 ||
      !currentUser ||
      !name ||
      !description ||
      !selectedCategoryId ||
      !price
    ) {
      /*console.log([
        "add product",
        photos,
        maleGender,
        femaleGender,
        newProduct,
        secondHandProduct,
        currentUser,
        name,
        description,
        selectedCategoryId,
        price
      ]);*/
      this.context.setAlert(
        true,
        "danger",
        "Upewnij się, że wprowadziłaś wszystkie dane i dodałaś co najmniej 1 zdjęcie."
      );
    } else if (
      currentUser.id &&
      name &&
      description &&
      selectedCategoryId &&
      price &&
      currentUser.lattitude &&
      currentUser.longitude &&
      photosArray
    ) {
      let that = this;

      console.log(["photosArray", photosArray]);

      that.context.setShowLoader(true);

      let json = await axios
        .post(API_URL + "/api/saveProduct", {
          userId: currentUser.id,
          name: name,
          description: description,
          categoryId: selectedCategoryId,
          childGender: childGender,
          price: price,
          lat: currentUser.lattitude,
          lng: currentUser.longitude,
          status: 0,
          state: productState,
          photos: photosArray
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            console.log(["Add new product success", response.data]);
            that.context.setAlert(
              true,
              "success",
              "Dziękujemy za dodanie nowego produktu."
            );

            that.props.navigation.navigate("ProductDetails", {
              productId: response.data.result.product.id,
              authorId: response.data.result.product.user_id
            });

            that.context.setShowLoader(false);
          }
        })
        .catch(function(error) {
          console.log(error);

          that.context.setAlert(
            true,
            "danger",
            "Problem z dodaniem nowego produktu."
          );

          that.props.navigation.navigate("Auctions", {});

          that.context.setShowLoader(false);
        });

      return json;
    }
  };

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
    let API_URL = this.context.API_URL;

    let that = this;

    axios
      .get(API_URL + "/api/getCategories")
      .then(function(response) {
        console.log(["getCategories", response]);
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
            photos: [...prevState.photos, photo.data],
            showPhotoArr: [...prevState.showPhotoArr, photo.path]
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
      photos,
      showPhotoArr
    } = this.state;
    return (
      <React.Fragment>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff"
          }}
        >
          {this.context.showAlert && (
            <Alert
              alertType={this.context.alertType}
              alertMessage={this.context.alertMessage}
              closeAlert={this.context.closeAlert}
            />
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
            data-test="FindUsers"
          >
            <View style={styles.relative}>
              <PageHeader
                boldText={"Dodaj nowy produkt"}
                normalText={""}
                closeMethod={() => this.props.navigation.goBack(null)}
                closeMethodParameter={""}
              />
              <View style={styles.addNewProductInputContainer}>
                <InputComponent
                  placeholder="Podaj nazwę produktu"
                  inputOnChange={(name: string) => this.setState({ name })}
                  value={name}
                  secureTextEntry={false}
                  maxLength={100}
                />
              </View>

              <View style={styles.addNewProductDescInput}>
                <TextAreaComponent
                  placeholder="Podaj opis produktu, w przypadku odzieży podaj wymiary itp."
                  inputOnChange={(description: string) =>
                    this.setState({ description })
                  }
                  value={description}
                  maxLength={1000}
                  multiline={true}
                  numberOfLines={20}
                />
              </View>

              <View style={styles.addNewProductOptionContainer}>
                <Text style={styles.addNewProductOptionHeaderText}>
                  Kategoria
                </Text>
                <View style={styles.addNewProductOptionWrapper}>
                  {categories.map((category: any, i: number) => {
                    return (
                      <View
                        style={{ flexDirection: "row" }}
                        key={`addNewProductOption-${i}`}
                      >
                        <TouchableOpacity
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
                                  marginRight: 5,
                                  marginBottom: 10
                                }
                              : {
                                  width: 20,
                                  height: 20,
                                  borderWidth: 1,
                                  backgroundColor: "white",
                                  borderRadius: 20,
                                  marginRight: 5,
                                  marginBottom: 10
                                }
                          }
                        />

                        <Text
                          style={
                            selectedCategoryId == category.id
                              ? styles.addNewProductOptionTextActive
                              : styles.addNewProductOptionText
                          }
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
                <Text style={styles.addNewProductOptionHeaderText}>
                  Płeć dziecka
                </Text>
                <View style={styles.addNewProductOptionWrapper}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
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
                              marginRight: 5,
                              marginBottom: 10
                            }
                          : {
                              width: 20,
                              height: 20,
                              borderWidth: 1,
                              backgroundColor: "white",
                              borderRadius: 20,
                              marginRight: 5,
                              marginBottom: 10
                            }
                      }
                    />

                    <Text
                      style={
                        maleGender
                          ? styles.addNewProductOptionTextActive
                          : styles.addNewProductOptionText
                      }
                      onPress={() => this.setGender("boy")}
                    >
                      Chłopiec
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
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
                              marginRight: 5,
                              marginBottom: 10
                            }
                          : {
                              width: 20,
                              height: 20,
                              borderWidth: 1,
                              backgroundColor: "white",
                              borderRadius: 20,
                              marginRight: 5,
                              marginBottom: 10
                            }
                      }
                    />

                    <Text
                      onPress={() => this.setGender("girl")}
                      style={
                        femaleGender
                          ? styles.addNewProductOptionTextActive
                          : styles.addNewProductOptionText
                      }
                    >
                      Dziewczynka
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}
              >
                <Text style={{ fontWeight: "600" }}>Cena (zł)</Text>

                <InputComponent
                  placeholder="Cena w zł"
                  inputOnChange={(price: string) => this.setState({ price })}
                  value={price}
                  secureTextEntry={false}
                  maxLength={5}
                />
              </View>

              <View style={styles.addNewProductOptionContainer}>
                <Text style={styles.addNewProductOptionHeaderText}>
                  Stan produktu
                </Text>
                <View style={styles.addNewProductOptionWrapper}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
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
                              marginRight: 5,
                              marginBottom: 10
                            }
                          : {
                              width: 20,
                              height: 20,
                              borderWidth: 1,
                              backgroundColor: "white",
                              borderRadius: 20,
                              marginRight: 5,
                              marginBottom: 10
                            }
                      }
                    />

                    <Text
                      style={
                        newProduct
                          ? styles.addNewProductOptionTextActive
                          : styles.addNewProductOptionText
                      }
                      onPress={() => this.setProductState("new")}
                    >
                      Nowe
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
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
                              marginRight: 5,
                              marginBottom: 10
                            }
                          : {
                              width: 20,
                              height: 20,
                              borderWidth: 1,
                              backgroundColor: "white",
                              borderRadius: 20,
                              marginRight: 5,
                              marginBottom: 10
                            }
                      }
                    />

                    <Text
                      onPress={() => this.setProductState("secondHand")}
                      style={
                        secondHandProduct
                          ? styles.addNewProductOptionTextActive
                          : styles.addNewProductOptionText
                      }
                    >
                      Używane
                    </Text>
                  </View>
                </View>
              </View>

              {photos && photos.length === 0 && (
                <View
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginBottom: 10
                  }}
                >
                  <Text style={{ paddingBottom: 5, fontWeight: "600" }}>
                    Dodaj zdjęcia
                  </Text>
                  <TouchableHighlight
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 6,
                      backgroundColor: "#f7b67e",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    underlayColor={"#dd904d"}
                    onPress={this.handleChoosePhoto}
                  >
                    <Image source={upload} style={{ width: 20, height: 20 }} />
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
                {showPhotoArr &&
                  showPhotoArr.map((photo: any, i: number) => {
                    return (
                      <Image
                        key={`AddNewProductBox-${i}`}
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

                {showPhotoArr && showPhotoArr.length > 0 && (
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 6,
                      backgroundColor: "#f7b67e",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={this.clearPhotos}
                  >
                    <Image source={trash} style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                )}
              </View>

              <ButtonComponent
                pressButtonComponent={() => {
                  this.addNewProduct(
                    photos,
                    maleGender,
                    femaleGender,
                    newProduct,
                    secondHandProduct,
                    this.context.userData,
                    name,
                    description,
                    selectedCategoryId,
                    price
                  );
                }}
                buttonComponentText="Dodaj Produkt"
                fullWidth={true}
                underlayColor="#dd904d"
                whiteBg={false}
                showBackIcon={false}
              />

              <View style={{ marginBottom: 20 }} />
            </View>

            <BottomPanel data-test="BottomPanel" />
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
AddNewProductBox.contextType = GlobalContext;
export default AddNewProductBox;
