import React, { Component } from "react";
import {
  Platform,
  TextInput,
  Button,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import styles from "./../style";
import Alert from "./../../../Alert/Alert";

interface UserMessageBoxState {
  message: string;
}

interface UserMessageBoxProps {
  hideShowUserMessageBox: any;
  sendMessage: any;
  alertMessage: string;
  alertType: string;
}

export default class UserMessageBox extends Component<
  UserMessageBoxProps,
  UserMessageBoxState
> {
  constructor(props: UserMessageBoxProps) {
    super(props);
    this.state = {
      message: ""
    };
  }

  render() {
    const { message } = this.state;
    return (
      <View style={styles.relative}>
        <TouchableHighlight style={styles.buttonCloseModal}>
          <Button
            title="<"
            color="#fff"
            onPress={() => this.props.hideShowUserMessageBox()}
          />
        </TouchableHighlight>
        <View style={styles.userDetailsHeader}>
          <Text style={styles.userMessageHeader}>Rozpocznij rozmowę</Text>
        </View>

        <TextInput
          multiline={true}
          numberOfLines={10}
          onChangeText={message => this.setState({ message })}
          value={message}
          placeholder="Napisz wiadomość..."
          placeholderTextColor="#333"
          style={styles.userMessageTextArea}
        />
        <TouchableHighlight style={styles.userMessageBtn}>
          <Button
            title="Wyślij"
            color="#fff"
            onPress={() => this.props.sendMessage(message)}
          />
        </TouchableHighlight>
        {this.props.alertMessage != "" && (
          <Alert
            alertType={this.props.alertType}
            alertMessage={this.props.alertMessage}
          />
        )}
      </View>
    );
  }
}
