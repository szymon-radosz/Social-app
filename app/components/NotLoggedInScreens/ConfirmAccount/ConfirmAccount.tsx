import React, { Component } from "react";
import { Button, Text, View } from "react-native";

interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}

export default class ConfirmAccount extends Component<
  NavigationScreenInterface
> {
  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <Text>Sprawdź swoją skrzynkę email.</Text>
        <Text>Potwierdź swój adres e-mail, żeby zacząć używać e-mamy.pl</Text>

        <Button
          title="Zaloguj się"
          onPress={() =>
            navigation.navigate("Login", {
              API_URL: navigation.getParam("API_URL", ""),
              setUserData: navigation.getParam("setUserData")
            })
          }
        />
      </View>
    );
  }
}
