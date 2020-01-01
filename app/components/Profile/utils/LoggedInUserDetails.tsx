import React, { Component, Suspense } from "react";
import { View, ScrollView, SafeAreaView, Image } from "react-native";
import axios from "axios";
import styles from "./../../Users/style";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import Alert from "./../../Alert/Alert";
import ProfileHeader from "./../../SharedComponents/ProfileHeader";
import UserPreview from "./../../SharedComponents/UserPreview";
import PageHeader from "./../../SharedComponents/PageHeader";
import { GlobalContext } from "./../../../Context/GlobalContext";
import lang from "./../../../assets/lang/Profile/utils/LoggedInUserDetails";

const loaderImage: any = require("./../../../assets/images/loader.gif");

interface LoggedInUserDetailsState {
  showUserMessageBox: boolean;
  userDetailsData: any;
  userDetailsId: number;
  locationDetails: any;
  countFriends: number;
}

interface LoggedInUserDetailsProps {
  navigation: any;
}

class LoggedInUserDetails extends Component<
  LoggedInUserDetailsProps,
  LoggedInUserDetailsState
> {
  constructor(props: LoggedInUserDetailsProps) {
    super(props);
    this.state = {
      showUserMessageBox: false,
      locationDetails: [],
      userDetailsData: [],
      userDetailsId: 0,
      countFriends: 0
    };
  }

  componentDidMount = async () => {
    await this.getAmountOfFriends(this.context.userData.id);

    await this.setShowUserDetails(this.context.userData.id);
  };

  getAmountOfFriends = (id: number): void => {
    axios
      .post(this.context.API_URL + "/api/countFriends", {
        userId: id
      })
      .then(response => {
        if (response.data.status === "OK") {
          //console.log(["getAmountOfFriends", response.data.result]);
          this.setState({ countFriends: response.data.result.countFriends });
        }
      })
      .catch(error => {});
  };

  setUserDetailsId = (id: number) => {
    this.setState({ userDetailsId: id });
  };

  setShowUserDetails = async (userId: number) => {
    //check if users are in the same conversation - start messaging
    let API_URL = this.context.API_URL;
    /*let searchedUser = userId;*/
    let loggedInUser = this.context.userData.id;

    await this.setState({ userDetailsId: 0, userDetailsData: [] });

    this.context.setShowLoader(true);

    axios
      .post(API_URL + "/api/loadUserById", {
        userId: userId,
        loggedInUser: loggedInUser
      })
      .then(async response => {
        if (response.data.status === "OK") {
          //console.log(["setShowUserDetails", response.data.result.user]);
          await this.setState({
            userDetailsId: userId,
            userDetailsData: response.data.result.user
          });

          this.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        await this.context.setAlert(
          true,
          "danger",
          lang.userDetailsError["en"]
        );

        this.context.setShowLoader(false);
      });
  };

  render() {
    const { userDetailsData, locationDetails, countFriends } = this.state;
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
                {userDetailsData && (
                  <ScrollView>
                    <PageHeader
                      boldText={userDetailsData.name}
                      normalText={""}
                      closeMethod={() => {
                        this.props.navigation.goBack(null);
                      }}
                      closeMethodParameter={""}
                    />
                    <React.Fragment>
                      <ProfileHeader
                        API_URL={this.context.API_URL}
                        avatar={userDetailsData.photo_path}
                        name={userDetailsData.name}
                        cityDistrict={locationDetails.cityDistrict}
                        city={locationDetails.city}
                        age={userDetailsData.age}
                        countFriends={countFriends}
                        locationString={userDetailsData.location_string}
                      />

                      <UserPreview
                        hobbies={
                          userDetailsData.hobbies &&
                          userDetailsData.hobbies.length > 0
                            ? userDetailsData.hobbies
                            : null
                        }
                        description={userDetailsData.description}
                      />
                    </React.Fragment>
                  </ScrollView>
                )}

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
LoggedInUserDetails.contextType = GlobalContext;
export default LoggedInUserDetails;
