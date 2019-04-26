import React, { Component } from "react";
import { Platform, Button, Text, View } from "react-native";
import styles from "./style";
import BottomPanel from "./inc/BottomPanel";
import FindUsers from "./FindUsers/FindUsers";
import Auctions from "./Auctions/Auctions";
import Messages from "./Messages/Messages";
import Forum from "./Forum/Forum";
import Profile from "./Profile/Profile";
import NavigationScreenInterface from "./../interfaces/NavigationScreenInterface";

interface LoggedInMainState {
  openFindUsers: boolean;
  openAuctions: boolean;
  openMessages: boolean;
  openProfile: boolean;
  openForum: boolean;
}

export default class FillNecessaryInfo extends Component<
  NavigationScreenInterface,
  LoggedInMainState
> {
  constructor(props: NavigationScreenInterface) {
    super(props);
    this.state = {
      openFindUsers: true,
      openAuctions: false,
      openMessages: false,
      openProfile: false,
      openForum: false
    };

    this.openFindUsers = this.openFindUsers.bind(this);
    this.openAuctions = this.openAuctions.bind(this);
    this.openMessages = this.openMessages.bind(this);
    this.openForum = this.openForum.bind(this);
    this.openProfile = this.openProfile.bind(this);
  }

  openFindUsers = (): void => {
    this.setState({
      openFindUsers: true,
      openAuctions: false,
      openMessages: false,
      openForum: false,
      openProfile: false
    });
  };

  openAuctions = (): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: true,
      openMessages: false,
      openForum: false,
      openProfile: false
    });
  };

  openMessages = (): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: true,
      openForum: false,
      openProfile: false
    });
  };

  openForum = (): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: false,
      openForum: true,
      openProfile: false
    });
  };

  openProfile = (): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: false,
      openForum: false,
      openProfile: true
    });
  };

  render() {
    const navigation = this.props.navigation;
    const {
      openFindUsers,
      openAuctions,
      openMessages,
      openProfile,
      openForum
    } = this.state;
    return (
      <View style={styles.container}>
        {openFindUsers && (
          <FindUsers
            API_URL={navigation.getParam("API_URL")}
            user={navigation.getParam("user")}
            openMessages={this.openMessages}
          />
        )}
        {openAuctions && (
          <Auctions
            API_URL={navigation.getParam("API_URL")}
            user={navigation.getParam("user")}
            openMessages={this.openMessages}
          />
        )}
        {openMessages && (
          <Messages
            API_URL={navigation.getParam("API_URL")}
            user={navigation.getParam("user")}
            clearUserUnreadedMessages={navigation.getParam(
              "clearUserUnreadedMessages"
            )}
          />
        )}
        {openForum && (
          <Forum
            API_URL={navigation.getParam("API_URL")}
            user={navigation.getParam("user")}
          />
        )}
        {openProfile && <Profile />}
        <BottomPanel
          openFindUsers={this.openFindUsers}
          openAuctions={this.openAuctions}
          openMessages={this.openMessages}
          openProfile={this.openProfile}
          openForum={this.openForum}
          user={navigation.getParam("user")}
        />
      </View>
    );
  }
}
