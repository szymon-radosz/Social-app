import React, { Component } from "react";
import { Text, Dimensions, Image, View, TouchableOpacity } from "react-native";
import axios from "axios";
import styles from "./../style";
//@ts-ignore
import Lightbox from "react-native-lightbox";
//@ts-ignore
import Carousel from "react-native-looped-carousel";
import PageHeader from "./../../SharedComponents/PageHeader";
import { GlobalContext } from "./../../../Context/GlobalContext";
import ButtonComponent from "./../../../Utils/ButtonComponent";

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
        that.context.setAlert(
          true,
          "danger",
          "Nie udało się pobrać danych o użytkowniku."
        );
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
            that.setState({
              usersAreInTheSameConversation: true,
              showProductMessageBox: false,
              showVoteBox: false
            });

            that.context.setAlert(
              true,
              "success",
              "Poprawnie wysłano wiadomość. Sprawdź zakładkę 'Wiadomości > Targ'."
            );
          }
        })
        .catch(function(error) {
          that.context.setAlert(
            true,
            "danger",
            "Problem z wysłaniem wiadomości."
          );
        });

      axios.post(API_URL + "/api/addNotification", {
        type: "started_conversation_user",
        message: `Użytkowniczka ${
          this.context.userData.name
        } odezwała się do Ciebie w wiadomości prywatnej dotyczącej produktu`,
        userId: receiverId
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
        console.log(response);
        if (response.data.status === "OK") {
          console.log([
            "sendVoteAPI",
            API_URL,
            userId,
            vote,
            message,
            authorId,
            productId
          ]);
          that.closeProduct(productId);

          that.context.setAlert(
            true,
            "success",
            "Dziękujemy za dodanie opinii."
          );
        }
      })
      .catch(function(error) {
        console.log(error);
        that.context.setAlert(
          true,
          "danger",
          "Problem z dodaniem opinii. Możesz dodać tylko jedną opinię dla poszczególnej użytkowniczki."
        );
      });

    console.log("next");
  };

  closeProduct = (productId: number) => {
    let API_URL = this.props.API_URL;

    let that = this;

    console.log(["closeProduct", productId]);

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
      usersAreInTheSameConversation
    } = this.state;
    return (
      <React.Fragment>
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
                closeMethod={() =>
                  this.props.setDisplayProductDetails(false, true)
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
                      this.props.API_URL,
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
                        Close
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
                {productDetails[0] && productDetails[0].categoryName[0].name && (
                  <Text style={styles.productContentText}>
                    <Text style={styles.bold}>Kategoria:</Text>{" "}
                    {productDetails[0].categoryName[0].name}
                  </Text>
                )}

                {productDetails[0] &&
                  productDetails[0].child_gender === "girl" && (
                    <Text style={styles.productContentText}>
                      <Text style={styles.bold}>Płeć dziecka:</Text> Dziewczynka
                    </Text>
                  )}

                {productDetails[0] && productDetails[0].child_gender === "boy" && (
                  <Text style={styles.productContentText}>
                    <Text style={styles.bold}>Płeć dziecka:</Text> Chłopiec
                  </Text>
                )}

                {productDetails[0] && productDetails[0].status === 0 && (
                  <Text style={styles.productContentText}>
                    <Text style={styles.bold}>Stan produktu:</Text> Nowe
                  </Text>
                )}

                {productDetails[0] && productDetails[0].status === 1 && (
                  <Text style={styles.productContentText}>
                    <Text style={styles.bold}>Stan produktu:</Text> Używane
                  </Text>
                )}

                {productDetails[0] && productDetails[0].users && (
                  <Text style={styles.productContentText}>
                    <Text style={styles.bold}>Dodane przez: </Text>
                    {productDetails[0].users.name}
                  </Text>
                )}

                {productDetails[0] && productDetails[0].users.location_string && (
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
              {productDetails[0].user_id != this.props.currentUser.id &&
                !usersAreInTheSameConversation &&
                productDetails[0].status != 1 && (
                  <ButtonComponent
                    pressButtonComponent={this.changeShowProductMessageBox}
                    buttonComponentText="Wyślij wiadomość"
                    fullWidth={true}
                    underlayColor="#dd904d"
                    whiteBg={false}
                    showBackIcon={false}
                  />
                )}
              {/* user is not the author and product is sold*/}
              {productDetails[0].user_id != this.props.currentUser.id &&
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
              {productDetails[0].user_id != this.props.currentUser.id &&
                usersAreInTheSameConversation &&
                productDetails[0].status == 1 && (
                  <ButtonComponent
                    pressButtonComponent={this.props.openMessages}
                    buttonComponentText="Produkt sprzedany, jesteście w konwersacji"
                    fullWidth={true}
                    underlayColor="#dd904d"
                    whiteBg={false}
                    showBackIcon={false}
                  />
                )}
              {/* user is not the author, they are in the same conversation and product is not sold*/}
              {productDetails[0].user_id != this.props.currentUser.id &&
                usersAreInTheSameConversation &&
                productDetails[0].status != 1 && (
                  <ButtonComponent
                    pressButtonComponent={this.props.openMessages}
                    buttonComponentText="Jestescie już w konwersacji"
                    fullWidth={true}
                    underlayColor="#dd904d"
                    whiteBg={false}
                    showBackIcon={false}
                  />
                )}
              {/* user is the author, and product is not sold*/}
              {productDetails[0].user_id == this.props.currentUser.id &&
                productDetails[0].status != 1 && (
                  <ButtonComponent
                    pressButtonComponent={this.changeVoteBox}
                    buttonComponentText="Zamknij Sprzedaż"
                    fullWidth={true}
                    underlayColor="#dd904d"
                    whiteBg={false}
                    showBackIcon={false}
                  />
                )}
            </View>
          ) : null}
        </View>
      </React.Fragment>
    );
  }
}
ProductDetails.contextType = GlobalContext;
export default ProductDetails;
