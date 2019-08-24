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

const loaderImage: any = require("./../../../assets/images/loader.gif");

const SellerVoteBox = React.lazy(() => import("./SellerVoteBox"));
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
  showProductMessageBox: boolean;
  showVoteBox: boolean;
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
      showProductMessageBox: false,
      showVoteBox: false,
      foundVoteUserList: [],
      usersAreInTheSameConversation: false,
      productClosed: false,
      productLocation: []
    };

    this.getProductDetails = this.getProductDetails.bind(this);
    this.checkIfUsersBelongToConversationProduct = this.checkIfUsersBelongToConversationProduct.bind(
      this
    );

    this.changeVoteBox = this.changeVoteBox.bind(this);
    this.searchUsersByEmail = this.searchUsersByEmail.bind(this);
    this.sendVote = this.sendVote.bind(this);
    this.closeProduct = this.closeProduct.bind(this);
  }

  searchUsersByEmail = (email: string) => {
    let API_URL = this.context.API_URL;

    if (email) {
      let that = this;

      axios
        .post(API_URL + "/api/loadUserByEmail", {
          email: email
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            that.setState({
              foundVoteUserList: []
            });

            that.setState({
              foundVoteUserList: response.data.result
            });
          }
        })
        .catch(function(error) {
          //console.log(error);
        });
    }
  };

  changeVoteBox = () => {
    this.setState({ showVoteBox: !this.state.showVoteBox });
  };

  getProductDetails = (id: number) => {
    let API_URL = this.context.API_URL;
    let productId = id;

    let that = this;

    this.context.setShowLoader(true);

    axios
      .post(API_URL + "/api/loadProductBasedOnId", {
        productId: productId
      })
      .then(async response => {
        if (response.data.status === "OK") {
          await that.setState({
            productDetails: response.data.result
          });

          await that.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        //console.log(error);
        await that.context.setShowLoader(false);
      });
  };

  checkIfUsersBelongToConversationProduct = () => {
    //check if users are in the same conversation - start messaging
    let API_URL = this.context.API_URL;
    let searchedUser = this.props.navigation.state.params.authorId;
    let loggedInUser = this.context.userData.id;
    let productId = this.props.navigation.state.params.productId;

    let that = this;

    this.context.setShowLoader(true);

    axios
      .post(API_URL + "/api/checkIfUsersBelongsToProductConversation", {
        searchedUser: searchedUser,
        loggedInUser: loggedInUser,
        productId: productId
      })
      .then(async response => {
        if (response.data.status === "OK") {
          await that.setState({
            usersAreInTheSameConversation: response.data.result
          });

          await that.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        await that.context.setAlert(
          true,
          "danger",
          "Nie udało się pobrać danych o użytkowniku."
        );

        await that.context.setShowLoader(false);
      });
  };

  componentDidMount = () => {
    const { navigation } = this.props;

    console.log([
      "ProductDetails",
      navigation.state.params.productId,
      navigation.state.params.authorId
    ]);

    let productId = navigation.state.params.productId;

    this.getProductDetails(productId);
    this.checkIfUsersBelongToConversationProduct();

    /*this.focusListener = navigation.addListener("willFocus", () => {
      
    });*/
  };

  /*componentWillUnmount() {
    console.log(["ProductDetails will unmount "]);

    // Remove the event listener
    this.focusListener.remove();
  }*/

  sendVote = (
    selectedUserData: any,
    userVote: number,
    voteComment: string,
    product: any
  ) => {
    let API_URL = this.context.API_URL;
    let userId = selectedUserData.id;
    let vote = userVote;
    let message = voteComment;
    let authorId = this.context.userData.id;
    let productId = product.id;

    let that = this;

    axios
      .post(API_URL + "/api/saveVote", {
        userId: userId,
        vote: vote,
        message: message,
        authorId: authorId
      })
      .then(function(response) {
        //console.log(response);
        if (response.data.status === "OK") {
          /*console.log([
            "sendVoteAPI",
            API_URL,
            userId,
            vote,
            message,
            authorId,
            productId
          ]);*/
          that.closeProduct(productId);

          that.context.setAlert(
            true,
            "success",
            "Dziękujemy za dodanie opinii."
          );
        }
      })
      .catch(function(error) {
        //console.log(error);
        that.context.setAlert(
          true,
          "danger",
          "Problem z dodaniem opinii. Możesz dodać tylko jedną opinię dla poszczególnej użytkowniczki."
        );
      });

    //console.log("next");
  };

  closeProduct = (productId: number) => {
    let API_URL = this.context.API_URL;

    let that = this;

    //console.log(["closeProduct", productId]);

    axios
      .post(API_URL + "/api/closeProduct", {
        productId: productId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          //that.changeVoteBox();
          that.getProductDetails(productId);
        }
      })
      .catch(function(error) {
        //console.log(error);
      });
  };

  reactivateProduct = (productId: number) => {
    let API_URL = this.context.API_URL;

    let that = this;

    //console.log(["reactivateProduct", productId]);

    axios
      .post(API_URL + "/api/reactivateProduct", {
        productId: productId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          //that.changeVoteBox();
          that.getProductDetails(productId);
        }
      })
      .catch(function(error) {
        //console.log(error);
      });
  };

  render() {
    const {
      showProductMessageBox,
      showVoteBox,
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
                  {!showProductMessageBox && showVoteBox ? (
                    <SellerVoteBox
                      currentUser={this.context.userData}
                      product={productDetails[0]}
                      API_URL={this.context.API_URL}
                      changeVoteBox={this.changeVoteBox}
                      searchUsersByEmail={this.searchUsersByEmail}
                      foundVoteUserList={foundVoteUserList}
                      getProductDetails={this.getProductDetails}
                      sendVote={this.sendVote}
                    />
                  ) : productDetails[0] ? (
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
                                Zamknij
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
                              Kliknij na zdjęcie, aby zobaczyć galerię.
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
                              <Text style={styles.bold}>Kategoria:</Text>{" "}
                              {productDetails[0].categoryName[0].name}
                            </Text>
                          )}

                        {productDetails[0] &&
                          productDetails[0].child_gender === "girl" && (
                            <Text style={styles.productContentText}>
                              <Text style={styles.bold}>Płeć dziecka:</Text>{" "}
                              Dziewczynka
                            </Text>
                          )}

                        {productDetails[0] &&
                          productDetails[0].child_gender === "boy" && (
                            <Text style={styles.productContentText}>
                              <Text style={styles.bold}>Płeć dziecka:</Text>{" "}
                              Chłopiec
                            </Text>
                          )}

                        {productDetails[0] && productDetails[0].state === 0 && (
                          <Text style={styles.productContentText}>
                            <Text style={styles.bold}>Stan produktu:</Text> Nowe
                          </Text>
                        )}

                        {productDetails[0] && productDetails[0].state === 1 && (
                          <Text style={styles.productContentText}>
                            <Text style={styles.bold}>Stan produktu:</Text>{" "}
                            Używane
                          </Text>
                        )}

                        {productDetails[0] && productDetails[0].users && (
                          <Text style={styles.productContentText}>
                            <Text style={styles.bold}>Dodane przez: </Text>
                            {productDetails[0].users.name}
                          </Text>
                        )}

                        {productDetails[0] &&
                          productDetails[0].users.location_string && (
                            <Text style={styles.productContentText}>
                              <Text style={styles.bold}>W poblizu: </Text>
                              {productDetails[0].users.location_string}
                            </Text>
                          )}

                        {productDetails[0] && productDetails[0].price && (
                          <Text style={styles.productContentText}>
                            <Text style={styles.bold}>Cena: </Text>
                            {productDetails[0].price} zł
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
                            buttonComponentText="Wyślij wiadomość"
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
                                Sprzedaż produktu zakończona
                              </Text>
                            </Text>
                          </View>
                        )}
                      {/* user is not the author, they are in the same conversation and product is sold*/}
                      {productDetails[0].user_id != this.context.userData.id &&
                        usersAreInTheSameConversation &&
                        productDetails[0].status == 1 && (
                          <ButtonComponent
                            pressButtonComponent={() =>
                              this.props.navigation.navigate("Messages", {})
                            }
                            buttonComponentText="Produkt sprzedany, jesteście w konwersacji"
                            fullWidth={true}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                          />
                        )}
                      {/* user is not the author, they are in the same conversation and product is not sold*/}
                      {productDetails[0].user_id != this.context.userData.id &&
                        usersAreInTheSameConversation &&
                        productDetails[0].status != 1 && (
                          <ButtonComponent
                            pressButtonComponent={() =>
                              this.props.navigation.navigate("Messages", {})
                            }
                            buttonComponentText="Jestescie już w konwersacji"
                            fullWidth={true}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                          />
                        )}
                      {/* user is the author, and product is not sold*/}
                      {productDetails[0].user_id == this.context.userData.id &&
                        productDetails[0].status != 1 && (
                          <ButtonComponent
                            pressButtonComponent={() => {
                              this.closeProduct(productDetails[0].id);
                            }}
                            buttonComponentText="Zamknij Sprzedaż"
                            fullWidth={true}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                          />
                        )}

                      {/* user is the author, and product is sold*/}
                      {productDetails[0].user_id == this.context.userData.id &&
                        productDetails[0].status != 0 && (
                          <ButtonComponent
                            pressButtonComponent={() => {
                              this.reactivateProduct(productDetails[0].id);
                            }}
                            buttonComponentText="Wznów Sprzedaż"
                            fullWidth={true}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                          />
                        )}
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
