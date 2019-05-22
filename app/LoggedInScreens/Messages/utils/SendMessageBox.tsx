import React, { Component } from "react";
import {
  Button,
  TextInput,
  TouchableHighlight,
  Text,
  View
} from "react-native";
import styles from "./../style";

interface SendMessageBoxState {
  message: string;
}

interface SendMessageBoxProps {
  senderId: number;
  receiverId: number;
  conversationId: number;
  sendMessage: any;
  receiverName: string;
  receiverEmail: string;
  receiverPhotoPath: string;
}

export default class SendMessageBox extends Component<
  SendMessageBoxProps,
  SendMessageBoxState
> {
  constructor(props: SendMessageBoxProps) {
    super(props);
    this.state = {
      message: ""
    };
  }

  render() {
    return (
      <View>
        {/*<Text>
          {this.props.senderId};{this.props.receiverId};
          {this.props.conversationId}
        </Text>*/}
        <View
          style={{
            borderTopColor: "#E5E5E5",
            borderTopWidth: 1,
            marginTop: 5
          }}
        />

        <TextInput
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            padding: 10,
            height: 40,
            borderWidth: 1,
            borderRadius: 6
          }}
          placeholder="Napisz odpowiedź..."
          placeholderTextColor="#919191"
          onChangeText={message => this.setState({ message })}
          value={this.state.message}
        />
        <TouchableHighlight style={styles.sendMessageBtn}>
          <Button
            title="Wyślij"
            color="#fff"
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
