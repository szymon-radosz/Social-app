import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";

export default class FindUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userVerified: 0
    };
  }

  componentDidMount() {
    let user = this.props.navigation.getParam("user");

    if (user.verified === 1) {
      console.log("user verified");
    } else {
      console.log("user not verified");
    }
  }

  render() {
    return (
      <View>
        <Text>E-mamy.pl FindUsers</Text>
      </View>
    );
  }
}
