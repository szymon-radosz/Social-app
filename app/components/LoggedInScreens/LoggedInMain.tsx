import React, { Component } from "react";
import { View } from "react-native";
import styles from "./style";
import LoggedInScreens from "./utils/LoggedInScreens";
import BottomPanel from "./SharedComponents/BottomPanel";

interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}

interface LoggedInMainState {
  openFindUsers: boolean;
  openAuctions: boolean;
  openMessages: boolean;
  openProfile: boolean;
  openForum: boolean;
  openFindUserId: number;
  openAuctionId: number;
  openAuctionUserId: number;
}

export default class LoggedInMain extends Component<
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
      openForum: false,
      openFindUserId: 0,
      openAuctionId: 0,
      openAuctionUserId: 0
    };

    this.setOpenFindUsers = this.setOpenFindUsers.bind(this);
    this.setOpenAuctions = this.setOpenAuctions.bind(this);
    this.setOpenMessages = this.setOpenMessages.bind(this);
    this.setOpenForum = this.setOpenForum.bind(this);
    this.setOpenProfile = this.setOpenProfile.bind(this);
  }

  setOpenFindUsers = (id: number): void => {
    console.log(["setOpenFindUsers", id]);
    this.setState({
      openFindUsers: true,
      openAuctions: false,
      openMessages: false,
      openForum: false,
      openProfile: false,
      openFindUserId: id
    });
  };

  setOpenAuctions = (auctionId: number, auctionUserId: number): void => {
    console.log(["setOpenAuctions", auctionId, auctionUserId]);
    this.setState({
      openFindUsers: false,
      openAuctions: true,
      openMessages: false,
      openForum: false,
      openProfile: false,
      openAuctionId: auctionId,
      openAuctionUserId: auctionUserId
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
      openForum,
      openFindUserId,
      openAuctionId,
      openAuctionUserId
    } = this.state;
    return (
      <View style={styles.container}>
        <LoggedInScreens
          openFindUsers={openFindUsers}
          openAuctions={openAuctions}
          openMessages={openMessages}
          openProfile={openProfile}
          openForum={openForum}
          openFindUserId={openFindUserId}
          openAuctionId={openAuctionId}
          openAuctionUserId={openAuctionUserId}
          navigation={navigation}
          API_URL={navigation.getParam("API_URL")}
          user={navigation.getParam("user")}
          clearUserUnreadedMessages={navigation.getParam(
            "clearUserUnreadedMessages"
          )}
          setOpenMessages={this.setOpenMessages}
          setOpenProfile={this.setOpenProfile}
          setOpenFindUsers={this.setOpenFindUsers}
          setOpenAuctions={this.setOpenAuctions}
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
