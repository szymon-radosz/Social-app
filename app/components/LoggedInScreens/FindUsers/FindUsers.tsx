import React, { Component, Suspense } from "react";
import { ImageBackground, Text, View, TouchableHighlight } from "react-native";
import axios from "axios";
import UserOnList from "./utils/UserOnList";
import Carousel from "react-native-snap-carousel";
import { btnFullWidthFilledContainer } from "./../../../assets/global/globalStyles";
import { v4 as uuid } from "uuid";
import styles from "./style";
const findUsersBg: any = require("./../../../assets/images/findUsersBgMin.jpg");

const UserDetails = React.lazy(() => import("./utils/UserDetails"));
const UserMessageBox = React.lazy(() => import("./utils/UserMessageBox"));
const FilterModal = React.lazy(() =>
  import("./../SharedComponents/FilterModal")
);
const ActiveFilters = React.lazy(() =>
  import("./../SharedComponents/ActiveFilters")
);

interface FindUsersState {
  userList: any;
  showUserDetails: boolean;
  showUserMessageBox: boolean;
  message: string;
  alertMessage: string;
  alertType: string;
  usersAreInTheSameConversation: boolean;
  usersFriendshipStatus: string;
  userDetailsData: any;
  userDetailsId: number;
  filterOptions: any;
  filterDistance: string;
  filterChildAge: string;
  filterChildGender: string;
  filterHobbyName: string;
  showFilterModal: boolean;
  filterData: {
    distance: any;
    childAge: any;
    childGender: any;
    hobby: any;
  };
  filterModalName: string;
  userMessage: string;
  locationDetails: any;
}

interface FindUsersProps {
  API_URL: string;
  user: {
    id: number;
    lattitude: number;
    longitude: number;
  };
  openMessages: any;
  setOpenProfile: any;
  openFindUserId: number;
}

export default class FindUsers extends Component<
  FindUsersProps,
  FindUsersState
