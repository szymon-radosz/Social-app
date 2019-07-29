import React, { Component, Suspense } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ProfileHeader from "./../SharedComponents/ProfileHeader";
import ProfileOptions from "./utils/ProfileOptions";
import UserFriendsList from "./utils/UserFriendsList";
import UserAuctionsList from "./utils/UserAuctionsList";
import About from "./utils/About";
import axios from "axios";
import PageHeader from "./../SharedComponents/PageHeader";
import UserNotificationList from "./utils/UserNotificationList";
import styles from "./style";
import { GlobalContext } from "./../../Context/GlobalContext";

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
  showAbout: boolean;
  showUserFriendId: number;
  userFriendsList: any;
  userAuctionList: any;
  userNotificationList: any;
  displayFriendList: boolean;
  userPendingFriendsList: any;
  userHobbies: any;
}

interface ProfileProps {
  showUserFriends: boolean;
  setOpenFindUsers: any;
  setOpenAuctions: any;
  navigation: any;
  openMessages: any;
  openForum: any;
  setShowFeedbackModal: any;
}

class Profile extends Component<
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
      showAbout: false,
      showUserFriendId: 0,
      userNotificationList: [],
      userFriendsList: [],
      userPendingFriendsList: [],
      userAuctionList: [],
      userHobbies: [],
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
    this.setShowAbout = this.setShowAbout.bind(this);
  }

  componentDidMount() {
    if (this.context.userData) {
      this.getAmountOfFriends(this.context.userData.id);
    }
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
    let userId = this.context.userData.id;
    let that = this;

    if (userId) {
      axios
        .post(this.context.API_URL + "/api/pendingFriendsList", {
          userId: userId
        })
        .then(async function(response) {
          if (response.data.status === "OK") {
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
          that.context.setAlert(
            true,
            "danger",
            "Wystąpił błąd z wyświetleniem listy znajomych."
          );
        });
    }
  };

  loadUserFriendsList = (): void => {
    let userId = this.context.userData.id;
    let that = this;

    if (userId) {
      axios
        .post(this.context.API_URL + "/api/friendsList", {
          userId: userId
        })
        .then(async function(response) {
          if (response.data.status === "OK") {
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
          that.context.setAlert(
            true,
            "danger",
            "Wystąpił błąd z wyświetleniem listy znajomych."
          );
        });
    }
  };

  setShowAbout = (): void => {
    this.setState({ showAbout: !this.state.showAbout });
  };

  setShowProfilePreview = (): void => {
    this.setState({ showProfilePreview: !this.state.showProfilePreview });
  };

  getUserAuctionList = (): void => {
    let that = this;

    axios
      .post(this.context.API_URL + "/api/loadUserProductList", {
        userId: this.context.userData.id
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({
            userAuctionList: response.data.result,
            showAuctionHistory: true
          });
        }
      })
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Wystąpił błąd z wyświetleniem listy przedmiotów."
        );
      });
  };

  getAmountOfFriends = (id: number): void => {
    let that = this;

    axios
      .post(this.context.API_URL + "/api/countFriends", {
        userId: id
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({ countFriends: response.data.result.countFriends });
        }
      })
      .catch(function(error) {});
  };

  getUserNotificationList = (): void => {
    let id = this.context.userData.id;
    let that = this;

    if (id) {
      axios
        .post(this.context.API_URL + "/api/loadNotificationByUserId", {
          userId: id
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            that.setState({
              userNotificationList: response.data.result,
              showUserNotificationList: true
            });
          }
        })
        .catch(function(error) {
          that.context.setAlert(
            true,
            "danger",
            "Wystąpił błąd z wyświetleniem listy powiadomień."
          );
        });

      axios.post(this.context.API_URL + "/api/clearNotificationByUserId", {
        userId: id
      });
    }
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
      showAbout,
      displayFriendList
    } = this.state;
    return (
      <View data-test="ProfileContainer">
        {/* user preview page header */}
        {showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList &&
          !showAbout && (
            <PageHeader
              boldText={this.context.userData.name}
              normalText={""}
              closeMethod={this.setShowProfilePreview}
              closeMethodParameter={""}
              data-test="PageHeader"
            />
          )}
        {/* user friends list page header */}
        {!showProfilePreview &&
          !showEditUserData &&
          (showUserFriendsList || showPendingUserFriendsList) &&
          !showAuctionHistory &&
          (userFriendsList || userPendingFriendsList) &&
          !showUserNotificationList &&
          !showAbout && (
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
          !showUserNotificationList &&
          !showAbout && (
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
          showUserNotificationList &&
          !showAbout && (
            <PageHeader
              boldText={"Powiadomienia"}
              normalText={""}
              closeMethod={this.changeShowUserNotificationList}
              closeMethodParameter={""}
            />
          )}
        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList &&
          showAbout && (
            <PageHeader
              boldText={"O aplikacji"}
              normalText={""}
              closeMethod={this.setShowAbout}
              closeMethodParameter={""}
            />
          )}
        {!showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList &&
          !showAbout && (
            <ProfileHeader
              API_URL={this.context.API_URL}
              avatar={this.context.userData.photo_path}
              name={this.context.userData.name}
              cityDistrict={locationDetails.cityDistrict}
              city={locationDetails.city}
              age={this.context.userData.age}
              countFriends={countFriends}
              countKids={this.context.userData.kids.length}
              locationString={this.context.userData.location_string}
              showLogout={true}
              navigation={this.props.navigation}
            />
          )}
        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList &&
          !showAbout && (
            <ProfileOptions
              setShowProfilePreview={this.setShowProfilePreview}
              loadUserFriendsList={this.loadUserFriendsList}
              getUserAuctionList={this.getUserAuctionList}
              getUserNotificationList={this.getUserNotificationList}
              setShowAbout={this.setShowAbout}
              navigation={this.props.navigation}
              user={this.context.userData}
              API_URL={this.context.API_URL}
            />
          )}
        {showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList &&
          !showAbout && (
            <Suspense fallback={<Text>Wczytywanie...</Text>}>
              <UserPreview
                description={this.context.userData.description}
                hobbies={this.context.userData.hobbies}
                kids={this.context.userData.kids}
              />
            </Suspense>
          )}

        {!showProfilePreview &&
          !showEditUserData &&
          !showAuctionHistory &&
          (showUserFriendsList || showPendingUserFriendsList) &&
          !showUserNotificationList &&
          !showAbout && (
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
          !showAbout &&
          userFriendsList && (
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
              {userFriendsList.length > 0 ? (
                <UserFriendsList
                  userFriendsList={userFriendsList}
                  loggedInUser={this.context.userData.id}
                  API_URL={this.context.API_URL}
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
          !showAbout &&
          userPendingFriendsList && (
            <View style={{ paddingTop: 10, paddingBottom: 10 }}>
              {userPendingFriendsList.length > 0 ? (
                <UserFriendsList
                  userFriendsList={userPendingFriendsList}
                  loggedInUser={this.context.userData.id}
                  API_URL={this.context.API_URL}
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
          !showAbout &&
          userAuctionList && (
            <React.Fragment>
              <View style={{ paddingTop: 10 }} />
              {userAuctionList.length > 0 ? (
                <UserAuctionsList
                  userAuctionList={userAuctionList}
                  loggedInUser={this.context.userData.id}
                  API_URL={this.context.API_URL}
                  setOpenAuctions={this.props.setOpenAuctions}
                />
              ) : (
                <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                  Brak wyników. Dodaj nieużywane przedmioty w zakładce 'Targ' i
                  uzgodnij szczegóły z innymi użytkowniczkami w wiadomościach.
                </Text>
              )}
            </React.Fragment>
          )}

        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          showUserNotificationList &&
          userNotificationList &&
          !showAbout && (
            <View style={{ padding: 10 }}>
              {userNotificationList.length > 0 ? (
                <UserNotificationList
                  openMessages={this.props.openMessages}
                  userNotificationList={userNotificationList}
                  loadUserFriendsList={this.loadUserFriendsList}
                  openForum={this.props.openForum}
                />
              ) : (
                <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                  Brak wyników.
                </Text>
              )}
            </View>
          )}

        {!showProfilePreview &&
          !showEditUserData &&
          !showUserFriendsList &&
          !showPendingUserFriendsList &&
          !showAuctionHistory &&
          !showUserNotificationList &&
          showAbout && (
            <Suspense fallback={<Text>Wczytywanie...</Text>}>
              <About setShowFeedbackModal={this.props.setShowFeedbackModal} />
            </Suspense>
          )}
      </View>
    );
  }
}
Profile.contextType = GlobalContext;
export default Profile;
