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
  }

  componentDidMount() {
    console.log(["ConversationDetails", this.props]);
  }

  render() {
    return (
      <View>
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
                key={i}
                receiverName={this.props.receiverName}
                receiverEmail={this.props.receiverEmail}
                receiverPhotoPath={this.props.receiverPhotoPath}
              />
            );
          })}
        <SendMessageBox
          senderId={this.props.senderId}
          receiverId={this.props.receiverId}
          conversationId={this.state.messages[0].conversation_id}
          API_URL={this.props.API_URL}
        />
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
