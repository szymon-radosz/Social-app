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

  async componentDidMount() {
    console.log(["find users mount", this.props.user]);

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
        <Text style={styles.pageTitle}>
          Poznaj inne e-mamy w Twojej okolicy.
        </Text>

        <Text style={styles.pageSubTitle}>
          Możesz edytować swoje dane w zakładce "Profil".
        </Text>

        <View
          style={{
            flexWrap: "wrap",
            alignItems: "flex-start",
            flexDirection: "row"
          }}
        >
          {this.state.userList &&
            this.state.userList.map((user, i) => {
              //console.log(`${this.props.API_URL}/userPhotos/${user.photo_path}`);

              if (user.id != this.props.user.id) {
                return (
                  <UserOnList
                    API_URL={this.props.API_URL}
                    key={i}
                    user={user}
                    sender_id={this.props.user.id}
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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  pageTitle: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10
  },
  pageSubTitle: {
    textAlign: "center",
    color: "#333",
    fontWeight: "400",
    fontSize: 14,
    paddingBottom: 20
  }
});
