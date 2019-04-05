import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export default class NotLoggedInMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: false,
      userData: [],
      alertSuccess: true,
      alertMessage: "dsds"
    };

    this.setUserData = this.setUserData.bind(this);
    this.checkUserStatus = this.checkUserStatus.bind(this);
    this.setUserFilledInfo = this.setUserFilledInfo.bind(this);
    this.clearUserUnreadedMessages = this.clearUserUnreadedMessages.bind(this);
  }

  setUserFilledInfo() {
    try {
      let userEmailName = this.state.userData.email;

      console.log(userEmailName);

      let formData = new FormData();
      formData.append("userEmail", userEmailName);

      axios
        .post(API_URL + "/api/setUserFilledInfo", formData)
        .then(async response => {
          console.log(response);

          await this.setState({ userData: response.data.user[0] });

          this.checkUserStatus();
        })
        .catch(function(error) {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async clearUserUnreadedMessages(userId, conversationId) {
    console.log(["clearUserUnreadedMessages", userId, conversationId]);

    try {
      let userEmailName = this.state.userData.email;

      console.log(userEmailName);

      let formData = new FormData();
      formData.append("userId", userId);
      formData.append("conversationId", conversationId);

      let that = this;

      axios
        .post(API_URL + "/api/setUserMessagesStatus", formData)
        .then(async response => {
          console.log(response);

          let newUserState = this.state.userData;

          newUserState.unreadedConversationMessage =
            response.data.userUnreadedMessages;
          newUserState.unreadedConversationMessageAmount =
            response.data.userUnreadedMessagesCount;

          await that.setState({ userData: newUserState });

          that.checkUserStatus();

          //await this.setState({ userData: response.data.user[0] });

          //this.checkUserStatus();
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

    console.log(this.state.userData);
  }

  checkUserStatus() {
    //console.log(["checkUserStatus", this.state.userData[0].verified]);
    //console.log(["checkUserStatus", this.state.userData.verified]);
    if (
      this.state.userData.verified === 1 &&
      this.state.userData.user_filled_info === 1
    ) {
      //console.log("verified");
      this.props.navigation.navigate("LoggedInMain", {
        user: this.state.userData,
        API_URL: API_URL,
        clearUserUnreadedMessages: this.clearUserUnreadedMessages
      });
    } else if (this.state.userData.verified === 0) {
      this.props.navigation.navigate("ConfirmAccount", {
        user: this.state.userData
      });
    } else if (
      this.state.userData.verified === 1 &&
      this.state.userData.user_filled_info === 0
    ) {
      this.props.navigation.navigate("FillNecessaryInfo", {
        user: this.state.userData,
        API_URL: API_URL,
        setUserFilledInfo: this.setUserFilledInfo
      });
    }
  }

  async setUserData(user) {
    console.log(user);
    await this.setState({ userData: user });

    //console.log(["App state", this.state]);

    this.checkUserStatus();
  }

  componentDidMount() {
    //console.log(["comp", this.state.userData]);
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
