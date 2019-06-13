import React, { Component } from "react";
import { Image, Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";
import Alert from "./../../../../Alert/Alert";

interface UserOnListState {
  locationDetails: any;
}

interface UserOnListProps {
  setUserDetailsId: any;
  user: {
    id: number;
    photo_path: string;
    name: string;
    age: string;
    kids: any;
    hobbies: any;
    lattitude: number;
    longitude: number;
    location_string: string;
  };
  API_URL: string;
  senderId: number;
  openMessages: any;
  setShowUserDetails: any;
  alertMessage: string;
  alertType: string;
}

export default class UserOnList extends Component<
  UserOnListProps,
  UserOnListState
> {
  constructor(props: UserOnListProps) {
    super(props);
    this.state = {
      locationDetails: []
    };
  }

  render() {
    const { locationDetails } = this.state;
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.setShowUserDetails(this.props.user.id);
          this.props.setUserDetailsId(this.props.user.id);
        }}
      >
        <View style={styles.userListContainer}>
          <View style={styles.userListSingleUserContainer}>
            <Image
              style={styles.userListSingleUserImage}
              source={{
                uri: `${this.props.API_URL}userPhotos/${
                  this.props.user.photo_path
                }`
              }}
            />
            <View style={styles.userListTextContainer}>
              <View>
                <Text style={styles.userListText}>
                  {this.props.user.name}, {this.props.user.age}
                </Text>
                <View>
                  {locationDetails.cityDistrict && locationDetails.city && (
                    <Text style={styles.userTextLocation}>
                      {this.props.user.location_string}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            {this.props.alertMessage != "" && (
              <Alert
                alertType={this.props.alertType}
                alertMessage={this.props.alertMessage}
              />
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
