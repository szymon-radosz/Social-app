import React, { Component, Suspense } from "react";
import { TouchableOpacity, Text, ImageBackground, View } from "react-native";
import axios from "axios";
import styles from "./style";
import { v4 as uuid } from "uuid";
const messagesBgMin: any = require("./../../../assets/images/messagesBgMin.jpg");
import { GlobalContext } from "./../../Context/GlobalContext";
import ListItem from "./../../Utils/ListItem";

import MessageList from "./utils/MessageList";

const ConversationDetails = React.lazy(() =>
  import("./utils/ConversationDetails")
);

interface MessagesState {
  messagesList: any;
  openConversationDetails: boolean;
  openConversationDetailsId: number;
  openConversationMessages: any;
  receiverId: number;
  receiverEmail: string;
  receiverName: string;
  showFilterPanel: boolean;
  receiverPhotoPath: string;
  displayPrivateMessages: boolean;
  userMessage: string;
}

interface MessagesProps {
  API_URL: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  clearUserUnreadedMessages: any;
}

class Messages extends Component<MessagesProps, MessagesState> {
  constructor(props: MessagesProps) {
    super(props);
    this.state = {
      messagesList: [],
      openConversationDetails: false,
      openConversationDetailsId: 0,
      openConversationMessages: [],
      receiverId: 0,
      receiverEmail: "",
      receiverName: "",
      showFilterPanel: false,
      receiverPhotoPath: "",
      displayPrivateMessages: false,
      userMessage: ""
    };

    this.getMessages = this.getMessages.bind(this);
    this.openConversationDetails = this.openConversationDetails.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getAuctionMessages = this.getAuctionMessages.bind(this);
    this.setUserMessage = this.setUserMessage.bind(this);
    this.closeConversationDetails = this.closeConversationDetails.bind(this);
  }

  setUserMessage = (message: string): void => {
    this.setState({ userMessage: message });
  };

  closeConversationDetails = (): void => {
    this.setState({ openConversationDetails: false, showFilterPanel: true });
  };

