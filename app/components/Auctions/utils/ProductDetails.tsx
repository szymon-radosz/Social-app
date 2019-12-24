import React, { Component, Suspense } from "react";
import {
  Text,
  Dimensions,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import axios from "axios";
import styles from "./../style";
import Alert from "./../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
//@ts-ignore
import Lightbox from "react-native-lightbox";
//@ts-ignore
import Carousel from "react-native-looped-carousel";
import PageHeader from "./../../SharedComponents/PageHeader";
import { GlobalContext } from "./../../../Context/GlobalContext";
import ButtonComponent from "./../../Utils/ButtonComponent";
import { withNavigation } from "react-navigation";
import lang from "./../../../assets/lang/Auctions/utils/ProductDetails";

const loaderImage: any = require("./../../../assets/images/loader.gif");

const WINDOW_WIDTH = Dimensions.get("window").width;

const renderCarousel = (API_URL: string, imageArray: any): any => (
  <Carousel style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH }}>
    {imageArray.map((image: any, i: number) => {
      return (
        <Image
          style={{ flex: 1 }}
          resizeMode="contain"
          key={`renderCarousel-${i}`}
          source={{
            uri: `${image.path}`
          }}
        />
      );
    })}
  </Carousel>
);

interface ProductDetailsProps {
  API_URL: string;
  productId: number;
  productUserId: number;
  currentUser: {
    id: number;
  };
  navigation: any;
}

interface ProductDetailsState {
  productDetails: any;
  foundVoteUserList: any;
  usersAreInTheSameConversation: boolean;
  productClosed: boolean;
  productLocation: any;
}

class ProductDetails extends Component<
  ProductDetailsProps,
  ProductDetailsState
