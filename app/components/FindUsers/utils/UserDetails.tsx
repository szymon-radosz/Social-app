import React, { Component, Suspense } from "react";
import { Text, View, ScrollView, SafeAreaView, Image } from "react-native";
import axios from "axios";
import styles from "./../style";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import Alert from "./../../Alert/Alert";
import ProfileHeader from "./../../SharedComponents/ProfileHeader";
import UserPreview from "./../../SharedComponents/UserPreview";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../Utils/ButtonComponent";
import { GlobalContext } from "./../../../Context/GlobalContext";

const loaderImage: any = require("./../../../assets/images/loader.gif");

interface FindUsersState {
  showUserMessageBox: boolean;
  usersAreInTheSameConversation: boolean;
  usersFriendshipStatus: string;
  userDetailsData: any;
  userDetailsId: number;
  locationDetails: any;
}

interface FindUsersProps {
  navigation: any;
}

class UserDetails extends Component<FindUsersProps, FindUsersState> {
  constructor(props: FindUsersProps) {
    super(props);
    this.state = {
      showUserMessageBox: false,
      locationDetails: [],
      usersAreInTheSameConversation: false,
      usersFriendshipStatus: "",
      userDetailsData: [],
      userDetailsId: 0
    };
  }

  componentDidMount = () => {
    //console.log(["UserDetails", this.props.navigation.state.params.userId]);

    let userDetailsId = this.props.navigation.state.params.userId;

    this.setShowUserDetails(userDetailsId);
  };

  componentWillUnmount = () => {
    //console.log(["componentWillUnmount"]);

    this.setState({ userDetailsData: [] });
  };

  setUserDetailsId = (id: number) => {
    this.setState({ userDetailsId: id });
  };

