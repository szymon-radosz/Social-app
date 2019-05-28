import React, { Component } from "react";
import { Platform, View } from "react-native";
import styles from "./style";
import LoggedInScreens from "./utils/LoggedInScreens";
import BottomPanel from "./inc/BottomPanel";

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

    this.setOpenFindUsers = this.setOpenFindUsers.bind(this);
    this.setOpenAuctions = this.setOpenAuctions.bind(this);
    this.setOpenMessages = this.setOpenMessages.bind(this);
    this.setOpenForum = this.setOpenForum.bind(this);
    this.setOpenProfile = this.setOpenProfile.bind(this);
  }

  setOpenFindUsers = (): void => {
    this.setState({
      openFindUsers: true,
      openAuctions: false,
      openMessages: false,
      openForum: false,
      openProfile: false
    });
  };

  setOpenAuctions = (): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: true,
      openMessages: false,
      openForum: false,
      openProfile: false
    });
  };

  setOpenMessages = (): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: true,
      openForum: false,
      openProfile: false
    });
  };

  setOpenForum = (): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: false,
      openForum: true,
      openProfile: false
    });
  };

  setOpenProfile = (): void => {
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
        <LoggedInScreens
          openFindUsers={openFindUsers}
          openAuctions={openAuctions}
          openMessages={openMessages}
          openProfile={openProfile}
          openForum={openForum}
          API_URL={navigation.getParam("API_URL")}
          user={navigation.getParam("user")}
          clearUserUnreadedMessages={navigation.getParam(
            "clearUserUnreadedMessages"
          )}
          setOpenMessages={this.setOpenMessages}
        />
        <BottomPanel
          openFindUsers={this.setOpenFindUsers}
          openAuctions={this.setOpenAuctions}
          openMessages={this.setOpenMessages}
          openProfile={this.setOpenProfile}
          openForum={this.setOpenForum}
          user={navigation.getParam("user")}
        />
      </View>
    );
  }
}
