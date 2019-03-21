import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";

export default class SingleConversationMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>{this.props.message.message}</Text>
        <View style={{ borderBottomWidth: 1 }} />
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
