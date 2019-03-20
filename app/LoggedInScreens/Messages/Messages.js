import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";
import ConversationBox from "./utils/ConversationBox/ConversationBox";
import axios from "axios";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesList: [],
      openConversationDetails: false,
      openConversationDetailsId: "",
      openConversationMessages: []
    };

    this.getMessages = this.getMessages.bind(this);
    this.openConversationDetails = this.openConversationDetails.bind(this);
  }

  openConversationDetails(id) {
    console.log("openConversationDetails");

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
        console.log(response);

        that.setState({ messagesList: response.data.conversationData });
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
            this.state.messagesList.map((conversation, i) => {
              return (
                <ConversationBox
                  key={i}
                  conversation={conversation}
                  API_URL={this.props.API_URL}
                  openConversationDetails={this.openConversationDetails}
                />
              );
            })}

          {this.state.openConversationDetails &&
            this.state.openConversationMessages.map((message, i) => {
              return (
                <Text>
                  {message.message}
                  {message.sender_id}
                </Text>
              );
            })}
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
