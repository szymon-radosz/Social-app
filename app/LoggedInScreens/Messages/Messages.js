import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";
import ConversationBox from "./utils/ConversationBox/ConversationBox";
import axios from "axios";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesList: []
    };

    this.getMessages = this.getMessages.bind(this);
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
                />
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