> {
  constructor(props: FindUsersProps) {
    super(props);
    this.state = {
      userMessage: "",
      userList: [],
      filterData: {
        distance: [
          { text: "1km" },
          { text: "2km" },
          { text: "5km" },
          { text: "10km" },
          { text: "50km" },
          { text: "100km" }
        ],
        childAge: [
          { text: "0-6 miesięcy" },
          { text: "7-12 miesięcy" },
          { text: "1-2 lat" },
          { text: "2-4 lat" },
          { text: "4-8 lat" },
          { text: "8-12 lat" },
          { text: "12-16 lat" }
        ],
        childGender: [{ text: "dziewczynka" }, { text: "chłopiec" }],
        hobby: []
      },
      filterDistance: "",
      filterChildAge: "",
      filterChildGender: "",
      filterHobbyName: "",
      showFilterModal: false,
      filterModalName: "",
      showUserDetails: false,
      showUserMessageBox: false,
      message: "",
      alertMessage: "",
      alertType: "",
      locationDetails: [],
      usersAreInTheSameConversation: false,
      usersFriendshipStatus: "",
      userDetailsData: [],
      userDetailsId: 0,
      filterOptions: [
        {
          title: "Odległość",
          index: 0
        },
        {
          title: "Wiek dziecka",
          index: 1
        },
        {
          title: "Płeć dziecka",
          index: 2
        },
        {
          title: "Hobby",
          index: 2
        }
      ]
    };

    this.loadUsersNearCoords = this.loadUsersNearCoords.bind(this);
    this.setShowUserDetails = this.setShowUserDetails.bind(this);
    this.hideShowUserDetails = this.hideShowUserDetails.bind(this);
    this.setShowUserMessageBox = this.setShowUserMessageBox.bind(this);
    this.hideShowUserMessageBox = this.hideShowUserMessageBox.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.setUserDetailsId = this.setUserDetailsId.bind(this);
    this.setShowFilterModal = this.setShowFilterModal.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.getHobbiesList = this.getHobbiesList.bind(this);
    this.getFilteredUserList = this.getFilteredUserList.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.inviteFriend = this.inviteFriend.bind(this);
    this.confirmFriend = this.confirmFriend.bind(this);
    this.setUserMessage = this.setUserMessage.bind(this);
  }

  filterResults = (filterName: string, filterValue: string): void => {
    const {
      filterChildAge,
      filterChildGender,
      filterHobbyName,
      filterDistance
    } = this.state;
    if (filterName === "Odległość") {
      console.log(["filterResult", filterValue]);
      this.getFilteredUserList(
        filterValue,
        filterChildAge,
        filterChildGender,
        filterHobbyName,
        true
      );
    } else if (filterName === "Wiek dziecka") {
      console.log(["filterResult", filterValue]);
      this.getFilteredUserList(
        filterDistance,
        filterValue,
        filterChildGender,
        filterHobbyName,
        true
      );
    } else if (filterName === "Płeć dziecka") {
      console.log(["filterResult", filterValue]);
      this.getFilteredUserList(
        filterDistance,
        filterChildAge,
        filterValue,
        filterHobbyName,
        true
      );
    } else if (filterName === "Hobby") {
      console.log(["filterResult", filterValue]);
      this.getFilteredUserList(
        filterDistance,
        filterChildAge,
        filterChildGender,
        filterValue,
        true
      );
    }
  };

  removeFilter = (filterName: string): void => {
    const {
      filterChildAge,
      filterChildGender,
      filterHobbyName,
      filterDistance
    } = this.state;

    if (filterName === "Odległość") {
      console.log(["filterResult", filterName]);
      this.getFilteredUserList(
        "",
        filterChildAge,
        filterChildGender,
        filterHobbyName,
        false
      );
    } else if (filterName === "Wiek dziecka") {
      console.log(["filterResult", filterName]);
      this.getFilteredUserList(
        filterDistance,
        "",
        filterChildGender,
        filterHobbyName,
        false
      );
    } else if (filterName === "Płeć dziecka") {
      console.log(["filterResult", filterName]);
      this.getFilteredUserList(
        filterDistance,
        filterChildAge,
        "",
        filterHobbyName,
        false
      );
    } else if (filterName === "Hobby") {
      console.log(["filterResult", filterName]);
      this.getFilteredUserList(
        filterDistance,
        filterChildAge,
        filterChildGender,
        "",
        false
      );
    }
  };

  setShowFilterModal = (selectedName = ""): void => {
    console.log("setShowFilterModal");

    if (selectedName !== "") {
      if (selectedName === "Hobby") {
        console.log("selectedName: hobby");
        this.getHobbiesList();
      } else {
        this.setState({
          showFilterModal: !this.state.showFilterModal,
          filterModalName: selectedName
        });
      }
    } else {
      this.setState({ showFilterModal: !this.state.showFilterModal });
    }
  };

  getFilteredUserList = (
    distance: string,
    childAge: string,
    childGender: string,
    hobbyName: string,
    showFilterModal: boolean
  ): void => {
    let API_URL = this.props.API_URL;
    let userLat = this.props.user.lattitude;
    let userLng = this.props.user.longitude;

    console.log([distance, childAge, childGender, hobbyName, showFilterModal]);

    let that = this;

    if (distance || childAge || childGender || hobbyName) {
      axios
        .post(API_URL + "/api/loadUsersFilter", {
          distance: distance,
          childAge: childAge,
          childGender: childGender,
          hobbyName: hobbyName,
          currentUserLat: userLat,
          currentUserLng: userLng
        })
        .then(function(response) {
          console.log(["loadUsersFilter", response.data]);
          if (response.data.status === "OK") {
            //console.log(["getAuctionProducts", response]);
            let newDistance = "";
            let newChildAge = "";
            let newChildGender = "";
            let newHobby = "";

            response.data.resultParameters.map(
              (resultParameter: any, i: number) => {
                //resultParameter.default means we get that parameter to loadUsersFilter
                if (
                  resultParameter.name === "distance" &&
                  resultParameter.default === false
                ) {
                  newDistance = resultParameter.value;
                } else if (
                  resultParameter.name === "childAge" &&
                  resultParameter.default === false
                ) {
                  newChildAge = resultParameter.value;
                } else if (
                  resultParameter.name === "childGender" &&
                  resultParameter.default === false
                ) {
                  newChildGender = resultParameter.value;
                } else if (
                  resultParameter.name === "hobby" &&
                  resultParameter.default === false
                ) {
                  newHobby = resultParameter.value;
                }
              }
            );

            console.log([newDistance, newChildAge, newChildGender, newHobby]);
            if (showFilterModal) {
              that.setState({
                userList: response.data.result,
                filterDistance: newDistance,
                filterChildAge: newChildAge,
                filterChildGender: newChildGender,
                filterHobbyName: newHobby,
                showFilterModal: !that.state.showFilterModal
              });
            } else {
              that.setState({
                userList: response.data.result,
                filterDistance: newDistance,
                filterChildAge: newChildAge,
                filterChildGender: newChildGender,
                filterHobbyName: newHobby
              });
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      this.loadUsersNearCoords();
    }
  };

  getHobbiesList = (): void => {
    let API_URL = this.props.API_URL;

    let that = this;

    axios
      .get(API_URL + "/api/hobbiesList")
      .then(function(response) {
        console.log(["getHobbiesList", response.data]);
        if (response.data.status === "OK") {
          let hobby: any = [];

          response.data.result.map(async (element: any, i: number) => {
            let hobbyObj = { text: element.name };

            await hobby.push(hobbyObj);
          });
          console.log(["responseFinished", hobby]);

          let filterData = that.state.filterData;
          filterData.hobby = hobby;
          that.setState({
            filterData: filterData,
            showFilterModal: !that.state.showFilterModal,
            filterModalName: "Hobby"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  renderItem(item: any, index: any) {
    console.log(item.item);
    return (
      <TouchableHighlight
        style={btnFullWidthFilledContainer}
        onPress={() => this.setShowFilterModal(item.item.title)}
      >
        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            lineHeight: 30,
            color: "#fff"
          }}
        >
          {item.item.title}
        </Text>
      </TouchableHighlight>
    );
  }

  setUserDetailsId = (id: number) => {
    this.setState({ userDetailsId: id });
  };

  sendMessage = (message: string): void => {
    let API_URL = this.props.API_URL;
    let senderId = this.props.user.id;
    let receiverId = this.state.userDetailsId;

    let that = this;

    axios
      .post(API_URL + "/api/saveConversation", {
        senderId: senderId,
        receiverId: receiverId,
        message: message
      })
      .then(function(response2) {
        console.log(response2);
        if (response2.data.status === "OK") {
          that.setState({
            alertType: "success",
            alertMessage: "Poprawnie wysłano nową wiadomość"
          });

          that.setShowUserDetails(that.state.userDetailsId);
        } else if (response2.data.status === "ERR") {
          that.setState({
            alertType: "warning",
            alertMessage: response2.data.result
          });
        }
      })
      .catch(function(error) {
        console.log(error);

        that.setState({
          alertType: "danger",
          alertMessage: "Nie udało się wysłać wiadomości"
        });
      });
  };

  setShowUserDetails = async (userId: number) => {
    //check if users are in the same conversation - start messaging
    let API_URL = this.props.API_URL;
    /*let searchedUser = userId;*/
    let loggedInUser = this.props.user.id;

    let that = this;

    await this.setState({ userDetailsId: 0, userDetailsData: [] });

    axios
      .post(API_URL + "/api/loadUserById", {
        userId: userId,
        loggedInUser: loggedInUser
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["loadUserById", response.data.result.user]);

          that.setState({
            userDetailsId: userId,
            userDetailsData: response.data.result.user,
            usersAreInTheSameConversation:
              response.data.result.checkIfUsersAreInNormalConversation
          });
        }
      })
      .catch(function(error) {
        console.log(error);

        that.setState({
          alertType: "danger",
          alertMessage: "Nie udało się pobrać danych o uzytkowniku"
        });
      });

    //check friendship status
    axios
      .post(API_URL + "/api/checkFriend", {
        senderId: loggedInUser,
        receiverId: userId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["checkFriend", response.data.result.friendship]);

          that.setState({
            usersFriendshipStatus: response.data.result.friendship
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ showUserDetails: true, showUserMessageBox: false });
  };

  hideShowUserDetails = (): void => {
    this.setState({ showUserDetails: false, showUserMessageBox: false });
  };

  setShowUserMessageBox = (): void => {
    this.setState({ showUserMessageBox: true, showUserDetails: false });
  };

  hideShowUserMessageBox = (): void => {
    this.setState({ showUserMessageBox: false, showUserDetails: true });
  };

  confirmFriend = (senderId: number, receiverId: number): void => {
    let API_URL = this.props.API_URL;

    let that = this;

    axios
      .post(API_URL + "/api/confirmFriend", {
        senderId: senderId,
        receiverId: receiverId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["confirmFriend", response.data.result.confirmed]);

          that.setState({
            usersFriendshipStatus: "confirmed"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  inviteFriend = (senderId: number, receiverId: number): void => {
    let API_URL = this.props.API_URL;

    let that = this;

    axios
      .post(API_URL + "/api/inviteFriend", {
        senderId: senderId,
        receiverId: receiverId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["inviteFriend", response.data.result]);

          that.setState({
            usersFriendshipStatus: "not confirmed by second person"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  loadUsersNearCoords = (): void => {
    try {
      let API_URL = this.props.API_URL;
      let lat = this.props.user.lattitude;
      let lng = this.props.user.longitude;

      let that = this;

      axios
        .post(API_URL + "/api/loadUsersNearCoords", {
          lat: lat,
          lng: lng
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            console.log(response.data);

            that.setState({
              userList: response.data.result,
              filterDistance: "",
              filterChildAge: "",
              filterChildGender: "",
              filterHobbyName: ""
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  setUserMessage = (message: string): void => {
    this.setState({ userMessage: message });
  };

  componentDidMount = (): void => {
    if (
      this.props.user &&
      this.props.user.lattitude &&
      this.props.user.longitude
    ) {
      this.loadUsersNearCoords();
    }

    console.log(["this.props.openFindUserId", this.props.openFindUserId]);
    if (this.props.openFindUserId && this.props.openFindUserId !== 0) {
      this.setShowUserDetails(this.props.openFindUserId);
    }

    //console.log(["openFindUserId", this.props.openFindUserId]);
  };

  render() {
    const {
      userList,
      showUserDetails,
      alertMessage,
      alertType,
      showUserMessageBox,
      usersAreInTheSameConversation,
      userDetailsData,
      usersFriendshipStatus,
      userMessage,
      showFilterModal,
      filterOptions,
      filterDistance,
      filterChildAge,
      filterChildGender,
      filterHobbyName,
      filterData,
      filterModalName,
      locationDetails
    } = this.state;
    return (
      <View>
        {!showFilterModal && !showUserDetails && !showUserMessageBox && (
          <ImageBackground source={findUsersBg} style={{ width: "100%" }}>
            <Text style={styles.pageTitle}>
              Poznaj mamy
              {"\n"}w okolicy.
            </Text>
          </ImageBackground>
        )}

        {!showUserMessageBox &&
          !showUserDetails &&
          userList &&
          showFilterModal && (
            <Suspense fallback={<Text>Wczytywanie...</Text>}>
              <FilterModal
                filterOptions={filterData}
                closeFilter={this.setShowFilterModal}
                filterModalName={filterModalName}
                filterResults={this.filterResults}
              />
            </Suspense>
          )}

        <View style={styles.container}>
          {showUserDetails && !showUserMessageBox && userDetailsData && (
            <Suspense fallback={<Text>Wczytywanie...</Text>}>
              <UserDetails
                hideShowUserDetails={this.hideShowUserDetails}
                API_URL={this.props.API_URL}
                user={userDetailsData}
                usersAreInTheSameConversation={usersAreInTheSameConversation}
                usersFriendshipStatus={usersFriendshipStatus}
                openMessages={this.props.openMessages}
                setOpenProfile={this.props.setOpenProfile}
                setShowUserMessageBox={this.setShowUserMessageBox}
                alertMessage={alertMessage}
                alertType={alertType}
                inviteFriend={this.inviteFriend}
                confirmFriend={this.confirmFriend}
                loggedInUserId={this.props.user.id}
                locationDetails={locationDetails}
              />
            </Suspense>
          )}
          {showUserMessageBox && !showUserDetails && userDetailsData && (
            <Suspense fallback={<Text>Wczytywanie...</Text>}>
              <UserMessageBox
                hideShowUserMessageBox={this.hideShowUserMessageBox}
                sendMessage={this.sendMessage}
                setUserMessage={this.setUserMessage}
                userMessage={userMessage}
                alertMessage={alertMessage}
                alertType={alertType}
              />
            </Suspense>
          )}

          {!showUserMessageBox &&
            !showUserDetails &&
            userList &&
            !showFilterModal && (
              <View>
                <Text
                  style={{ paddingLeft: 10, paddingTop: 10, fontWeight: "600" }}
                >
                  Filtruj wyniki
                </Text>
                <View
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10
                  }}
                >
                  <Carousel
                    layout={"default"}
                    activeSlideAlignment={"start"}
                    data={filterOptions}
                    renderItem={this.renderItem}
                    itemWidth={100}
                    sliderWidth={styles.fullWidth}
                    removeClippedSubviews={false}
                  />
                </View>
              </View>
            )}

          <Suspense fallback={<Text>Wczytywanie...</Text>}>
            <ActiveFilters
              filterDistance={filterDistance}
              filterChildAge={filterChildAge}
              filterChildGender={filterChildGender}
              filterHobbyName={filterHobbyName}
              showFilterModal={showFilterModal}
              removeFilter={this.removeFilter}
            />
          </Suspense>

          {!showUserMessageBox &&
            !showUserDetails &&
            userList &&
            !showFilterModal &&
            userList.map((user: any, i: number) => {
              if (user.id != this.props.user.id) {
                return (
                  <UserOnList
                    API_URL={this.props.API_URL}
                    key={uuid()}
                    user={user}
                    setShowUserDetails={this.setShowUserDetails}
                    setUserDetailsId={this.setUserDetailsId}
                  />
                );
              }
            })}
        </View>
      </View>
    );
  }
}
