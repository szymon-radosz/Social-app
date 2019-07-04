import React, { Component, Suspense } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ProfileHeader from "./../SharedComponents/ProfileHeader";
import ProfileOptions from "./utils/ProfileOptions";
import UserFriendsList from "./utils/UserFriendsList";
import UserAuctionsList from "./utils/UserAuctionsList";
import axios from "axios";
import PageHeader from "./../SharedComponents/PageHeader";
import UserNotificationList from "./utils/UserNotificationList";
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
  showPendingUserFriendsList: boolean;
  showUserNotificationList: boolean;
  showUserFriendId: number;
  userFriendsList: any;
  userAuctionList: any;
  userNotificationList: any;
  displayFriendList: boolean;
  userPendingFriendsList: any;
}

interface ProfileProps {
  user: any;
  API_URL: string;
  showUserFriends: boolean;
  setOpenFindUsers: any;
  setOpenAuctions: any;
  navigation: any;
  openMessages: any;
  openForum: any;
  clearUserData: any;
  clearUserNotificationsStatus: any;
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
      showPendingUserFriendsList: false,
      showUserNotificationList: false,
      showUserFriendId: 0,
      userNotificationList: [],
      userFriendsList: [],
      userPendingFriendsList: [],
      userAuctionList: [],
      displayFriendList: true
    };
    this.getAmountOfFriends = this.getAmountOfFriends.bind(this);
    this.setShowProfilePreview = this.setShowProfilePreview.bind(this);
    this.loadUserFriendsList = this.loadUserFriendsList.bind(this);
    this.loadPendingUserFriendsList = this.loadPendingUserFriendsList.bind(
      this
    );
    this.changeShowUserFriendsList = this.changeShowUserFriendsList.bind(this);
    this.getUserAuctionList = this.getUserAuctionList.bind(this);
    this.changeShowUserAuctionList = this.changeShowUserAuctionList.bind(this);
    this.getUserNotificationList = this.getUserNotificationList.bind(this);
    this.changeShowUserNotificationList = this.changeShowUserNotificationList.bind(
      this
    );
  }

  componentDidMount() {
    this.getAmountOfFriends(this.props.user.id);
  }

  changeShowUserNotificationList = (): void => {
    this.setState({
      showUserNotificationList: !this.state.showUserNotificationList
    });
  };

  changeShowUserAuctionList = (): void => {
    this.setState({ showAuctionHistory: !this.state.showAuctionHistory });
  };

  changeShowUserFriendsList = (): void => {
    this.setState({
      showUserFriendsList: false,
      showPendingUserFriendsList: false
    });
  };

  loadPendingUserFriendsList = (): void => {
    let userId = this.props.user.id;
    let that = this;

    axios
      .post(this.props.API_URL + "/api/pendingFriendsList", {
        userId: userId
      })
      .then(async function(response) {
        if (response.data.status === "OK") {
          console.log(["pendingFriendsList", response.data.result.friendsList]);

          await that.setState({
            userPendingFriendsList: response.data.result.friendsList,
            showPendingUserFriendsList: true,
            showUserFriendsList: false,
            showUserNotificationList: false,
            displayFriendList: false
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
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
            showUserFriendsList: true,
            showPendingUserFriendsList: false,
            showUserNotificationList: false,
            displayFriendList: true
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

  getUserNotificationList = (): void => {
    let id = this.props.user.id;
    let that = this;

    axios
      .post(this.props.API_URL + "/api/loadNotificationByUserId", {
        userId: id
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["loadNotificationByUserId", response.data]);

          that.setState({
            userNotificationList: response.data.result,
            showUserNotificationList: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .post(this.props.API_URL + "/api/clearNotificationByUserId", {
        userId: id
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["clearNotificationByUserId", response.data]);
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
      showPendingUserFriendsList,
      userFriendsList,
      userPendingFriendsList,
      showAuctionHistory,
      userAuctionList,
      showUserNotificationList,
      userNotificationList,
      displayFriendList
    } = this.state;
    return (
      <View>
        {/* user preview page header */}
        {showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList && (
            <PageHeader
              boldText={this.props.user.name}
              normalText={""}
              closeMethod={this.setShowProfilePreview}
              closeMethodParameter={""}
            />
          )}
        {/* user friends list page header */}
        {!showProfilePreview &&
          !showEditUserData &&
          (showUserFriendsList || showPendingUserFriendsList) &&
          !showAuctionHistory &&
          (userFriendsList || userPendingFriendsList) &&
          !showUserNotificationList && (
            <PageHeader
              boldText={"Moje znajome"}
              normalText={""}
              closeMethod={this.changeShowUserFriendsList}
              closeMethodParameter={""}
            />
          )}

        {/* user auction list page header */}
        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          showAuctionHistory &&
          userAuctionList &&
          !showUserNotificationList && (
            <PageHeader
              boldText={"Wystawione przedmioty"}
              normalText={""}
              closeMethod={this.changeShowUserAuctionList}
              closeMethodParameter={""}
            />
          )}
        {/* user notification list page header */}
        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          showUserNotificationList && (
            <PageHeader
              boldText={"Powiadomienia"}
              normalText={""}
              closeMethod={this.changeShowUserNotificationList}
              closeMethodParameter={""}
            />
          )}
        {!showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList && (
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
              showLogout={true}
              navigation={this.props.navigation}
              clearUserData={this.props.clearUserData}
            />
          )}
        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList && (
            <ProfileOptions
              setShowProfilePreview={this.setShowProfilePreview}
              loadUserFriendsList={this.loadUserFriendsList}
              getUserAuctionList={this.getUserAuctionList}
              getUserNotificationList={this.getUserNotificationList}
              navigation={this.props.navigation}
              user={this.props.user}
              API_URL={this.props.API_URL}
            />
          )}
        {showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList && (
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
          !showAuctionHistory &&
          (showUserFriendsList || showPendingUserFriendsList) &&
          !showUserNotificationList && (
            <View>
              <View style={styles.filterBtnContainer}>
                <View style={styles.singleButtonCol2Container}>
                  <TouchableOpacity
                    onPress={this.loadUserFriendsList}
                    style={
                      displayFriendList
                        ? styles.filterBtnActive
                        : styles.filterBtn
                    }
                  >
                    <Text
                      style={
                        displayFriendList
                          ? styles.filterBtnTextActive
                          : styles.filterBtnText
                      }
                    >
                      Znajome
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.singleButtonCol2Container}>
                  <TouchableOpacity
                    onPress={this.loadPendingUserFriendsList}
                    style={
                      !displayFriendList
                        ? styles.filterBtnActive
                        : styles.filterBtn
                    }
                  >
                    <Text
                      style={
                        !displayFriendList
                          ? styles.filterBtnTextActive
                          : styles.filterBtnText
                      }
                    >
                      Oczekujące
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

        {!showProfilePreview &&
          !showEditUserData &&
          showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList &&
          userFriendsList && (
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
              {userFriendsList.length > 0 ? (
                <UserFriendsList
                  userFriendsList={userFriendsList}
                  loggedInUser={this.props.user.id}
                  API_URL={this.props.API_URL}
                  setOpenFindUsers={this.props.setOpenFindUsers}
                />
              ) : (
                <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                  Brak wyników. Zaproś inne mamy z Twojej okolicy do znajomych.
                </Text>
              )}
            </View>
          )}

        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList &&
          userPendingFriendsList && (
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
              {userPendingFriendsList.length > 0 ? (
                <UserFriendsList
                  userFriendsList={userPendingFriendsList}
                  loggedInUser={this.props.user.id}
                  API_URL={this.props.API_URL}
                  setOpenFindUsers={this.props.setOpenFindUsers}
                />
              ) : (
                <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                  Brak wyników. Zaproś inne mamy z Twojej okolicy do znajomych.
                </Text>
              )}
            </View>
          )}

        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          showAuctionHistory &&
          !showUserNotificationList &&
          userAuctionList && (
            <View style={{ padding: 10 }}>
              {userAuctionList.length > 0 ? (
                <UserAuctionsList
                  userAuctionList={userAuctionList}
                  loggedInUser={this.props.user.id}
                  API_URL={this.props.API_URL}
                  setOpenAuctions={this.props.setOpenAuctions}
                />
              ) : (
                <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                  Brak wyników. Dodaj nieużywane przedmioty w zakładce 'Targ' i
                  uzgodnij szczegóły z innymi użytkowniczkami w wiadomościach.
                </Text>
              )}
            </View>
          )}

        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          showUserNotificationList &&
          userNotificationList && (
            <View style={{ padding: 10 }}>
              {userNotificationList.length > 0 ? (
                <UserNotificationList
                  openMessages={this.props.openMessages}
                  userNotificationList={userNotificationList}
                  loadUserFriendsList={this.loadUserFriendsList}
                  openForum={this.props.openForum}
                  userId={this.props.user.id}
                  clearUserNotificationsStatus={
                    this.props.clearUserNotificationsStatus
                  }
                />
              ) : (
                <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                  Brak wyników.
                </Text>
              )}
            </View>
          )}
      </View>
    );
  }
}
