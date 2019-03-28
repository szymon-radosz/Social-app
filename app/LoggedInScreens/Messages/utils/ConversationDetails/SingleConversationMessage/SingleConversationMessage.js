import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import styles from "./style";

export default class SingleConversationMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrentUserTheSender: false,
      showMessageDate: false
    };

    this.setMessageDate = this.setMessageDate.bind(this);

    console.log(["single message", this.props]);
  }

  setMessageDate() {
    console.log("setMessageDate");
    this.setState({ showMessageDate: !this.state.showMessageDate });
  }

  componentDidMount() {
    if (this.props.currentUser.id === this.props.message.sender_id) {
      console.log("isCurrentUserTheSender");
      this.setState({ isCurrentUserTheSender: true });
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setMessageDate();
          }}
        >
          <Text
            style={
              this.state.isCurrentUserTheSender
                ? styles.senderBox
                : styles.receiverBox
            }
          >
            {this.props.message.message}
          </Text>
        </TouchableOpacity>
        {this.state.showMessageDate && (
          <Text style={styles.messageDate}>
            {this.props.message.created_at}
          </Text>
        )}
        <View style={{ borderBottomWidth: 1 }} />
      </View>
    );
  }
}
