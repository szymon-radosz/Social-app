import React, { Component } from "react";
import { Platform, StyleSheet, Button, Image, Text, View } from "react-native";
import axios from "axios";
import UserOnList from "./utils/UserOnList";

export default class FindUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    };

    this.loadUsersNearCoords = this.loadUsersNearCoords.bind(this);
  }

  componentDidMount() {
    //console.log(this.props.user);

    if (
      this.props.user &&
      this.props.user.lattitude &&
      this.props.user.longitude
    ) {
      this.loadUsersNearCoords();
    }
    //this.loadUsersNearCoords();
  }

  loadUsersNearCoords() {
    try {
      let API_URL = this.props.API_URL;
      let lat = this.props.user.lattitude;
      let lng = this.props.user.longitude;

      let self = this;

      axios
        .post(API_URL + "/api/loadUsersNearCoords", {
          lat: lat,
          lng: lng
        })
        .then(function(response) {
          console.log(response.data);

          self.setState({ userList: response.data.userList });
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View>
        <Text>
          Poznaj inne e-mamy w Twojej okolicy. Możesz edytować swoje dane w
          zakładce "Profil".
        </Text>

        {this.state.userList &&
          this.state.userList.map(user => {
            console.log(`${this.props.API_URL}/userPhotos/${user.photo_path}`);
            return <UserOnList API_URL={this.props.API_URL} user={user} />;
          })}
      </View>
    );
  }
}
