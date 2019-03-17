import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";
import styles from "./style";

export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  }

  render() {
    return (
      <View style={styles.alertContainer}>
        <Text
          style={
            this.props.alertType == "success"
              ? styles.successContainer
              : this.props.alertType == "danger"
              ? styles.dangerContainer
              : null
          }
        >
          {this.props.alertMessage}
        </Text>
      </View>
    );
  }
}
