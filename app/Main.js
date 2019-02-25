import React, { Component } from "react";
import BottomPanel from "./inc/BottomPanel";
import Welcome from "./Welcome/Welcome";
import { Platform, StyleSheet, Text, View } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userLoggedIn: false };
  }

  componentDidMount() {
    if (!this.state.userLoggedIn) {
      this.props.navigation.navigate("Welcome");
    } else {
      this.props.navigation.navigate("FindUsers");
    }
  }
  render() {
    return <View />;
  }
}
