import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  TextInput,
  TouchableHighlight,
  Text,
  View
} from "react-native";
import axios from "axios";

export default class SendMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    let sender_id = this.props.senderId;
    let receiver_id = this.props.receiverId;
    let message = this.state.message;
    let conversation_id = this.props.conversationId;
    let status = 0;
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
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.senderId};{this.props.receiverId};
          {this.props.conversationId}
        </Text>

        <TextInput
          placeholder="Odpowiedź..."
          placeholderTextColor="#919191"
          onChangeText={message => this.setState({ message })}
          value={this.state.message}
        />
        <TouchableHighlight>
          <Button
            title="Wyślij"
            color="#000"
            onPress={() => this.sendMessage()}
          />
        </TouchableHighlight>
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
