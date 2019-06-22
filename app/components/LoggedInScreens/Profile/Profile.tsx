import React, { Component, Suspense } from "react";
import { Text, View } from "react-native";
import ProfileHeader from "./../SharedComponents/ProfileHeader";
import ProfileOptions from "./utils/ProfileOptions";
import UserFriendsList from "./utils/UserFriendsList";
import UserAuctionsList from "./utils/UserAuctionsList";
import axios from "axios";
import styles from "./style";

const UserPreview = React.lazy(() =>
  import("./../SharedComponents/UserPreview")
);

interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}

interface ProfileState {
  locationDetails: any;
  countFriends: number;
  showProfilePreview: boolean;
  showEditUserData: boolean;
  showAuctionHistory: boolean;
  showUserFriendsList: boolean;
  showUserFriendId: number;
  userFriendsList: any;
  userAuctionList: any;
}

interface ProfileProps {
  user: any;
  API_URL: string;
  showUserFriends: boolean;
  setOpenFindUsers: any;
  setOpenAuctions: any;
  navigation: any;
}

export default class Profile extends Component<
  ProfileProps,
  ProfileState,
  NavigationScreenInterface
> {
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
      userFriendsList: [],
      userAuctionList: []
    };
    this.getAmountOfFriends = this.getAmountOfFriends.bind(this);
    this.setShowProfilePreview = this.setShowProfilePreview.bind(this);
    this.loadUserFriendsList = this.loadUserFriendsList.bind(this);
    this.changeShowUserFriendsList = this.changeShowUserFriendsList.bind(this);
    this.getUserAuctionList = this.getUserAuctionList.bind(this);
    console.log(["profile", props]);
  }

  componentDidMount() {
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

  getUserAuctionList = (): void => {
    let that = this;

    axios
      .post(this.props.API_URL + "/api/loadUserProductList", {
        userId: this.props.user.id
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["loadUserProductList", response.data.result]);

          that.setState({
            userAuctionList: response.data.result,
            showAuctionHistory: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
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
      showAuctionHistory,
      userAuctionList
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
          locationString={this.props.user.location_string}
        />
        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showAuctionHistory && (
            <ProfileOptions
              setShowProfilePreview={this.setShowProfilePreview}
              loadUserFriendsList={this.loadUserFriendsList}
              getUserAuctionList={this.getUserAuctionList}
              navigation={this.props.navigation}
              user={this.props.user}
              API_URL={this.props.API_URL}
            />
          )}
        {showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showAuctionHistory && (
            <Suspense fallback={<Text>Wczytywanie...</Text>}>
              <UserPreview
                description={this.props.user.description}
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

        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          showAuctionHistory &&
          userAuctionList && (
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Text style={styles.optionHeader}>Wystawione przedmioty</Text>
              <UserAuctionsList
                userAuctionList={userAuctionList}
                loggedInUser={this.props.user.id}
                API_URL={this.props.API_URL}
                setOpenAuctions={this.props.setOpenAuctions}
              />
            </View>
          )}
      </View>
    );
  }
}