> {
  constructor(props: ProductDetailsProps) {
    super(props);
    this.state = {
      productDetails: [],
      foundVoteUserList: [],
      usersAreInTheSameConversation: false,
      productClosed: false,
      productLocation: []
    };
  }

  getProductDetails = (id: number) => {
    let API_URL = this.context.API_URL;
    let productId = id;

    this.context.setShowLoader(true);

    axios
      .post(API_URL + "/api/loadProductBasedOnId", {
        productId: productId
      })
      .then(async response => {
        if (response.data.status === "OK") {
          await this.setState({
            productDetails: response.data.result
          });

          await this.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        //console.log(error);
        await this.context.setShowLoader(false);
      });
  };

  checkIfUsersBelongToConversationProduct = () => {
    //check if users are in the same conversation - start messaging
    let API_URL = this.context.API_URL;
    let searchedUser = this.props.navigation.state.params.authorId;
    let loggedInUser = this.context.userData.id;
    let productId = this.props.navigation.state.params.productId;

    this.context.setShowLoader(true);

    axios
      .post(API_URL + "/api/checkIfUsersBelongsToProductConversation", {
        searchedUser: searchedUser,
        loggedInUser: loggedInUser,
        productId: productId
      })
      .then(async response => {
        if (response.data.status === "OK") {
          await this.setState({
            usersAreInTheSameConversation: response.data.result
          });

          await this.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        await this.context.setAlert(true, "danger", lang.userDataError["en"]);

        await this.context.setShowLoader(false);
      });
  };

  componentDidMount = () => {
    const { navigation } = this.props;

    /*console.log([
      "ProductDetails",
      navigation.state.params.productId,
      navigation.state.params.authorId
    ]);*/

    let productId = navigation.state.params.productId;

    this.getProductDetails(productId);
    this.checkIfUsersBelongToConversationProduct();

    /*this.focusListener = navigation.addListener("willFocus", () => {
      
    });*/
  };

  closeProduct = (productId: number) => {
    let API_URL = this.context.API_URL;

    //console.log(["closeProduct", productId]);

    axios
      .post(API_URL + "/api/closeProduct", {
        productId: productId
      })
      .then(response => {
        if (response.data.status === "OK") {
          //that.changeVoteBox();
          this.getProductDetails(productId);
        }
      })
      .catch(ferror => {
        //console.log(error);
      });
  };

  reactivateProduct = (productId: number) => {
    let API_URL = this.context.API_URL;

    //console.log(["reactivateProduct", productId]);

    axios
      .post(API_URL + "/api/reactivateProduct", {
        productId: productId
      })
      .then(response => {
        if (response.data.status === "OK") {
          //that.changeVoteBox();
          this.getProductDetails(productId);
        }
      })
      .catch(error => {
        //console.log(error);
      });
  };

  render() {
    const {
      productDetails,
      foundVoteUserList,
      usersAreInTheSameConversation
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
            data-test="Auctions"
          >
            {this.context.showLoader ? (
              <View style={styles.loaderContainer} data-test="loader">
                <Image
                  style={{ width: 100, height: 100 }}
                  source={loaderImage}
                />
              </View>
            ) : (
              <React.Fragment>
                <ScrollView>
                  {productDetails[0] ? (
                    <View>
                      <PageHeader
                        boldText={productDetails[0].name}
                        normalText={""}
                        closeMethod={() =>
                          this.props.navigation.navigate("Auctions", {})
                        }
                        closeMethodParameter={""}
                      />

                      <View style={styles.productDetailsHeader}>
                        <Lightbox
                          springConfig={{ overshootClamping: true }}
                          swipeToDismiss={false}
                          backgroundColor="rgba(0,0,0,0.7)"
                          renderContent={() =>
                            renderCarousel(
                              this.context.API_URL,
                              productDetails[0].product_photos
                            )
                          }
                          renderHeader={(close: any) => (
                            <TouchableOpacity onPress={close}>
                              <Text
                                style={{
                                  color: "white",
                                  padding: 8,
                                  textAlign: "center",
                                  margin: 10,
                                  alignSelf: "flex-end"
                                }}
                              >
                                {lang.closeOffer["en"]}
                              </Text>
                            </TouchableOpacity>
                          )}
                          underlayColor={"#fff"}
                        >
                          <Image
                            style={styles.productDetailsImage}
                            source={{
                              uri: `${productDetails[0].product_photos[0].path}`
                            }}
                          />
                        </Lightbox>

                        {productDetails[0] &&
                          productDetails[0].product_photos.length > 1 && (
                            <Text style={{ fontSize: 10 }}>
                              {lang.showGallery["en"]}
                            </Text>
                          )}

                        {productDetails[0] && productDetails[0].description ? (
                          <Text style={styles.productHeaderText}>
                            {productDetails[0].description}
                          </Text>
                        ) : null}
                      </View>
                      <View style={styles.productContent}>
                        {productDetails[0] &&
                          productDetails[0].categoryName[0].name && (
                            <Text style={styles.productContentText}>
                              <Text style={styles.bold}>
                                {lang.category["en"]}:
                              </Text>{" "}
                              {productDetails[0].categoryName[0].name}
                            </Text>
                          )}

                        {productDetails[0] && productDetails[0].state === 0 && (
                          <Text style={styles.productContentText}>
                            <Text style={styles.bold}>
                              {lang.condition["en"]}:
                            </Text>{" "}
                            {lang.new["en"]}
                          </Text>
                        )}

                        {productDetails[0] && productDetails[0].state === 1 && (
                          <Text style={styles.productContentText}>
                            <Text style={styles.bold}>
                              {lang.condition["en"]}:
                            </Text>{" "}
                            {lang.used["en"]}
                          </Text>
                        )}

                        {productDetails[0] && productDetails[0].users && (
                          <Text style={styles.productContentText}>
                            <Text style={styles.bold}>
                              {lang.addedBy["en"]}:{" "}
                            </Text>
                            {productDetails[0].users.name}
                          </Text>
                        )}

                        {productDetails[0] &&
                          productDetails[0].users.location_string && (
                            <Text style={styles.productContentText}>
                              <Text style={styles.bold}>
                                {lang.near["en"]}:{" "}
                              </Text>
                              {productDetails[0].users.location_string}
                            </Text>
                          )}
                      </View>
                      {/* user is not the author, they are not in the same conversation and product is not sold*/}
                      {productDetails[0].user_id != this.context.userData.id &&
                        !usersAreInTheSameConversation &&
                        productDetails[0].status != 1 && (
                          <ButtonComponent
                            pressButtonComponent={() =>
                              this.props.navigation.push("ProductMessageBox", {
                                receiverId: this.props.navigation.state.params
                                  .authorId,
                                productId: this.props.navigation.state.params
                                  .productId
                              })
                            }
                            buttonComponentText={lang.sendMessage["en"]}
                            fullWidth={true}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                          />
                        )}
                      {/* user is not the author and product is sold*/}
                      {productDetails[0].user_id != this.context.userData.id &&
                        productDetails[0].status == 1 && (
                          <View style={styles.productContent}>
                            <Text style={styles.productContentText}>
                              <Text style={styles.productClosed}>
                                {lang.offerClosed["en"]}
                              </Text>
                            </Text>
                          </View>
                        )}
                      <View style={styles.productBtnContainer}>
                        {/* user is not the author, they are in the same conversation and product is sold*/}
                        {productDetails[0].user_id !=
                          this.context.userData.id &&
                          usersAreInTheSameConversation &&
                          productDetails[0].status == 1 && (
                            <ButtonComponent
                              pressButtonComponent={() =>
                                this.props.navigation.navigate("Messages", {})
                              }
                              buttonComponentText={
                                lang.offerClosedConversationTogether["en"]
                              }
                              fullWidth={true}
                              underlayColor="#dd904d"
                              whiteBg={false}
                              showBackIcon={false}
                            />
                          )}
                        {/* user is not the author, they are in the same conversation and product is not sold*/}
                        {productDetails[0].user_id !=
                          this.context.userData.id &&
                          usersAreInTheSameConversation &&
                          productDetails[0].status != 1 && (
                            <ButtonComponent
                              pressButtonComponent={() =>
                                this.props.navigation.navigate("Messages", {})
                              }
                              buttonComponentText={
                                lang.conversationTogether["en"]
                              }
                              fullWidth={true}
                              underlayColor="#dd904d"
                              whiteBg={false}
                              showBackIcon={false}
                            />
                          )}
                        {/* user is the author, and product is not sold*/}
                        {productDetails[0].user_id ==
                          this.context.userData.id &&
                          productDetails[0].status != 1 && (
                            <ButtonComponent
                              pressButtonComponent={() => {
                                this.closeProduct(productDetails[0].id);
                              }}
                              buttonComponentText={lang.closeOffer["en"]}
                              fullWidth={true}
                              underlayColor="#dd904d"
                              whiteBg={false}
                              showBackIcon={false}
                            />
                          )}

                        {/* user is the author, and product is sold*/}
                        {productDetails[0].user_id ==
                          this.context.userData.id &&
                          productDetails[0].status != 0 && (
                            <ButtonComponent
                              pressButtonComponent={() => {
                                this.reactivateProduct(productDetails[0].id);
                              }}
                              buttonComponentText={lang.reactivateOffer["en"]}
                              fullWidth={true}
                              underlayColor="#dd904d"
                              whiteBg={false}
                              showBackIcon={false}
                            />
                          )}
                      </View>
                    </View>
                  ) : null}
                </ScrollView>

                <BottomPanel
                  data-test="BottomPanel"
                  navigation={this.props.navigation}
                />
              </React.Fragment>
            )}
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
ProductDetails.contextType = GlobalContext;
export default withNavigation(ProductDetails);
