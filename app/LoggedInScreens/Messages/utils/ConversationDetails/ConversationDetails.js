import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import SendMessageBox from "./SendMessageBox/SendMessageBox";
import SingleConversationMessage from "./SingleConversationMessage/SingleConversationMessage";
import axios from "axios";

export default class ConversationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
    };

    console.log(["det", this.props]);
  }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.

    console.log(["getDerivedStateFromProps", props.messages]);
    if (props.messages !== state.messages) {
      return {
        messages: props.messages
      };
    }
    return null;
  }

  componentDidMount() {
    console.log(["ConversationDetails", this.props]);

    this.props.clearUserUnreadedMessages(
      this.props.currentUser.id,
      this.state.messages[0].conversation_id
    );
  }

  /*componentDidUpdate() {
    this.setState({ messages: this.props.messages });
    console.log("Conversation details update", this.props);
  }*/

  render() {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <TouchableOpacity>
          <Image
            style={{ width: 45, height: 45 }}
            source={{
              uri: `${this.props.API_URL}userPhotos/${
                this.props.receiverPhotoPath
              }`
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text>receiver:{this.props.receiverName}</Text>
        <Text>Sender: {this.props.senderId}</Text>
        {this.state.messages &&
          this.state.messages.map((message, i) => {
            return (
              <SingleConversationMessage
                message={message}
                currentUser={this.props.currentUser}
                key={i}
                receiverName={this.props.receiverName}
                receiverEmail={this.props.receiverEmail}
                receiverPhotoPath={this.props.receiverPhotoPath}
              />
            );
          })}
        {this.state.messages && this.state.messages[0].conversation_id && (
          <SendMessageBox
            style={{ alignSelf: "flex-end", position: "absolute", bottom: 35 }}
            senderId={this.props.currentUser.id}
            receiverId={this.props.receiverId}
            conversationId={this.state.messages[0].conversation_id}
            API_URL={this.props.API_URL}
            sendMessage={this.props.sendMessage}
            receiverName={this.props.receiverName}
            receiverEmail={this.props.receiverEmail}
            receiverPhotoPath={this.props.receiverPhotoPath}
          />
        )}
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
