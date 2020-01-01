import React, { Component, Suspense } from "react";
import {
  ImageBackground,
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";
import axios from "axios";
//@ts-ignore
import Carousel from "react-native-snap-carousel";
import { btnFullWidthFilledContainer } from "./../../assets/global/globalStyles";
import styles from "./style";
import { GlobalContext } from "./../../Context/GlobalContext";
import UserList from "./utils/UserList";
import BottomPanel from "./../SharedComponents/BottomPanel";
import Alert from "./../Alert/Alert";
import { withNavigation } from "react-navigation";
import lang from "./../../assets/lang/Users/Users";

const findUsersBg: any = require("./../../assets/images/findUsersBgMin.jpg");
const loaderImage: any = require("./../../assets/images/loader.gif");

const FilterModal = React.lazy(() =>
  import("./../SharedComponents/FilterModal")
);
const ActiveFilters = React.lazy(() =>
  import("./../SharedComponents/ActiveFilters")
);

interface UsersState {
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
  filterHobbyName: string;
  showFilterModal: boolean;
  filterData: {
    distance: any;
    hobby: any;
  };
  filterModalName: string;
  userMessage: string;
  locationDetails: any;
}

interface UsersProps {
  openMessages: any;
  openFindUserId: number;
  setOpenProfile: any;
  navigation: any;
}

class Users extends Component<UsersProps, UsersState> {
  constructor(props: UsersProps) {
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
        hobby: []
      },
      filterDistance: "",
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
          title: "Hobby",
          index: 2
        }
      ]
    };
  }

  filterResults = (filterName: string, filterValue: string): void => {
    const { filterHobbyName, filterDistance } = this.state;
    if (filterName === "Odległość") {
      this.getFilteredUserList(filterValue, filterHobbyName, true);
    } else if (filterName === "Hobby") {
      this.getFilteredUserList(filterDistance, filterValue, true);
    }
  };

  removeFilter = (filterName: string): void => {
    const { filterHobbyName, filterDistance } = this.state;

    if (filterName === "Odległość") {
      this.getFilteredUserList("", filterHobbyName, false);
    } else if (filterName === "Hobby") {
      this.getFilteredUserList(filterDistance, "", false);
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
    hobbyName: string,
    showFilterModal: boolean
  ): void => {
    let API_URL = this.context.API_URL;
    let userLat = this.context.userData.lattitude;
    let userLng = this.context.userData.longitude;

    /*console.log([
      "getFilteredUserList",
      distance,
      childAge,
      childGender,
      hobbyName
    ]);*/

    if (distance || hobbyName) {
      this.context.setShowLoader(true);

      axios
        .post(API_URL + "/api/loadUsersFilter", {
          distance: distance,
          hobbyName: hobbyName,
          currentUserLat: userLat,
          currentUserLng: userLng
        })
        .then(async response => {
          if (response.data.status === "OK") {
            //console.log(["getAuctionProducts", response]);
            let newDistance = "";
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
                  resultParameter.name === "hobby" &&
                  resultParameter.default === false
                ) {
                  newHobby = resultParameter.value;
                }
              }
            );

            if (showFilterModal) {
              await this.setState({
                userList: response.data.result,
                filterDistance: newDistance,
                filterHobbyName: newHobby,
                showFilterModal: !this.state.showFilterModal
              });

              await this.context.setShowLoader(false);
            } else {
              await this.setState({
                userList: response.data.result,
                filterDistance: newDistance,
                filterHobbyName: newHobby
              });

              await this.context.setShowLoader(false);
            }
          }
        })
        .catch(error => {
          this.context.setAlert(true, "danger", lang.filtersListError["en"]);

          this.context.setShowLoader(false);
        });
    } else {
      this.loadUsersNearCoords();
    }
  };

  getHobbiesList = (): void => {
    let API_URL = this.context.API_URL;

    axios
      .get(API_URL + "/api/hobbiesList")
      .then(response => {
        if (response.data.status === "OK") {
          let hobby: any = [];

          response.data.result.map(async (element: any, i: number) => {
            let hobbyObj = { text: element.name };

            await hobby.push(hobbyObj);
          });

          let filterData = this.state.filterData;
          filterData.hobby = hobby;
          this.setState({
            filterData: filterData,
            showFilterModal: !this.state.showFilterModal,
            filterModalName: "Hobby"
          });
        }
      })
      .catch(error => {
        this.context.setAlert(true, "danger", lang.hobbiesListError["en"]);
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

      this.context.setShowLoader(true);

      axios
        .post(API_URL + "/api/loadUsersNearCoords", {
          lat: lat,
          lng: lng
        })
        .then(async response => {
          //console.log(["loadUsersNearCoords", response.data.result]);
          if (response.data.status === "OK") {
            await this.setState({
              userList: response.data.result,
              filterDistance: "",
              filterHobbyName: ""
            });

            await this.context.setShowLoader(false);
          }
        })
        .catch(error => {
          this.context.setAlert(true, "danger", lang.usersListError["en"]);

          this.context.setShowLoader(false);
        });
    } catch (e) {
      //console.log(e);
    }
  };

  componentDidMount = (): void => {
    //console.log("FindUsers did mount");
    /*let user = this.context.userData;
    if (user && user.lattitude && user.longitude) {
      this.loadUsersNearCoords();
    }*/

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
      //console.log("Focus listener mount");
      this.context.setCurrentNavName("POZNAJ");

      this.loadUsersNearCoords();
    });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    const {
      userList,
      showFilterModal,
      filterOptions,
      filterDistance,
      filterHobbyName,
      filterData,
      filterModalName
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
            {this.context.showLoader ? (
              <View style={styles.loaderContainer} data-test="loader">
                <Image
                  style={{ width: 100, height: 100 }}
                  source={loaderImage}
                />
              </View>
            ) : (
              <React.Fragment>
                <ScrollView>
                  {!showFilterModal && (
                    <ImageBackground
                      source={findUsersBg}
                      style={{ width: "100%" }}
                      data-test="ImageBackground"
                    >
                      <Text style={styles.pageTitle}>{lang.header["en"]}</Text>
                    </ImageBackground>
                  )}

                  {userList && showFilterModal && (
                    <Suspense fallback={<Text>{lang.loading["en"]}</Text>}>
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
                        {lang.filterResults["en"]}
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

                  <Suspense fallback={<Text>{lang.loading["en"]}</Text>}>
                    <ActiveFilters
                      filterDistance={filterDistance}
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
                      {lang.usersNotFound["en"]}
                    </Text>
                  ) : null}
                </ScrollView>

                <BottomPanel
                  data-test="BottomPanel"
                  navigation={this.props.navigation}
                />
              </React.Fragment>
            )}
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
Users.contextType = GlobalContext;
export default withNavigation(Users);
