import React, { Component, Suspense } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  Image
} from "react-native";
import axios from "axios";
//@ts-ignore
import Carousel from "react-native-snap-carousel";
import { btnFullWidthFilledContainer } from "./../../../assets/global/globalStyles";
import styles from "./style";

const findUsersBg: any = require("./../../../assets/images/findUsersBgMin.jpg");

import { GlobalContext } from "./../../Context/GlobalContext";
import UserList from "./utils/UserList";
import BottomPanel from "./../SharedComponents/BottomPanel";
import Alert from "./../../../Alert/Alert";

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
  openMessages: any;
  openFindUserId: number;
  setOpenProfile: any;
  navigation: any;
}

class FindUsers extends Component<FindUsersProps, FindUsersState> {
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
    this.setShowFilterModal = this.setShowFilterModal.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.getHobbiesList = this.getHobbiesList.bind(this);
    this.getFilteredUserList = this.getFilteredUserList.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  filterResults = (filterName: string, filterValue: string): void => {
    const {
      filterChildAge,
      filterChildGender,
      filterHobbyName,
      filterDistance
    } = this.state;
    if (filterName === "Odległość") {
      this.getFilteredUserList(
        filterValue,
        filterChildAge,
        filterChildGender,
        filterHobbyName,
        true
      );
    } else if (filterName === "Wiek dziecka") {
      this.getFilteredUserList(
        filterDistance,
        filterValue,
        filterChildGender,
        filterHobbyName,
        true
      );
    } else if (filterName === "Płeć dziecka") {
      this.getFilteredUserList(
        filterDistance,
        filterChildAge,
        filterValue,
        filterHobbyName,
        true
      );
    } else if (filterName === "Hobby") {
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
      this.getFilteredUserList(
        "",
        filterChildAge,
        filterChildGender,
        filterHobbyName,
        false
      );
    } else if (filterName === "Wiek dziecka") {
      this.getFilteredUserList(
        filterDistance,
        "",
        filterChildGender,
        filterHobbyName,
        false
      );
    } else if (filterName === "Płeć dziecka") {
      this.getFilteredUserList(
        filterDistance,
        filterChildAge,
        "",
        filterHobbyName,
        false
      );
    } else if (filterName === "Hobby") {
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
    if (selectedName !== "") {
      if (selectedName === "Hobby") {
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
    let API_URL = this.context.API_URL;
    let userLat = this.context.userData.lattitude;
    let userLng = this.context.userData.longitude;

    let that = this;

    console.log([
      "getFilteredUserList",
      distance,
      childAge,
      childGender,
      hobbyName
    ]);

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
          that.context.setAlert(
            true,
            "danger",
            "Wystąpił błąd z wyświetleniem filtrów."
          );
        });
    } else {
      this.loadUsersNearCoords();
    }
  };

  getHobbiesList = (): void => {
    let API_URL = this.context.API_URL;

    let that = this;

    axios
      .get(API_URL + "/api/hobbiesList")
      .then(function(response) {
        if (response.data.status === "OK") {
          let hobby: any = [];

          response.data.result.map(async (element: any, i: number) => {
            let hobbyObj = { text: element.name };

            await hobby.push(hobbyObj);
          });

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
        that.context.setAlert(
          true,
          "danger",
          "Wystąpił błąd z wyświetleniem listy hobby."
        );
      });
  };

  renderItem(item: any, index: any) {
    return (
      <TouchableHighlight
        style={btnFullWidthFilledContainer}
        onPress={() => this.setShowFilterModal(item.item.title)}
        underlayColor={"#dd904d"}
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

  loadUsersNearCoords = (): void => {
    try {
      let API_URL = this.context.API_URL;
      let lat = this.context.userData.lattitude;
      let lng = this.context.userData.longitude;

      let that = this;

      axios
        .post(API_URL + "/api/loadUsersNearCoords", {
          lat: lat,
          lng: lng
        })
        .then(function(response) {
          console.log(["loadUsersNearCoords", response.data.result]);
          if (response.data.status === "OK") {
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
          that.context.setAlert(
            true,
            "danger",
            "Problem z wys∑ietleniem listy użytkowniczek."
          );
        });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount = (): void => {
    let user = this.context.userData;
    if (user && user.lattitude && user.longitude) {
      this.loadUsersNearCoords();
    }
  };

  render() {
    const {
      userList,
      showUserDetails,

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
            data-test="FindUsers"
          >
            <View>
              {!showFilterModal && (
                <ImageBackground
                  source={findUsersBg}
                  style={{ width: "100%" }}
                  data-test="ImageBackground"
                >
                  <Text style={styles.pageTitle}>
                    Poznaj mamy
                    {"\n"}w okolicy.
                  </Text>
                </ImageBackground>
              )}

              {userList && showFilterModal && (
                <Suspense fallback={<Text>Wczytywanie...</Text>}>
                  <FilterModal
                    filterOptions={filterData}
                    closeFilter={this.setShowFilterModal}
                    filterModalName={filterModalName}
                    filterResults={this.filterResults}
                    data-test="FilterModal"
                  />
                </Suspense>
              )}

              {userList && !showFilterModal && (
                <View data-test="Carousel">
                  <Text style={styles.filterResultsHeaderText}>
                    Filtruj wyniki
                  </Text>
                  <View style={styles.filterResultsCarousel}>
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
                  data-test="ActiveFilters"
                />
              </Suspense>

              {userList && !showFilterModal && userList.length > 1 && (
                <UserList
                  API_URL={this.context.API_URL}
                  loggedInUserId={this.context.userData.id}
                  navigation={this.props.navigation}
                  userList={userList}
                  data-test="UserListContainer"
                />
              )}

              {userList && !showFilterModal && userList.length < 2 ? (
                <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                  Brak mam w Twojej okolicy. Zaproś znajome do skorzystania z
                  aplikacji E-mamy i zbudujcie razem lokalną społeczność mam.
                </Text>
              ) : null}
            </View>

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
FindUsers.contextType = GlobalContext;
export default FindUsers;
