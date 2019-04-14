import React, { Component } from "react";
import { Platform, StyleSheet, Button, Image, Text, View } from "react-native";
import axios from "axios";
import UserOnList from "./utils/UserOnList";
import { v4 as uuid } from "uuid";
import styles from "./style";

interface FindUsersState {
  userList: any;
}

interface FindUsersProps {
  API_URL: string;
  user: {
    id: number;
    lattitude: number;
    longitude: number;
  };
  openMessages: any;
}

export default class FindUsers extends Component<
  FindUsersProps,
  FindUsersState
> {
  constructor(props: FindUsersProps) {
    super(props);
    this.state = {
      userList: []
    };

    this.loadUsersNearCoords = this.loadUsersNearCoords.bind(this);
  }

  componentDidMount = (): void => {
    console.log(["find users mount", this.props.user]);

    if (
      this.props.user &&
      this.props.user.lattitude &&
      this.props.user.longitude
    ) {
      this.loadUsersNearCoords();
    }
    //this.loadUsersNearCoords();
  };

  loadUsersNearCoords = (): void => {
    try {
      let API_URL = this.props.API_URL;
      let lat = this.props.user.lattitude;
      let lng = this.props.user.longitude;

      let that = this;

      axios
        .post(API_URL + "/api/loadUsersNearCoords", {
          lat: lat,
          lng: lng
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            console.log(response.data);

            that.setState({ userList: response.data.result });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { userList } = this.state;
    return (
      <View>
        <Text style={styles.pageTitle}>
          Poznaj inne e-mamy w Twojej okolicy.
        </Text>

        <Text style={styles.pageSubTitle}>
          Możesz edytować swoje dane w zakładce "Profil".
        </Text>

        <View style={styles.container}>
          {userList &&
            userList.map((user: any, i: number) => {
              //console.log(`${this.props.API_URL}/userPhotos/${user.photo_path}`);

              if (user.id != this.props.user.id) {
                return (
                  <UserOnList
                    API_URL={this.props.API_URL}
                    key={uuid()}
                    user={user}
                    senderId={this.props.user.id}
                    openMessages={this.props.openMessages}
                  />
                );
              }
            })}
        </View>
      </View>
    );
  }
}
