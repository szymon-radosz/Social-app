import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(["welcome", this.props.navigation.state]);
  }

  render() {
    return (
      <View>
        <Text>E-mamy.pl</Text>
        <Text>Pomocnik kazdej mamy</Text>

        <Button
          title="Logowanie"
          onPress={() =>
            this.props.navigation.navigate("Login", {
              API_URL: this.props.navigation.getParam("API_URL", ""),
              setUserData: this.props.navigation.getParam("setUserData")
            })
          }
        />

        <Button
          title="Rejestracja"
          onPress={() =>
            this.props.navigation.navigate("Register", {
              API_URL: this.props.navigation.getParam("API_URL", ""),
              setUserData: this.props.navigation.getParam("setUserData")
            })
          }
        />
      </View>
    );
  }
}
