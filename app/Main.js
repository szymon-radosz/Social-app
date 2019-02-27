import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const API_URL = "http://127.0.0.1:8000/";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userLoggedIn: false, userData: [] };

    this.setUserData = this.setUserData.bind(this);
  }

  async setUserData(user) {
    await this.setState({ userData: user });

    if (user.email_token) {
      if (this.state.userData.verified === 1) {
        this.props.navigation.navigate("FindUsers", {
          user: this.state.userData
        });
      } else {
        this.props.navigation.navigate("ConfirmAccount", {
          user: this.state.userData
        });
      }
    }

    console.log(["App state", this.state]);
  }

  componentDidMount() {
    if (!this.state.userLoggedIn) {
      this.props.navigation.navigate("Welcome", {
        API_URL: API_URL,
        setUserData: this.setUserData
      });
    } else {
      this.props.navigation.navigate("RedirectAuth", {
        API_URL: API_URL,
        setUserData: this.setUserData
      });
    }
  }
  render() {
    return <View />;
  }
}
