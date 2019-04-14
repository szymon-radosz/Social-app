import React, { Component } from "react";
import { Platform, Button, Text, View, TouchableHighlight } from "react-native";
import styles from "./style";

interface AlertProps {
  alertType: string;
  alertMessage: string;
}

interface AlertState {
  showAlert: boolean;
  alertMessage: string;
}

export default class Alert extends Component<AlertProps, AlertState> {
  static getDerivedStateFromProps(props: any, current_state: any) {
    if (current_state.alertMessage !== props.alertMessage) {
      console.log("derivered");
      return {
        showAlert: true,
        alertMessage: props.alertMessage
      };
    }
    return null;
  }

  constructor(props: AlertProps) {
    super(props);
    this.state = { showAlert: true, alertMessage: "" };

    this.closeAlert = this.closeAlert.bind(this);
  }

  closeAlert() {
    this.setState({ showAlert: false });
  }

  render() {
    const { alertType } = this.props;
    const { showAlert, alertMessage } = this.state;
    if (showAlert) {
      return (
        <View style={styles.alertContainer}>
          <Text
            style={
              alertType == "success"
                ? styles.successContainer
                : alertType == "danger"
                ? styles.dangerContainer
                : null
            }
          >
            {alertMessage}
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