  //open conversation details from list of conversations
  openConversationDetails = (
    id: number,
    receiverId: number,
    receiverName: string,
    receiverEmail: string,
    receiverPhotoPath: string
  ): void => {
    let API_URL = this.props.API_URL;
    let conversation_id = id;

    let that = this;

    axios
      .post(API_URL + "/api/showConversationDetails", {
        conversation_id: conversation_id
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({
            openConversationDetailsId: id,
            openConversationDetails: true,
            openConversationMessages: response.data.result[0].messages,
            receiverId: receiverId,
            receiverName: receiverName,
            receiverEmail: receiverEmail,
            receiverPhotoPath: receiverPhotoPath,
            showFilterPanel: false
          });
        }
      })
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Wystąpił błąd z wyświetleniem szczegółów konwersacji."
        );
      });
  };

  //send new message inside conversation details
  sendMessage = (
    sender_id: number,
    receiver_id: number,
    receiverName: string,
    receiverEmail: string,
    receiverPhotoPath: string,
    message: string,
    conversation_id: number,
    status: number
  ): void => {
    let API_URL = this.props.API_URL;

    let that = this;

    axios.post(API_URL + "/api/addNotification", {
      type: "sended_message",
      message: `Masz nową wiadomość od użytkowniczki ${this.props.user.name} (${
        this.props.user.email
      })`,
      userId: receiver_id
    });

    axios
      .post(API_URL + "/api/saveMessage", {
        sender_id: sender_id,
        receiver_id: receiver_id,
        message: message,
        conversation_id: conversation_id,
        status: status
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.openConversationDetails(
            conversation_id,
            receiver_id,
            receiverName,
            receiverEmail,
            receiverPhotoPath
          );
        }
      })
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Wystąpił błąd z wyświetleniem zapisem wiadomości."
        );
      });
  };

  //load all conversation with messages for them
  getMessages = (): void => {
    let API_URL = this.props.API_URL;
    let user_id = this.props.user.id;

    let that = this;

    axios
      .post(API_URL + "/api/showUserConversations", {
        user_id: user_id
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({
            messagesList: response.data.result.conversationData,
            displayPrivateMessages: true
          });
        }
      })
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Wystąpił błąd z wyświetleniem szczegółów konwersacji."
        );
      });
  };

  getAuctionMessages = (): void => {
    let API_URL = this.props.API_URL;
    let user_id = this.props.user.id;

    let that = this;

    axios
      .post(API_URL + "/api/showUserConversations", {
        user_id: user_id,
        showProductsConversations: true
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({
            messagesList: response.data.result.conversationData,
            displayPrivateMessages: false
          });
        }
      })
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Wystąpił błąd z wyświetleniem szczegółów konwersacji."
        );
      });
  };

  componentDidMount = (): void => {
    this.getMessages();
    this.setState({ displayPrivateMessages: true, showFilterPanel: true });
  };

  render() {
    const {
      displayPrivateMessages,
      showFilterPanel,
      messagesList,
      openConversationDetails,
      openConversationMessages,
      receiverId,
      receiverName,
      receiverEmail,
      receiverPhotoPath,
      userMessage
    } = this.state;
    return (
      <View>
        {!openConversationDetails && (
          <ImageBackground source={messagesBgMin} style={{ width: "100%" }}>
            <Text style={styles.pageTitle}>Twoje{"\n"}Wiadomości</Text>
          </ImageBackground>
        )}

        {showFilterPanel && (
          <View>
            <View style={styles.filterBtnContainer}>
              <View style={styles.singleButtonCol2Container}>
                <TouchableOpacity
                  onPress={this.getMessages}
                  style={
                    displayPrivateMessages
                      ? styles.filterBtnActive
                      : styles.filterBtn
                  }
                >
                  <Text
                    style={
                      displayPrivateMessages
                        ? styles.filterBtnTextActive
                        : styles.filterBtnText
                    }
                  >
                    Prywatne
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.singleButtonCol2Container}>
                <TouchableOpacity
                  onPress={this.getAuctionMessages}
                  style={
                    !displayPrivateMessages
                      ? styles.filterBtnActive
                      : styles.filterBtn
                  }
                >
                  <Text
                    style={
                      !displayPrivateMessages
                        ? styles.filterBtnTextActive
                        : styles.filterBtnText
                    }
                  >
                    Targ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {messagesList && !openConversationDetails ? (
          messagesList.length > 0 ? (
            <MessageList
              messagesList={messagesList}
              API_URL={this.props.API_URL}
              openConversationDetails={this.openConversationDetails}
            />
          ) : displayPrivateMessages ? (
            <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
              Brak wyników. Zaproś inne mamy z Twojej okolicy do znajomych.
            </Text>
          ) : (
            <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
              Brak wyników. Dodaj nieużywane przedmioty w zakładce 'Targ' i
              uzgodnij szczegóły z innymi użytkowniczkami w wiadomościach.
            </Text>
          )
        ) : null}

        {openConversationDetails && (
          <Suspense fallback={<Text>Wczytywanie...</Text>}>
            <ConversationDetails
              messages={openConversationMessages}
              currentUser={this.props.user}
              receiverId={receiverId}
              receiverName={receiverName}
              receiverEmail={receiverEmail}
              receiverPhotoPath={receiverPhotoPath}
              API_URL={this.props.API_URL}
              sendMessage={this.sendMessage}
              clearUserUnreadedMessages={this.props.clearUserUnreadedMessages}
              setUserMessage={this.setUserMessage}
              userMessage={userMessage}
              closeConversationDetails={this.closeConversationDetails}
            />
          </Suspense>
        )}
      </View>
    );
  }
}
Messages.contextType = GlobalContext;
export default Messages;
