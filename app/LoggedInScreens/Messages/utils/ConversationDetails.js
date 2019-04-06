import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import SendMessageBox from "./SendMessageBox";
import SingleConversationMessage from "./SingleConversationMessage";
import styles from "./../style";
import { v4 as uuid } from "uuid";

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
      <View style={styles.viewContainer}>
        <TouchableOpacity>
          <Image
            style={styles.image}
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
                key={uuid()}
                receiverName={this.props.receiverName}
                receiverEmail={this.props.receiverEmail}
                receiverPhotoPath={this.props.receiverPhotoPath}
              />
            );
          })}
        {this.state.messages && this.state.messages[0].conversation_id && (
          <SendMessageBox
            style={styles.sendMessage}
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