  setShowUserDetails = async (userId: number) => {
    //check if users are in the same conversation - start messaging
    let API_URL = this.context.API_URL;
    /*let searchedUser = userId;*/
    let loggedInUser = this.context.userData.id;

    let that = this;

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
          await that.setState({
            userDetailsId: userId,
            userDetailsData: response.data.result.user,
            usersAreInTheSameConversation:
              response.data.result.checkIfUsersAreInNormalConversation
          });
        }
      })
      .catch(async error => {
        await that.context.setAlert(
          true,
          "danger",
          "Nie udało się pobrać danych o uzytkowniku."
        );
      });

    //check friendship status
    axios
      .post(API_URL + "/api/checkFriend", {
        senderId: loggedInUser,
        receiverId: userId
      })
      .then(async response => {
        if (response.data.status === "OK") {
          await that.setState({
            usersFriendshipStatus: response.data.result.friendship
          });

          await that.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        //console.log(error);

        await that.context.setShowLoader(false);
      });
  };

  confirmFriend = (senderId: number, receiverId: number): void => {
    let API_URL = this.context.API_URL;
    let that = this;
    let openDetailsId = 0;

    axios
      .post(API_URL + "/api/confirmFriend", {
        senderId: senderId,
        receiverId: receiverId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          openDetailsId = senderId;

          that.context.setAlert(
            true,
            "success",
            "Dodano nową użytkowniczkę do grona znajomych."
          );
          that.setShowUserDetails(that.state.userDetailsId);
        }
      })
      .then(response =>
        axios.post(API_URL + "/api/addNotification", {
          type: "friendship_confirmation",
          message: `Użytkowniczka ${
            this.context.userData.name
          } zaakceptowała Twoje zaproszenie do grona znajomych.`,
          userId: receiverId,
          senderId: this.context.userData.id,
          openDetailsId: openDetailsId
        })
      )
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Problem z potwierdzeniem znajomości."
        );
      });
  };

  inviteFriend = (senderId: number, receiverId: number): void => {
    let API_URL = this.context.API_URL;
    let that = this;
    let openDetailsId = 0;

    axios
      .post(API_URL + "/api/inviteFriend", {
        senderId: senderId,
        receiverId: receiverId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          openDetailsId = senderId;

          that.context.setAlert(
            true,
            "success",
            "Wysłano zaproszenie do grona znajomych."
          );
          that.setShowUserDetails(that.state.userDetailsId);
        }
      })
      .then(response =>
        axios.post(API_URL + "/api/addNotification", {
          type: "friendship_invitation",
          message: `Użytkowniczka ${
            this.context.userData.name
          } zaprosiła Cię do grona znajomych`,
          userId: receiverId,
          senderId: this.context.userData.id,
          openDetailsId: openDetailsId
        })
      )
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Problem z wysłaniem zaproszenia do grona znajomych."
        );
      });
  };

  render() {
    const {
      usersAreInTheSameConversation,
      userDetailsData,
      usersFriendshipStatus,
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
                        countFriends={2}
                        countKids={
                          userDetailsData.kids &&
                          userDetailsData.kids.length > 0
                            ? userDetailsData.kids.length
                            : 0
                        }
                        locationString={userDetailsData.location_string}
                      />

                      <UserPreview
                        hobbies={
                          userDetailsData.hobbies &&
                          userDetailsData.hobbies.length > 0
                            ? userDetailsData.hobbies
                            : null
                        }
                        kids={
                          userDetailsData.kids &&
                          userDetailsData.kids.length > 0
                            ? userDetailsData.kids
                            : null
                        }
                        description={userDetailsData.description}
                      />

                      {usersAreInTheSameConversation &&
                        this.props.navigation.state.params.showBtns && (
                          <Text style={styles.userDetailsContentHobbyContainer}>
                            Jesteś już w trakcie rozmowy z{" "}
                            {userDetailsData.name}
                          </Text>
                        )}
                      <View
                        style={styles.userDetailsRedirectMessageBtnContainer}
                      >
                        {usersAreInTheSameConversation &&
                        this.props.navigation.state.params.showBtns ? (
                          <ButtonComponent
                            pressButtonComponent={() =>
                              this.context.NavigationService.navigate(
                                "Messages",
                                {}
                              )
                            }
                            buttonComponentText="Przejdź do wiadomości"
                            fullWidth={true}
                            underlayColor="#dd904d"
                            whiteBg={false}
                            showBackIcon={false}
                          />
                        ) : (
                          this.props.navigation.state.params.showBtns && (
                            <ButtonComponent
                              pressButtonComponent={() =>
                                this.context.NavigationService.navigate(
                                  "UserMessageBox",
                                  { userId: userDetailsData.id }
                                )
                              }
                              buttonComponentText="Pomachaj"
                              fullWidth={true}
                              underlayColor="#dd904d"
                              whiteBg={false}
                              showBackIcon={false}
                            />
                          )
                        )}
                      </View>
                      <View
                        style={styles.userDetailsRedirectMessageBtnContainer}
                      >
                        <View
                          style={
                            this.props.navigation.state.params.showBtns &&
                            styles.btnContainerMarginBottom
                          }
                        >
                          {usersFriendshipStatus ===
                            "friendship doesnt exist" &&
                            this.props.navigation.state.params.showBtns && (
                              <ButtonComponent
                                pressButtonComponent={() =>
                                  this.inviteFriend(
                                    this.context.userData.id,
                                    userDetailsData.id
                                  )
                                }
                                buttonComponentText="Zaproś do znajomych"
                                fullWidth={true}
                                underlayColor="#dd904d"
                                whiteBg={false}
                                showBackIcon={false}
                              />
                            )}

                          {usersFriendshipStatus ===
                            "not confirmed by first person" &&
                            this.props.navigation.state.params.showBtns && (
                              <ButtonComponent
                                pressButtonComponent={() =>
                                  this.confirmFriend(
                                    this.context.userData.id,
                                    userDetailsData.id
                                  )
                                }
                                buttonComponentText="Zaakceptuj zaproszenie do znajomych"
                                fullWidth={true}
                                underlayColor="#dd904d"
                                whiteBg={false}
                                showBackIcon={false}
                              />
                            )}

                          {usersFriendshipStatus ===
                            "not confirmed by second person" &&
                            this.props.navigation.state.params.showBtns && (
                              <ButtonComponent
                                pressButtonComponent={() => {
                                  this.context.NavigationService.navigate(
                                    "UserFriendsList",
                                    {}
                                  );
                                }}
                                buttonComponentText="Wysłano zaproszenie do znajomych"
                                fullWidth={true}
                                underlayColor="#dd904d"
                                whiteBg={false}
                                showBackIcon={false}
                              />
                            )}
                          {usersFriendshipStatus === "confirmed" &&
                            this.props.navigation.state.params.showBtns && (
                              <ButtonComponent
                                pressButtonComponent={() =>
                                  this.context.NavigationService.navigate(
                                    "UserFriendsList",
                                    {}
                                  )
                                }
                                buttonComponentText="Jesteście znajomymi"
                                fullWidth={true}
                                underlayColor="#dd904d"
                                whiteBg={false}
                                showBackIcon={false}
                              />
                            )}
                        </View>
                      </View>
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
UserDetails.contextType = GlobalContext;
export default UserDetails;
