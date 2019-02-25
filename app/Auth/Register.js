import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>Rejestracja</Text>

        <Button
          title="idz do Welcome"
          onPress={() => this.props.navigation.navigate("Welcome")}
        />
      </View>
    );
  }
}
