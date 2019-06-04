import React, { Component, Suspense } from "react";
import { Text, View } from "react-native";
import ProfileHeader from "./utils/ProfileHeader";
import ProfileOptions from "./utils/ProfileOptions";
import UserFriendsList from "./utils/UserFriendsList";
import Geocode from "react-geocode";
import axios from "axios";
import styles from "./style";

const UserPreview = React.lazy(() => import("./utils/UserPreview"));

interface ProfileState {
  locationDetails: any;
  countFriends: number;
  showProfilePreview: boolean;
  showEditUserData: boolean;
  showAuctionHistory: boolean;
  showUserFriendsList: boolean;
  showUserFriendId: number;
  userFriendsList: any;
}

interface ProfileProps {
  user: any;
  API_URL: string;
  showUserFriends: boolean;
  setOpenFindUsers: any;
}

export default class Profile extends Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      locationDetails: [],
      countFriends: 0,
      showProfilePreview: false,
      showEditUserData: false,
      showAuctionHistory: false,
      showUserFriendsList: false,
      showUserFriendId: 0,
      userFriendsList: []
    };

    this.getUserLocationInfo = this.getUserLocationInfo.bind(this);
    this.getAmountOfFriends = this.getAmountOfFriends.bind(this);
    this.setShowProfilePreview = this.setShowProfilePreview.bind(this);
    this.loadUserFriendsList = this.loadUserFriendsList.bind(this);
    this.changeShowUserFriendsList = this.changeShowUserFriendsList.bind(this);
    console.log(["profile", props]);
  }

  componentDidMount() {
    console.log("this.props.showUserFriends", this.props.showUserFriends);
    this.getUserLocationInfo(
      this.props.user.lattitude,
      this.props.user.longitude
    );

    this.getAmountOfFriends(this.props.user.id);
  }

  changeShowUserFriendsList = (): void => {
    this.setState({ showUserFriendsList: !this.state.showUserFriendsList });
  };

  loadUserFriendsList = (): void => {
    let userId = this.props.user.id;
    let that = this;

    axios
      .post(this.props.API_URL + "/api/friendsList", {
        userId: userId
      })
      .then(async function(response) {
        if (response.data.status === "OK") {
          console.log(["friendsList", response.data.result.friendsList]);

          await that.setState({
            userFriendsList: response.data.result.friendsList,
            showUserFriendsList: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  setShowProfilePreview = (): void => {
    this.setState({ showProfilePreview: !this.state.showProfilePreview });
    console.log("setShowProfilePreview");
  };

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
    const {
      locationDetails,
      countFriends,
      showProfilePreview,
      showEditUserData,
      showUserFriendsList,
      userFriendsList,
      showAuctionHistory
    } = this.state;
    return (
      <View>
        <ProfileHeader
          API_URL={this.props.API_URL}
          avatar={this.props.user.photo_path}
          name={this.props.user.name}
          cityDistrict={locationDetails.cityDistrict}
          city={locationDetails.city}
          age={this.props.user.age}
          countFriends={countFriends}
          countKids={this.props.user.kids.length}
        />
        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showAuctionHistory && (
            <ProfileOptions
              setShowProfilePreview={this.setShowProfilePreview}
              loadUserFriendsList={this.loadUserFriendsList}
            />
          )}
        {showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showAuctionHistory && (
            <Suspense fallback={<Text>Wczytywanie...</Text>}>
              <UserPreview
                hobbies={this.props.user.hobbies}
                kids={this.props.user.kids}
              />
            </Suspense>
          )}
        {!showProfilePreview &&
          !showEditUserData &&
          showUserFriendsList &&
          !showAuctionHistory &&
          userFriendsList && (
            <View>
              <Text style={styles.optionHeader}>Moje znajome</Text>
              <UserFriendsList
                userFriendsList={userFriendsList}
                loggedInUser={this.props.user.id}
                API_URL={this.props.API_URL}
                setOpenFindUsers={this.props.setOpenFindUsers}
              />
            </View>
          )}
      </View>
    );
  }
}
