import React, { Component } from "react";
import { View, Image, SafeAreaView } from "react-native";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../Utils/ButtonComponent";
import TextAreaComponent from "./../../Utils/TextAreaComponent";
import { GlobalContext } from "./../../../Context/GlobalContext";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import { withNavigation } from "react-navigation";
import Alert from "./../../Alert/Alert";
import lang from "./../../../assets/lang/Auctions/utils/ProductMessageBox";
import axios from "axios";

const loaderImage: any = require("./../../../assets/images/loader.gif");

interface ProductMessageBoxProps {
  sendNewConversationProduct: any;
  changeShowProductMessageBox: any;
  navigation: any;
}

interface ProductMessageBoxState {
  message: string;
}

class ProductMessageBox extends Component<
  ProductMessageBoxProps,
  ProductMessageBoxState
> {
  constructor(props: ProductMessageBoxProps) {
    super(props);
    this.state = {
      message: ""
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("willFocus", () => {
      let API_URL = this.context.API_URL;
      let loggedInUser = this.context.userData.id;
      let searchedUser = navigation.state.params.receiverId;
      let productId = navigation.state.params.productId;

      //console.log(["ProductMessageBox", loggedInUser, searchedUser, productId]);

      axios
        .post(API_URL + "checkIfUsersBelongsToProductConversation", {
          loggedInUser: loggedInUser,
          searchedUser: searchedUser,
          productId: productId
        })
        .then(response => {
          if (response.data.status === "OK" && response.data.result === true) {
            navigation.navigate("Auctions", {});
          }
        });
    });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  setMessage = (message: string) => {
    this.setState({ message: message });
  };

  sendNewConversationProduct = (message: string) => {
    if (message) {
      let API_URL = this.context.API_URL;
      let senderId = this.context.userData.id;
      let receiverId = this.props.navigation.state.params.receiverId;
      let productId = this.props.navigation.state.params.productId;
      let openDetailsId = 0;

      this.context.setShowLoader(true);

      axios
        .post(API_URL + "saveConversationProduct", {
          senderId: senderId,
          receiverId: receiverId,
          message: message,
          productId: productId
        })
        .then(async response => {
          if (response.data.status === "OK") {
            openDetailsId = response.data.result.id;
          }
        })
        .then(async response => {
          axios.post(API_URL + "addNotification", {
            type: "started_conversation_user",
            message: `User ${this.context.userData.name} send you product message`,
            userId: receiverId,
            senderId: this.context.userData.id,
            openDetailsId: openDetailsId
          });

          await this.context.setShowLoader(false);
        })
        .then(async res => {
          this.context.setAlert(true, "success", lang.sendMessageSuccess["en"]);

          this.props.navigation.push("ConversationDetails", {
            conversationId: openDetailsId,
            receiverId: receiverId
          });
        })
        .catch(async error => {
          await this.context.setAlert(
            true,
            "danger",
            lang.sendMessageError["en"]
          );

          await this.context.setShowLoader(false);
        });
    }
  };

  render() {
    const { message } = this.state;

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
                <View style={styles.relative}>
                  <PageHeader
                    boldText={lang.header["en"]}
                    normalText={""}
                    closeMethod={() => {
                      this.props.navigation.goBack(null);
                    }}
                    closeMethodParameter={""}
                  />

                  <View style={styles.sellerVoteBoxContainer}>
                    <TextAreaComponent
                      placeholder={lang.addMessage["en"]}
                      inputOnChange={(message: string) =>
                        this.setMessage(message)
                      }
                      value={message}
                      maxLength={500}
                      multiline={true}
                      numberOfLines={10}
                    />
                  </View>
                  <ButtonComponent
                    pressButtonComponent={() =>
                      this.sendNewConversationProduct(message)
                    }
                    buttonComponentText={lang.send["en"]}
                    fullWidth={true}
                    underlayColor="#dd904d"
                    whiteBg={false}
                    showBackIcon={false}
                  />
                </View>

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

ProductMessageBox.contextType = GlobalContext;
export default withNavigation(ProductMessageBox);
