import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";

interface ForumProps {}
export default class Forum extends Component<ForumProps> {
  constructor(props: ForumProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>E-mamy.pl Forum</Text>
      </View>
    );
  }
}
