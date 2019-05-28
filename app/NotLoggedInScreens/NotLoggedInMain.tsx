import React, { Component } from "react";
import { View } from "react-native";
import axios from "axios";
import NavigationScreenInterface from "./../interfaces/NavigationScreenInterface";

const API_URL = "http://127.0.0.1:8000/";

interface NotLoggedInMainState {
  userLoggedIn: boolean;
  userData: any;
  alertSuccess: boolean;
  alertMessage: string;
}

export default class NotLoggedInMain extends Component<
  NavigationScreenInterface,
  NotLoggedInMainState
> {
  constructor(props: NavigationScreenInterface) {
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

  setUserFilledInfo = (): void => {
    try {
      let userEmailName = this.state.userData.email;

      console.log(userEmailName);

      let that = this;

      axios
        .post(API_URL + "/api/setUserFilledInfo", {
          userEmail: userEmailName
        })
        .then(async response => {
          if (response.data.status === "OK") {
            console.log(response);

            await that.setState({ userData: response.data.result[0] });

            that.checkUserStatus();
          }
        })
        .catch(function(error) {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  clearUserUnreadedMessages = async (
    userId: number,
    conversationId: number
  ) => {
    //console.log(["clearUserUnreadedMessages", userId, conversationId]);

    //const { userData } = this.state;

    try {
      const { userData } = this.state;
      //let userEmailName = userData.email;

      //console.log(userEmailName);

      let that = this;

      axios
        .post(API_URL + "/api/setUserMessagesStatus", {
          userId: userId,
          conversationId: conversationId
        })
        .then(async response => {
          if (response.data.status === "OK") {
            console.log(response);

            let newUserState = userData;

            newUserState.unreadedConversationMessage =
              response.data.result.userUnreadedMessages;
            newUserState.unreadedConversationMessageAmount =
              response.data.result.userUnreadedMessagesCount;

            await that.setState({ userData: newUserState });

            that.checkUserStatus();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

    //console.log(this.state.userData);
  };

  checkUserStatus = (): void => {
    const navigation = this.props.navigation;
    const { userData } = this.state;

    if (userData.verified === 1 && userData.user_filled_info === 1) {
      //console.log("verified");
      navigation.navigate("LoggedInMain", {
        user: userData,
        API_URL: API_URL,
        clearUserUnreadedMessages: this.clearUserUnreadedMessages
      });
    } else if (userData.verified === 0) {
      navigation.navigate("ConfirmAccount", {
        user: userData
      });
    } else if (userData.verified === 1 && userData.user_filled_info === 0) {
      navigation.navigate("FillNecessaryInfo", {
        user: userData,
        API_URL: API_URL,
        setUserFilledInfo: this.setUserFilledInfo
      });
    }
  };

  setUserData = async (user: any) => {
    //console.log(user);
    await this.setState({ userData: user });

    //console.log(["App state", this.state]);

    this.checkUserStatus();
  };

  componentDidMount = (): void => {
    const navigation = this.props.navigation;
    if (!this.state.userLoggedIn) {
      navigation.navigate("Welcome", {
        API_URL: API_URL,
        setUserData: this.setUserData
      });
    }
  };
  render() {
    return <View />;
  }
}
