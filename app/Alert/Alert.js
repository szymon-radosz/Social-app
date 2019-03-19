import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import styles from "./style";

export default class Alert extends Component {
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.alertMessage !== props.alertMessage) {
      console.log("derivered");
      return {
        showAlert: true,
        alertMessage: props.alertMessage
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = { showAlert: true, alertMessage: "" };

    this.closeAlert = this.closeAlert.bind(this);
  }

  closeAlert() {
    this.setState({ showAlert: false });
  }

  render() {
    if (this.state.showAlert) {
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
            {this.state.alertMessage}
          </Text>
          <TouchableHighlight style={{ position: "absolute", right: 10 }}>
            <Button title="X" color="#fff" onPress={() => this.closeAlert()} />
          </TouchableHighlight>
        </View>
      );
    } else {
      return <View />;
    }
  }
}
