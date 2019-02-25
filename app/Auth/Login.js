import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>Logowanie</Text>

        <Button
          title="idz do Welcome"
          onPress={() => this.props.navigation.navigate("Welcome")}
        />
      </View>
    );
  }
}
