import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";
import SingleConversationBox from "./utils/ConversationDetails/SingleConversationBox/SingleConversationBox";
import ConversationDetails from "./utils/ConversationDetails/ConversationDetails";
import axios from "axios";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesList: [],
      openConversationDetails: false,
      openConversationDetailsId: "",
      openConversationMessages: [],
      receiverId: 0,
      receiverEmail: "",
      receiverName: "",
      receiverPhotoPath: ""
    };

    this.getMessages = this.getMessages.bind(this);
    this.openConversationDetails = this.openConversationDetails.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  //open conversation details from list of conversations
  openConversationDetails(
    id,
    receiverId,
    receiverName,
    receiverEmail,
    receiverPhotoPath
  ) {
    let API_URL = this.props.API_URL;
    let conversation_id = id;

    let that = this;

    axios
      .post(API_URL + "/api/showConversationDetails", {
        conversation_id: conversation_id
      })
      .then(function(response) {
        console.log(response);

        that.setState({
          openConversationDetailsId: id,
          openConversationDetails: true,
          openConversationMessages: response.data.conversationData[0].messages,
          receiverId: receiverId,
          receiverName: receiverName,
          receiverEmail: receiverEmail,
          receiverPhotoPath: receiverPhotoPath
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //send new message inside conversation details
  sendMessage(
    sender_id,
    receiver_id,
    receiverName,
    receiverEmail,
    receiverPhotoPath,
    message,
    conversation_id,
    status
  ) {
    console.log([sender_id, receiver_id, message, conversation_id, status]);
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
        console.log(["send message box", response]);

        that.openConversationDetails(
          conversation_id,
          receiver_id,
          receiverName,
          receiverEmail,
          receiverPhotoPath
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //load all conversation with messages for them
  getMessages() {
    let API_URL = this.props.API_URL;
    let user_id = this.props.user.id;

    let that = this;

    axios
      .post(API_URL + "/api/showUserConversations", {
        user_id: user_id
      })
      .then(function(response) {
        console.log(["getMessages", response]);

        that.setState({
          messagesList: response.data.conversationData
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getMessages();
  }

  render() {
    return (
      <View>
        <Text style={styles.pageTitle}>Wiadomości</Text>

        <View
          style={{
            flexWrap: "wrap",
            alignItems: "flex-start",
            flexDirection: "row"
          }}
        >
          {this.state.messagesList &&
            !this.state.openConversationDetails &&
            this.state.messagesList.map((conversation, i) => {
              console.log(["conversation[i]", conversation[0]]);
              return (
                <SingleConversationBox
                  key={i}
                  conversation={conversation[0]}
                  API_URL={this.props.API_URL}
                  openConversationDetails={this.openConversationDetails}
                />
              );
            })}

          {this.state.openConversationDetails && (
            <ConversationDetails
              messages={this.state.openConversationMessages}
              currentUser={this.props.user}
              receiverId={this.state.receiverId}
              receiverName={this.state.receiverName}
              receiverEmail={this.state.receiverEmail}
              receiverPhotoPath={this.state.receiverPhotoPath}
              API_URL={this.props.API_URL}
              sendMessage={this.sendMessage}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  pageTitle: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10
  },
  pageSubTitle: {
    textAlign: "center",
    color: "#333",
    fontWeight: "400",
    fontSize: 14,
    paddingBottom: 20
  }
});
