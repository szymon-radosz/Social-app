import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";

export default class ConfirmAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Sprawdź swoją skrzynkę email.</Text>
        <Text>Potwierdź swój adres e-mail, żeby zacząć używać e-mamy.pl</Text>

        <Button
          title="Zaloguj się"
          onPress={() =>
            this.props.navigation.navigate("Login", {
              API_URL: this.props.navigation.getParam("API_URL", ""),
              setUserData: this.props.navigation.getParam("setUserData")
            })
          }
        />
      </View>
    );
  }
}
