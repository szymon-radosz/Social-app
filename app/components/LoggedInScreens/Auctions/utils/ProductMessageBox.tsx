import React, { Component } from "react";
import {
  TextInput,
  Button,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import styles from "./../style";
import Alert from "./../../../../Alert/Alert";
import PageHeader from "./../../SharedComponents/PageHeader";

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
      <View style={styles.relative}>
        <PageHeader
          boldText={"Pytanie do sprzedającego"}
          normalText={""}
          closeMethod={this.props.changeShowProductMessageBox}
          closeMethodParameter={""}
        />

        <View style={styles.sellerVoteBoxContainer}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            maxLength={500}
            onChangeText={message => this.setState({ message })}
            value={message}
            placeholder="Napisz wiadomość..."
            placeholderTextColor="#333"
            style={styles.userProductMessageTextArea}
          />
          <TouchableHighlight
            style={styles.productDetailsBtn}
            onPress={() => this.props.sendNewConversationProduct(message)}
            underlayColor={"#dd904d"}
          >
            <Text style={styles.peachBtnText}>Wyślij</Text>
          </TouchableHighlight>

          {alertMessage != "" && (
            <Alert alertType={alertType} alertMessage={alertMessage} />
          )}
        </View>
      </View>
    );
  }
}
