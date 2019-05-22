import React, { Component } from "react";
import { TouchableOpacity, Text, ImageBackground, View } from "react-native";
import SingleConversationBox from "./utils/SingleConversationBox";
import ConversationDetails from "./utils/ConversationDetails";
import axios from "axios";
import styles from "./style";
import { v4 as uuid } from "uuid";
import messagesBgMin from "./../../assets/images/messagesBgMin.jpg";

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
}

interface MessagesProps {
  API_URL: string;
  user: {
    id: number;
  };
  clearUserUnreadedMessages: any;
}

export default class FillNecessaryInfo extends Component<
  MessagesProps,
  MessagesState
> {
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
      displayPrivateMessages: false
    };

    this.getMessages = this.getMessages.bind(this);
    this.openConversationDetails = this.openConversationDetails.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getAuctionMessages = this.getAuctionMessages.bind(this);
  }

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
          console.log(response);

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
        console.log(error);
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
    //console.log([sender_id, receiver_id, message, conversation_id, status]);
    let API_URL = this.props.API_URL;

    let that = this;

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
          console.log(["send message box", response]);

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
        console.log(error);
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
          console.log(["getMessages", response]);

          that.setState({
            messagesList: response.data.result.conversationData,
            displayPrivateMessages: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
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
          console.log(["getMessages", response]);

          that.setState({
            messagesList: response.data.result.conversationData,
            displayPrivateMessages: false
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount = (): void => {
    this.getMessages();
    this.setState({ displayPrivateMessages: true, showFilterPanel: true });
  };

  render() {
    const { displayPrivateMessages, showFilterPanel } = this.state;
    return (
      <View>
        {!this.state.openConversationDetails && (
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

        <View style={styles.messageListContainer}>
          {this.state.messagesList &&
            !this.state.openConversationDetails &&
            this.state.messagesList.map((conversation: any, i: number) => {
              console.log(["conversation[i]", conversation[0]]);
              return (
                <SingleConversationBox
                  key={uuid()}
                  conversation={conversation[0]}
                  API_URL={this.props.API_URL}
                  openConversationDetails={this.openConversationDetails}
                />
              );
            })}
        </View>

        {this.state.openConversationDetails && (
          <ConversationDetails
            messages={this.state.openConversationMessages}
            currentUser={this.props.user}
            receiverId={this.state.receiverId}
            receiverName={this.state.receiverName}
            receiverEmail={this.state.receiverEmail}
            receiverPhotoPath={this.state.receiverPhotoPath}
            API_URL={this.props.API_URL}
            // @ts-ignore
            sendMessage={this.sendMessage}
            clearUserUnreadedMessages={this.props.clearUserUnreadedMessages}
          />
        )}
      </View>
    );
  }
}
