import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import styles from "./style";
import Alert from "./../../../Alert/Alert";

export default class UserOnList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      alertMessage: "",
      alertType: ""
    };
  }
  render() {
    return (
      <View style={styles.mainModalContainer}>
        <View style={styles.userDetailsModalContentContainer}>
          <View style={styles.relative}>
            <TouchableHighlight style={styles.buttonCloseModal}>
              <Button
                title="X"
                color="#000"
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
              value={this.state.message}
              placeholder="Napisz wiadomość..."
              placeholderTextColor="#333"
              style={styles.userMessageTextArea}
            />
            <TouchableHighlight style={styles.userMessageBtn}>
              <Button
                title="Wyślij"
                color="#fff"
                onPress={() =>
                  this.props.sendNewConversationProduct(this.state.message)
                }
              />
            </TouchableHighlight>
          </View>
        </View>
        {this.state.alertMessage != "" && (
          <Alert
            alertType={this.state.alertType}
            alertMessage={this.state.alertMessage}
          />
        )}
      </View>
    );
  }
}
