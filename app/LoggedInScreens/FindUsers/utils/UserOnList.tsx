import React, { Component } from "react";
import { Image, Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";
import Alert from "./../../../Alert/Alert";
import Geocode from "react-geocode";
import rightArrowBlack from "./../../../assets/images/rightArrowBlack.png";

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

  componentDidMount() {
    let that = this;

    Geocode.fromLatLng(
      this.props.user.lattitude,
      this.props.user.longitude
    ).then(
      (res: any) => {
        let addressObj;
        console.log(res.results[0]);
        if (
          res.results[0].address_components[2] &&
          res.results[0].address_components[2].long_name &&
          res.results[0].address_components[3] &&
          res.results[0].address_components[3].long_name
        ) {
          console.log([
            "addressObj",
            res.results[0].address_components[2].long_name,
            res.results[0].address_components[3].long_name
          ]);
          let cityDistrict = res.results[0].address_components[2].long_name;
          let city = res.results[0].address_components[3].long_name;

          addressObj = {
            cityDistrict: cityDistrict,
            city: city
          };

          //console.log(addressObj);
        } else {
          addressObj = {
            notFoundFullName: res.results[0].formatted_address
          };
        }

        that.setState({ locationDetails: addressObj });
      },
      (error: any) => {
        console.error(error);
      }
    );
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
                      {locationDetails.cityDistrict}
                      {", "}
                      {locationDetails.city}
                    </Text>
                  )}
                </View>
              </View>
              <TouchableHighlight
                onPress={() => {
                  this.props.setShowUserDetails(this.props.user.id);
                  this.props.setUserDetailsId(this.props.user.id);
                }}
              >
                <Image
                  style={{
                    height: 20,
                    resizeMode: "contain",
                    justifyContent: "flex-start"
                  }}
                  source={rightArrowBlack}
                />
              </TouchableHighlight>
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
