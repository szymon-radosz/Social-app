import React, { Component, Suspense } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import ProfileHeader from "./../SharedComponents/ProfileHeader";
import ProfileOptions from "./utils/ProfileOptions";
import UserAuctionsList from "./utils/UserAuctionsList";
import About from "./utils/About";
import axios from "axios";
import PageHeader from "./../SharedComponents/PageHeader";
import styles from "./style";
import BottomPanel from "./../SharedComponents/BottomPanel";
import Alert from "./../../../Alert/Alert";
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
  showAbout: boolean;
  showUserFriendId: number;
  userAuctionList: any;
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
      showAbout: false,
      showUserFriendId: 0,
      userAuctionList: [],
      userHobbies: []
    };
    this.getAmountOfFriends = this.getAmountOfFriends.bind(this);
    this.setShowProfilePreview = this.setShowProfilePreview.bind(this);

    this.getUserAuctionList = this.getUserAuctionList.bind(this);
    this.changeShowUserAuctionList = this.changeShowUserAuctionList.bind(this);

    this.setShowAbout = this.setShowAbout.bind(this);

    console.log(["profile", this.props]);
  }

  componentDidMount() {
    console.log(this.context);
    if (this.context.userData) {
      this.getAmountOfFriends(this.context.userData.id);
    }
  }

  changeShowUserAuctionList = (): void => {
    this.setState({ showAuctionHistory: !this.state.showAuctionHistory });
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

  render() {
    const {
      locationDetails,
      countFriends,
      showProfilePreview,
      showEditUserData,
      showAuctionHistory,
      userAuctionList,
      showAbout
    } = this.state;
    return (
      <React.Fragment>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff"
          }}
        >
          {this.context.showAlert && (
            <Alert
              alertType={this.context.alertType}
              alertMessage={this.context.alertMessage}
              closeAlert={this.context.closeAlert}
            />
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
            data-test="ProfileContainer"
          >
            <ScrollView>
              {/* user preview page header */}
              {showProfilePreview &&
                !showEditUserData &&
                !showAuctionHistory &&
                !showAbout && (
                  <PageHeader
                    boldText={this.context.userData.name}
                    normalText={""}
                    closeMethod={this.setShowProfilePreview}
                    closeMethodParameter={""}
                    data-test="PageHeader"
                  />
                )}

              {/* user auction list page header */}
              {!showProfilePreview &&
                !showEditUserData &&
                showAuctionHistory &&
                userAuctionList &&
                !showAbout && (
                  <PageHeader
                    boldText={"Wystawione przedmioty"}
                    normalText={""}
                    closeMethod={this.changeShowUserAuctionList}
                    closeMethodParameter={""}
                  />
                )}

              {!showProfilePreview &&
                !showEditUserData &&
                !showAuctionHistory &&
                showAbout && (
                  <PageHeader
                    boldText={"O aplikacji"}
                    normalText={""}
                    closeMethod={this.setShowAbout}
                    closeMethodParameter={""}
                  />
                )}
              {!showEditUserData && !showAuctionHistory && !showAbout && (
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
                !showAuctionHistory &&
                !showAbout && (
                  <ProfileOptions
                    setShowProfilePreview={this.setShowProfilePreview}
                    getUserAuctionList={this.getUserAuctionList}
                    setShowAbout={this.setShowAbout}
                    navigation={this.props.navigation}
                    user={this.context.userData}
                    API_URL={this.context.API_URL}
                  />
                )}
              {showProfilePreview &&
                !showEditUserData &&
                !showAuctionHistory &&
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
                showAuctionHistory &&
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
                        Brak wyników. Dodaj nieużywane przedmioty w zakładce
                        'Targ' i uzgodnij szczegóły z innymi użytkowniczkami w
                        wiadomościach.
                      </Text>
                    )}
                  </React.Fragment>
                )}

              {!showProfilePreview &&
                !showEditUserData &&
                !showAuctionHistory &&
                showAbout && (
                  <Suspense fallback={<Text>Wczytywanie...</Text>}>
                    <About
                      setShowFeedbackModal={this.props.setShowFeedbackModal}
                    />
                  </Suspense>
                )}
            </ScrollView>
            <BottomPanel
              data-test="BottomPanel"
              navigation={this.props.navigation}
            />
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
Profile.contextType = GlobalContext;
export default Profile;
