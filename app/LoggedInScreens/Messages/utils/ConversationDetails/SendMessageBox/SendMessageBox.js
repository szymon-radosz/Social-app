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
            onPress={() =>
              this.props.sendMessage(
                this.props.senderId,
                this.props.receiverId,
                this.props.receiverName,
                this.props.receiverEmail,
                this.props.receiverPhotoPath,
                this.state.message,
                this.props.conversationId,
                0
              )
            }
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