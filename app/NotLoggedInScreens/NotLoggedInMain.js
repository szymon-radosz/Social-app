import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export default class NotLoggedInMain extends Component {
  constructor(props) {
    super(props);
    this.state = { userLoggedIn: false, userData: [] };

    this.setUserData = this.setUserData.bind(this);
    this.checkUserStatus = this.checkUserStatus.bind(this);
    this.setUserFilledInfo = this.setUserFilledInfo.bind(this);
  }

  setUserFilledInfo() {
    try {
      let userEmailName = this.state.userData[0].email;

      console.log(userEmailName);

      let formData = new FormData();
      formData.append("userEmail", userEmailName);

      axios
        .post(API_URL + "/api/setUserFilledInfo", formData)
        .then(async response => {
          console.log(response);

          await this.setState({ userData: response.data.user });

          this.checkUserStatus();
        })
        .catch(function(error) {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  checkUserStatus() {
    if (
      this.state.userData[0].verified === 1 &&
      this.state.userData[0].user_filled_info === 1
    ) {
      console.log("verified");
      this.props.navigation.navigate("LoggedInMain", {
        user: this.state.userData
      });
    } else if (this.state.userData[0].verified === 0) {
      this.props.navigation.navigate("ConfirmAccount", {
        user: this.state.userData
      });
    } else if (
      this.state.userData[0].verified === 1 &&
      this.state.userData[0].user_filled_info === 0
    ) {
      this.props.navigation.navigate("FillNecessaryInfo", {
        user: this.state.userData,
        API_URL: API_URL,
        setUserFilledInfo: this.setUserFilledInfo
      });
    }
  }

  async setUserData(user) {
    await this.setState({ userData: user });

    this.checkUserStatus();

    console.log(["App state", this.state]);
  }

  componentDidMount() {
    if (!this.state.userLoggedIn) {
      this.props.navigation.navigate("Welcome", {
        API_URL: API_URL,
        setUserData: this.setUserData
      });
    }
  }
  render() {
    return <View />;
  }
}
