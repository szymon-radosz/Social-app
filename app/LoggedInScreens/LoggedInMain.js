import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";
import BottomPanel from "./inc/BottomPanel";
import FindUsers from "./FindUsers/FindUsers";
import Auctions from "./Auctions/Auctions";
import Events from "./Events/Events";
import Profile from "./Profile/Profile";

export default class LoggedInMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFindUsers: true,
      openAuctions: false,
      openEvents: false,
      openProfile: false,
      API_URL: ""
    };

    this.openFindUsers = this.openFindUsers.bind(this);
    this.openAuctions = this.openAuctions.bind(this);
    this.openEvents = this.openEvents.bind(this);
    this.openProfile = this.openProfile.bind(this);
  }

  componentDidMount() {
    this.setState({ API_URL: this.props.navigation.getParam("API_URL") });
  }

  openFindUsers() {
    this.setState({
      openFindUsers: true,
      openAuctions: false,
      openEvents: false,
      openProfile: false
    });
  }

  openAuctions() {
    this.setState({
      openFindUsers: false,
      openAuctions: true,
      openEvents: false,
      openProfile: false
    });
  }

  openEvents() {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openEvents: true,
      openProfile: false
    });
  }

  openProfile() {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openEvents: false,
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
            user={this.props.navigation.getParam("user")[0]}
          />
        )}
        {this.state.openAuctions && (
          <Auctions API_URL={this.props.navigation.getParam("API_URL")} />
        )}
        {this.state.openEvents && (
          <Events API_URL={this.props.navigation.getParam("API_URL")} />
        )}
        {this.state.openProfile && (
          <Profile API_URL={this.props.navigation.getParam("API_URL")} />
        )}
        <BottomPanel
          openFindUsers={this.openFindUsers}
          openAuctions={this.openAuctions}
          openEvents={this.openEvents}
          openProfile={this.openProfile}
        />
      </View>
    );
  }
}
