import React, { Component } from "react";
import {
  Button,
  TouchableHighlight,
  Text,
  Dimensions,
  Image,
  View
} from "react-native";
import axios from "axios";
import styles from "./../style";
import Lightbox from "react-native-lightbox";
import Carousel from "react-native-looped-carousel";
import { v4 as uuid } from "uuid";
import PageHeader from "./../../SharedComponents/PageHeader";
import Alert from "./../../../../Alert/Alert";

const ProductMessageBox = React.lazy(() => import("./ProductMessageBox"));
const SellerVoteBox = React.lazy(() => import("./SellerVoteBox"));
const WINDOW_WIDTH = Dimensions.get("window").width;

const renderCarousel = (API_URL: string, imageArray: any): any => (
  <Carousel style={{ width: WINDOW_WIDTH, height: WINDOW_WIDTH }}>
    {imageArray.map((image: any, i: number) => {
      return (
        <Image
          style={{ flex: 1 }}
          resizeMode="contain"
          key={uuid()}
          source={{
            uri: `${API_URL}productPhotos/${image.path}`
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
  setDisplayProductDetails: any;
  openMessages: any;
}

interface ProductDetailsState {
  productDetails: any;
  showProductMessageBox: boolean;
  showVoteBox: boolean;
  foundVoteUserList: any;
  usersAreInTheSameConversation: boolean;
  productClosed: boolean;
  showAlert: boolean;
  alertType: string;
  alertMessage: string;
  productLocation: any;
}

export default class ProductDetails extends Component<
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
      showAlert: false,
      alertType: "",
      alertMessage: "",
      productLocation: []
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
    this.searchUsersByEmail = this.searchUsersByEmail.bind(this);
    this.sendVote = this.sendVote.bind(this);
    this.closeProduct = this.closeProduct.bind(this);
  }

  searchUsersByEmail = (email: string) => {
    let API_URL = this.props.API_URL;

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
          console.log(error);
        });
    }
  };

  changeShowProductMessageBox = () => {
    this.setState({ showProductMessageBox: !this.state.showProductMessageBox });
  };

  changeVoteBox = () => {
    this.setState({ showVoteBox: !this.state.showVoteBox });
  };

  getProductDetails = () => {
    let API_URL = this.props.API_URL;
    let productId = this.props.productId;

    let that = this;

    axios
      .post(API_URL + "/api/loadProductBasedOnId", {
        productId: productId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({
            productDetails: response.data.result
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  checkIfUsersBelongToConversationProduct = () => {
    //check if users are in the same conversation - start messaging
    let API_URL = this.props.API_URL;
    let searchedUser = this.props.productUserId;
    let loggedInUser = this.props.currentUser.id;
    let productId = this.props.productId;

    let that = this;

    axios
      .post(API_URL + "/api/checkIfUsersBelongsToProductConversation", {
        searchedUser: searchedUser,
        loggedInUser: loggedInUser,
        productId: productId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({
            usersAreInTheSameConversation: response.data.result
          });
        }
      })
      .catch(function(error) {
        console.log(error);

        that.setState({
          alertType: "danger",
          alertMessage: "Nie udało się pobrać danych o uzytkowniku"
        });
      });
  };

  sendNewConversationProduct = (message: string) => {
    if (message) {
      let API_URL = this.props.API_URL;
      let senderId = this.props.currentUser.id;
      let receiverId = this.state.productDetails[0].user_id;
      let productId = this.state.productDetails[0].id;

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
            that.setState({ showAlert: false });

            that.setState({
              usersAreInTheSameConversation: true,
              showProductMessageBox: false,
              showVoteBox: false,
              showAlert: true,
              alertType: "success",
              alertMessage:
                "Poprawnie wysłano wiadomość. Sprawdź zakładkę 'Wiadomości > Targ'."
            });
          }
        })
        .catch(function(error) {
          console.log(error);

          that.setState({ showAlert: false });

          that.setState({
            showAlert: true,
            alertType: "danger",
            alertMessage: "Problem z wysłaniem wiadomości."
          });
        });
    }
  };

  componentDidMount = () => {
    //load all products based on user coords
    this.getProductDetails();
    this.checkIfUsersBelongToConversationProduct();
  };

  sendVote = (
    selectedUserData: any,
    userVote: number,
    voteComment: string,
    product: any
  ) => {
    let API_URL = this.props.API_URL;
    let userId = selectedUserData.id;
    let vote = userVote;
    let message = voteComment;
    let authorId = this.props.currentUser.id;
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
        if (response.data.status === "OK") {
          that.setState({ showAlert: false });

          that.setState({
            showAlert: true,
            alertType: "success",
            alertMessage: "Dziękujemy za dodanie opinii."
          });
          that.closeProduct(productId);
        }
      })
      .catch(function(error) {
        console.log(error);

        that.setState({ showAlert: false });

        that.setState({
          showAlert: true,
          alertType: "danger",
          alertMessage:
            "Problem z dodaniem opinii. Możesz dodać tylko jedną opinię dla poszczególnej użytkowniczki"
        });
      });
  };

  closeProduct = (productId: number) => {
    let API_URL = this.props.API_URL;

    let that = this;

    axios
      .post(API_URL + "/api/closeProduct", {
        productId: productId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.changeVoteBox();
          that.getProductDetails();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const {
      showProductMessageBox,
      showVoteBox,
      productDetails,
      foundVoteUserList,
      usersAreInTheSameConversation,
      showAlert,
      alertType,
      alertMessage
    } = this.state;
    return (
      <View>
        {showProductMessageBox && !showVoteBox ? (
          <ProductMessageBox
            changeShowProductMessageBox={this.changeShowProductMessageBox}
            sendNewConversationProduct={this.sendNewConversationProduct}
          />
        ) : !showProductMessageBox && showVoteBox ? (
          <SellerVoteBox
            currentUser={this.props.currentUser}
            product={productDetails[0]}
            API_URL={this.props.API_URL}
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
              closeMethod={this.props.setDisplayProductDetails}
              closeMethodParameter={""}
            />

            <View style={styles.productDetailsHeader}>
              <Lightbox
                springConfig={{ tension: 15, friction: 7 }}
                swipeToDismiss={false}
                backgroundColor="rgba(0,0,0,0.7)"
                renderContent={() =>
                  renderCarousel(
                    this.props.API_URL,
                    productDetails[0].product_photos
                  )
                }
              >
                <Image
                  style={styles.productDetailsImage}
                  source={{
                    uri: `${this.props.API_URL}productPhotos/${
                      productDetails[0].product_photos[0].path
                    }`
                  }}
                />
              </Lightbox>

              {productDetails[0].product_photos.length > 1 && (
                <Text>Kliknij zdjęcie, aby zobaczyć galerię</Text>
              )}

              {productDetails[0].description ? (
                <Text style={styles.productHeaderText}>
                  {productDetails[0].description}
                </Text>
              ) : null}
            </View>
            <View style={styles.productContent}>
              {productDetails[0].categoryName[0].name && (
                <Text style={styles.productContentText}>
                  <Text style={styles.bold}>Kategoria:</Text>{" "}
                  {productDetails[0].categoryName[0].name}
                </Text>
              )}

              {productDetails[0].child_gender === "girl" && (
                <Text style={styles.productContentText}>
                  <Text style={styles.bold}>Płeć dziecka:</Text> Dziewczynka
                </Text>
              )}

              {productDetails[0].child_gender === "boy" && (
                <Text style={styles.productContentText}>
                  <Text style={styles.bold}>Płeć dziecka:</Text> Chłopiec
                </Text>
              )}

              {productDetails[0].status === 0 && (
                <Text style={styles.productContentText}>
                  <Text style={styles.bold}>Stan produktu:</Text> Nowe
                </Text>
              )}

              {productDetails[0].status === 1 && (
                <Text style={styles.productContentText}>
                  <Text style={styles.bold}>Stan produktu:</Text> Używane
                </Text>
              )}

              {productDetails[0].users && (
                <Text style={styles.productContentText}>
                  <Text style={styles.bold}>Dodane przez:</Text>{" "}
                  {productDetails[0].users.name} (
                  {productDetails[0].users.email})
                </Text>
              )}

              {productDetails[0].users.location_string && (
                <Text style={styles.productContentText}>
                  <Text style={styles.bold}>W poblizu:</Text>{" "}
                  {productDetails[0].users.location_string}
                </Text>
              )}

              {productDetails[0].price && (
                <Text style={styles.productContentText}>
                  <Text style={styles.bold}>Cena:</Text>{" "}
                  {productDetails[0].price} zł
                </Text>
              )}
            </View>
            {productDetails[0].user_id != this.props.currentUser.id &&
            !usersAreInTheSameConversation ? (
              productDetails[0].status != 1 ? (
                <TouchableHighlight style={styles.productDetailsBtn}>
                  <Button
                    title="Wyślij wiadomość"
                    color="#fff"
                    onPress={this.changeShowProductMessageBox}
                  />
                </TouchableHighlight>
              ) : (
                <View style={styles.productContent}>
                  <Text style={styles.productContentText}>
                    <Text style={styles.productClosed}>
                      Sprzedaż produktu zakończona
                    </Text>
                  </Text>
                </View>
              )
            ) : productDetails[0].user_id != this.props.currentUser.id &&
              usersAreInTheSameConversation ? (
              productDetails[0].status == 1 ? (
                <TouchableHighlight style={styles.productDetailsBtn}>
                  <Button
                    title="Produkt sprzedany, jesteście w konwersacji"
                    onPress={() => this.props.openMessages()}
                    color="#fff"
                  />
                </TouchableHighlight>
              ) : (
                <TouchableHighlight style={styles.productDetailsBtn}>
                  <Button
                    title="Jestescie juz w konwersacji"
                    onPress={() => this.props.openMessages()}
                    color="#fff"
                  />
                </TouchableHighlight>
              )
            ) : productDetails[0].status != 1 ? (
              <TouchableHighlight style={styles.productDetailsBtn}>
                <Button
                  title="Zamknij Sprzedaz"
                  onPress={() => this.changeVoteBox()}
                  color="#fff"
                />
              </TouchableHighlight>
            ) : (
              <View style={styles.productContent}>
                <Text style={styles.productContentText}>
                  <Text style={styles.productClosed}>
                    Sprzedaż produktu zakończona
                  </Text>
                </Text>
              </View>
            )}
          </View>
        ) : null}
        {showAlert != false && (
          <Alert alertType={alertType} alertMessage={alertMessage} />
        )}
      </View>
    );
  }
}
