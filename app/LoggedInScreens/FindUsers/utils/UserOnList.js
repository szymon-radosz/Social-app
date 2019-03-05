import React, { Component } from "react";
import { Platform, StyleSheet, Button, Image, Text, View } from "react-native";
import axios from "axios";

export default class UserOnList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserDetails: false
    };

    this.changeShowUserDetails = this.changeShowUserDetails.bind(this);
  }

  changeShowUserDetails() {
    this.setState({ showUserDetails: !this.state.showUserDetails });
  }

  render() {
    if (this.state.showUserDetails) {
      return (
        <View>
          <Button title="X" onPress={() => this.changeShowUserDetails()} />
          <View>
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri: `${this.props.API_URL}userPhotos/${
                  this.props.user.photo_path
                }`
              }}
            />
            <Text>
              {this.props.user.name}, {this.props.user.age}
            </Text>
            {this.props.user.kids.length > 0 && <Text>Dziecko/Dzieci: </Text>}
            {this.props.user.kids.length > 0 &&
              this.props.user.kids.map(kid => {
                return (
                  <Text>
                    {kid.name} - {kid.date_of_birth}
                  </Text>
                );
              })}
            {this.props.user.hobbies.length > 0 && <Text>Hobby: </Text>}
            {this.props.user.hobbies.length > 0 &&
              this.props.user.hobbies.map(hobby => {
                return <Text>{hobby.name} </Text>;
              })}
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Image
            style={{ width: 50, height: 50 }}
            source={{
              uri: `${this.props.API_URL}userPhotos/${
                this.props.user.photo_path
              }`
            }}
          />
          <Text>
            {this.props.user.name}, {this.props.user.age}
          </Text>
          <Button
            title="Podgląd"
            onPress={() => this.changeShowUserDetails()}
          />
        </View>
      );
    }
  }
}
