import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight,
  SafeAreaView
} from "react-native";
import axios from "axios";
import Alert from "./../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import SendMessageBox from "./SendMessageBox";
import SingleConversationMessage from "./SingleConversationMessage";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";
import { GlobalContext } from "./../../../Context/GlobalContext";

const loaderImage: any = require("./../../../assets/images/loader.gif");

interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}

interface ConversationDetailsState {
  openConversationMessages: any;
  receiverId: number;
  receiverEmail: string;
  receiverName: string;
  receiverPhotoPath: string;
  userMessage: string;
  privateConversation: boolean;
  productConversationId: number;
  productConversationAuthorId: number;
}

interface ConversationDetailsProps {
  navigation: any;
}

class ConversationDetails extends Component<
  ConversationDetailsProps,
  ConversationDetailsState,
  NavigationScreenInterface
> {
  constructor(props: ConversationDetailsProps) {
    super(props);
    this.state = {
      //messages: this.props.messages,
      openConversationMessages: [],
      receiverId: 0,
      receiverEmail: "",
      receiverName: "",
      receiverPhotoPath: "",
      userMessage: "",
      privateConversation: true,
      productConversationId: 0,
      productConversationAuthorId: 0
    };

    this.openConversationDetails = this.openConversationDetails.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.loadUserDataById = this.loadUserDataById.bind(this);
  }

  sendMessage = (
    receiver_id: number,
    message: string,
    conversation_id: number,
    status: number
  ): void => {
    let API_URL = this.context.API_URL;
    let openDetailsId = 0;
    let that = this;

    if (!message) {
      that.context.setAlert(true, "danger", "Pusta wiadomość.");
    } else {
      axios
        .post(API_URL + "/api/saveMessage", {
          sender_id: this.context.userData.id,
          receiver_id: receiver_id,
          message: message,
          conversation_id: conversation_id,
          status: status
        })
        .then(response => {
          console.log(["saveMessage", response.data]);
          if (response.data.status === "OK") {
            //save conversation_id as openDetailsId in notification,
            //openDetailsId is parameter for route
            openDetailsId = response.data.result.conversation_id;

            that.openConversationDetails(conversation_id);
          }
        })
        .then(response =>
          axios
            .post(API_URL + "/api/addNotification", {
              type: "sended_message",
              message: `Masz nową wiadomość od użytkowniczki ${
                this.context.userData.name
              }`,
              userId: receiver_id,
              senderId: this.context.userData.id,
              openDetailsId: openDetailsId
            })
            .then(response =>
              console.log(["saveMessage not", response.data, openDetailsId])
            )
        )
        .catch(function(error) {
          that.context.setAlert(
            true,
            "danger",
            "Wystąpił błąd z wyświetleniem zapisem wiadomości."
          );
        });
    }
  };

  //open conversation details from list of conversations
  openConversationDetails = (id: number) => {
    //console.log(["openConversationDetails", id]);
    return new Promise((resolve, reject) => {
      let API_URL = this.context.API_URL;
      let conversation_id = id;

      let that = this;

      this.context.setShowLoader(true);

      axios
        .post(API_URL + "/api/showConversationDetails", {
          conversation_id: conversation_id
        })
        .then(async response => {
          if (response.data.status === "OK") {
            //console.log("details conv", response.data);

            let privateMessage = true;
            if (
              response.data.result[0].product_id &&
              response.data.result[0].product_id !== 0
            ) {
              /*console.log([
                "response.data.product_id",
                response.data.result[0].product_id
              ]);*/
              privateMessage = false;
            }

            await that.setState({
              openConversationMessages: response.data.result[0].messages,
              receiverId: that.props.navigation.state.params.receiverId,
              privateConversation: privateMessage,
              productConversationId: response.data.result[0].product_id,
              productConversationAuthorId: response.data.result[0].user_id
            });

            await that.context.setShowLoader(false);

            //console.log(["privateMessage", privateMessage]);

            resolve(true);
          }
        })
        .catch(async error => {
          await that.context.setAlert(
            true,
            "danger",
            "Wystąpił błąd z wyświetleniem szczegółów konwersacji."
          );

          await that.context.setShowLoader(false);

          reject(true);
        });
    });
  };

  loadUserDataById = (userId: number) => {
    //let userId = this.props.navigation.state.params.receiverId;

    return new Promise((resolve, reject) => {
      let API_URL = this.context.API_URL;

      let that = this;

      axios
        .post(API_URL + "/api/loadUserDataById", {
          id: userId
        })
        .then(response => {
          if (response.data.status === "OK") {
            /*console.log(
              "loadUserDataById",
              response.data,
              response.data.result[0].name
            );*/

            let results = response.data.result[0];

            console.log(
              "loadUserDataById",
              response.data,
              response.data.result[0].name
            );

            that.setState({
              receiverName: results.name,
              receiverEmail: results.email,
              receiverPhotoPath: results.photo_path
            });

            resolve(true);
          }
        })
        .catch(function(error) {
          reject(true);
        });
    });
  };

  setUserMessage = (message: string): void => {
    this.setState({ userMessage: message });
  };

  componentDidMount = async () => {
    console.log([
      "conversationDetails Did mount",
      this.props.navigation.state.params.conversationId,
      this.props.navigation.state.params.receiverId
    ]);

    await this.openConversationDetails(
      this.props.navigation.state.params.conversationId
    );

    await this.loadUserDataById(this.props.navigation.state.params.receiverId);

    if (this.context.userData.id)
      this.context.clearUserUnreadedMessages(
        this.context.userData.id,
        this.props.navigation.state.params.conversationId
      );

    console.log([
      "openConversationMessages",
      this.state.openConversationMessages
    ]);
  };

  render() {
    const {
      receiverId,
      receiverName,
      receiverEmail,
      receiverPhotoPath,
      userMessage,
      openConversationMessages,
      privateConversation,
      productConversationId,
      productConversationAuthorId
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
            data-test="Messages"
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
                <View
                  style={styles.viewContainer}
                  data-test="ConversationDetails"
                >
                  <PageHeader
                    boldText={receiverName}
                    normalText={""}
                    closeMethod={() => this.props.navigation.goBack(null)}
                    closeMethodParameter={""}
                    data-test="PageHeader"
                  />

                  <View style={styles.messageDetailsContainer}>
                    <TouchableOpacity>
                      <Image
                        style={styles.conversationDetailsReceiverImage}
                        source={{
                          uri: `${receiverPhotoPath && receiverPhotoPath}`
                        }}
                      />
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.conversationDetailsReceiverName}>
                        Rozmowa z {receiverName}
                      </Text>
                      {privateConversation && (
                        <TouchableHighlight
                          onPress={async () => {
                            this.props.navigation.navigate("UserDetails", {
                              userId: this.props.navigation.state.params
                                .receiverId,
                              showBtns: true
                            });
                          }}
                          underlayColor={"#fff"}
                        >
                          <Text style={styles.conversationDetailsSeeMore}>
                            Zobacz profil
                          </Text>
                        </TouchableHighlight>
                      )}

                      {!privateConversation &&
                        productConversationId !== 0 &&
                        productConversationAuthorId !== 0 && (
                          <TouchableHighlight
                            onPress={async () => {
                              this.props.navigation.navigate("ProductDetails", {
                                productId: productConversationId,
                                authorId: productConversationAuthorId
                              });
                            }}
                            underlayColor={"#fff"}
                          >
                            <Text style={styles.conversationDetailsSeeMore}>
                              Zobacz szczegóły produktu
                            </Text>
                          </TouchableHighlight>
                        )}
                    </View>
                  </View>
                  {/* <Text>Sender: {this.props.senderId}</Text>*/}
                  <ScrollView>
                    {openConversationMessages &&
                      openConversationMessages.map(
                        (message: any, i: number) => {
                          return (
                            <SingleConversationMessage
                              message={message}
                              key={`SingleConversationMessage-${i}`}
                            />
                          );
                        }
                      )}
                  </ScrollView>

                  <SendMessageBox
                    receiverId={receiverId}
                    conversationId={
                      this.props.navigation.state.params.conversationId
                    }
                    sendMessage={this.sendMessage}
                    receiverName={receiverName}
                    receiverEmail={receiverEmail}
                    receiverPhotoPath={receiverPhotoPath}
                    setUserMessage={this.setUserMessage}
                    userMessage={userMessage}
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

ConversationDetails.contextType = GlobalContext;
export default ConversationDetails;
