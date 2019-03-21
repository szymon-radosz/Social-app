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
  }

  openConversationDetails(id) {
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
          openConversationMessages: response.data.conversationData[0].messages
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

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
          messagesList: response.data.conversationData,
          receiverId: response.data.conversationData[0].receiverId,
          receiverName: response.data.conversationData[0].receiverName,
          receiverEmail: response.data.conversationData[0].receiverEmail,
          receiverPhotoPath: response.data.conversationData[0].receiverPhotoPath
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
              return (
                <SingleConversationBox
                  key={i}
                  conversation={conversation}
                  API_URL={this.props.API_URL}
                  openConversationDetails={this.openConversationDetails}
                />
              );
            })}

          {this.state.openConversationDetails && (
            <ConversationDetails
              messages={this.state.openConversationMessages}
              senderId={this.props.user.id}
              receiverId={this.state.receiverId}
              receiverName={this.state.receiverName}
              receiverEmail={this.state.receiverEmail}
              receiverPhotoPath={this.state.receiverPhotoPath}
              API_URL={this.props.API_URL}
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
