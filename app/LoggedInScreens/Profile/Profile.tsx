import React, { Component } from "react";
import { Platform, Text, View, TouchableHighlight } from "react-native";
import ProfileHeader from "./utils/ProfileHeader";
import ProfileOptions from "./utils/ProfileOptions";
import styles from "./style";
import Geocode from "react-geocode";
import axios from "axios";

interface ProfileState {
  locationDetails: any;
  countFriends: number;
  showProfilePreview: boolean;
  showEditUserData: boolean;
  showFriendList: boolean;
  showAuctionHistory: boolean;
}

interface ProfileProps {
  user: any;
  API_URL: string;
}

export default class Profile extends Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      locationDetails: [],
      countFriends: 0,
      showProfilePreview: false,
      showEditUserData: false,
      showFriendList: false,
      showAuctionHistory: false
    };

    this.getUserLocationInfo = this.getUserLocationInfo.bind(this);
    this.getAmountOfFriends = this.getAmountOfFriends.bind(this);
    console.log(["profile", props]);
  }

  componentDidMount() {
    let that = this;

    this.getUserLocationInfo(
      this.props.user.lattitude,
      this.props.user.longitude
    );

    this.getAmountOfFriends(this.props.user.id);
  }

  getUserLocationInfo = (lattitude: number, longitude: number) => {
    let that = this;
    Geocode.fromLatLng(lattitude, longitude).then(
      (res: any) => {
        let addressObj;
        console.log(res.results[0]);
        if (
          res.results[0].address_components[2].long_name &&
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

          console.log(addressObj);
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
  };

  getAmountOfFriends = (id: number): void => {
    console.log(["id: ", id]);
    let that = this;

    axios
      .post(this.props.API_URL + "/api/countFriends", {
        userId: id
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(response.data);

          that.setState({ countFriends: response.data.result.countFriends });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        <ProfileHeader
          API_URL={this.props.API_URL}
          avatar={this.props.user.photo_path}
          name={this.props.user.name}
          cityDistrict={this.state.locationDetails.cityDistrict}
          city={this.state.locationDetails.city}
          age={this.props.user.age}
          countFriends={this.state.countFriends}
          countKids={this.props.user.kids.length}
        />
        <ProfileOptions />
      </View>
    );
  }
}
