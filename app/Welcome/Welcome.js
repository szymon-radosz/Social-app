import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";
import Login from "./../Auth/Login";
import Register from "./../Auth/Register";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>E-mamy.pl Welcome</Text>

        <Button
          title="Logowanie"
          onPress={() => this.props.navigation.navigate("Login")}
        />

        <Button
          title="Rejestracja"
          onPress={() => this.props.navigation.navigate("Register")}
        />
      </View>
    );
  }
}
