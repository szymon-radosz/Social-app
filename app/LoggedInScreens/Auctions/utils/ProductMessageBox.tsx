import React, { Component } from "react";
import {
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import styles from "./../style";
import Alert from "./../../../Alert/Alert";

interface UserOnListProps {
  changeShowProductMessageBox: any;
  sendNewConversationProduct: any;
}
interface UserOnListState {
  message: string;
  alertMessage: string;
  alertType: string;
}

export default class UserOnList extends Component<
  UserOnListProps,
  UserOnListState
> {
  constructor(props: UserOnListProps) {
    super(props);
    this.state = {
      message: "",
      alertMessage: "",
      alertType: ""
    };
  }
  render() {
    const { message, alertMessage, alertType } = this.state;
    return (
      <View style={styles.mainModalContainer}>
        <View style={styles.userDetailsModalContentContainer}>
          <View style={styles.relative}>
            <TouchableHighlight style={styles.buttonCloseModal}>
              <Button
                title="<"
                color="#fff"
                onPress={() => this.props.changeShowProductMessageBox()}
              />
            </TouchableHighlight>
            <View style={styles.userDetailsHeader}>
              <Text style={styles.userMessageHeader}>
                Napisz pytanie do sprzedającego
              </Text>
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
                onPress={() => this.props.sendNewConversationProduct(message)}
              />
            </TouchableHighlight>
          </View>
        </View>
        {alertMessage != "" && (
          <Alert alertType={alertType} alertMessage={alertMessage} />
        )}
      </View>
    );
  }
}
