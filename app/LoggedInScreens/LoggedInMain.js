import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";
import BottomPanel from "./inc/BottomPanel";
import FindUsers from "./FindUsers/FindUsers";
import Auctions from "./Auctions/Auctions";
import Messages from "./Messages/Messages";
import Forum from "./Forum/Forum";
import Profile from "./Profile/Profile";

export default class LoggedInMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFindUsers: true,
      openAuctions: false,
      openMessages: false,
      openProfile: false,
      openForum: false,
      API_URL: ""
    };

    this.openFindUsers = this.openFindUsers.bind(this);
    this.openAuctions = this.openAuctions.bind(this);
    this.openMessages = this.openMessages.bind(this);
    this.openForum = this.openForum.bind(this);
    this.openProfile = this.openProfile.bind(this);
  }

  componentDidMount() {
    this.setState({ API_URL: this.props.navigation.getParam("API_URL") });
  }

  openFindUsers() {
    this.setState({
      openFindUsers: true,
      openAuctions: false,
      openMessages: false,
      openForum: false,
      openProfile: false
    });
  }

  openAuctions() {
    this.setState({
      openFindUsers: false,
      openAuctions: true,
      openMessages: false,
      openForum: false,
      openProfile: false
    });
  }

  openMessages() {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: true,
      openForum: false,
      openProfile: false
    });
  }

  openForum() {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: false,
      openForum: true,
      openProfile: false
    });
  }

  openProfile() {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: false,
      openForum: false,
      openProfile: true
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        {this.state.openFindUsers && (
          <FindUsers
            API_URL={this.props.navigation.getParam("API_URL")}
            user={this.props.navigation.getParam("user")}
          />
        )}
        {this.state.openAuctions && (
          <Auctions API_URL={this.props.navigation.getParam("API_URL")} />
        )}
        {this.state.openMessages && (
          <Messages API_URL={this.props.navigation.getParam("API_URL")} />
        )}
        {this.state.openForum && (
          <Forum API_URL={this.props.navigation.getParam("API_URL")} />
        )}
        {this.state.openProfile && (
          <Profile API_URL={this.props.navigation.getParam("API_URL")} />
        )}
        <BottomPanel
          openFindUsers={this.openFindUsers}
          openAuctions={this.openAuctions}
          openMessages={this.openMessages}
          openProfile={this.openProfile}
          openForum={this.openForum}
          user={this.props.navigation.getParam("user")}
        />
      </View>
    );
  }
}
