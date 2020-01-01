import React, { Component } from "react";
import { Text, View, ScrollView, SafeAreaView, Image } from "react-native";
import axios from "axios";
import styles from "./../style";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import Alert from "./../../Alert/Alert";
import ProfileHeader from "./../../SharedComponents/ProfileHeader";
import UserPreview from "./../../SharedComponents/UserPreview";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../Utils/ButtonComponent";
import lang from "./../../../assets/lang/Users/utils/UserDetails";
import { GlobalContext } from "./../../../Context/GlobalContext";

const loaderImage: any = require("./../../../assets/images/loader.gif");

interface UserDetailsState {
  showUserMessageBox: boolean;
  usersAreInTheSameConversation: boolean;
  usersFriendshipStatus: string;
  userDetailsData: any;
  userDetailsId: number;
  locationDetails: any;
  countFriends: number;
}

interface UserDetailsProps {
  navigation: any;
}

class UserDetails extends Component<UserDetailsProps, UserDetailsState> {
  constructor(props: UserDetailsProps) {
    super(props);
    this.state = {
      showUserMessageBox: false,
      locationDetails: [],
      usersAreInTheSameConversation: false,
      usersFriendshipStatus: "",
      userDetailsData: [],
      userDetailsId: 0,
      countFriends: 0
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    let userDetailsId = navigation.state.params.userId;

    await this.getAmountOfFriends(navigation.state.params.userId);
    await this.setShowUserDetails(userDetailsId);
  };

  getAmountOfFriends = (id: number): void => {
    axios
      .post(this.context.API_URL + "/api/countFriends", {
        userId: id
      })
      .then(response => {
        if (response.data.status === "OK") {
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
            userDetailsData: response.data.result.user,
            usersAreInTheSameConversation:
              response.data.result.checkIfUsersAreInNormalConversation
          });
        }
      })
      .catch(async error => {
        await this.context.setAlert(
          true,
          "danger",
          lang.userDetailsError["en"]
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
          await this.setState({
            usersFriendshipStatus: response.data.result.friendship
          });

          await this.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        //console.log(error);

        await this.context.setShowLoader(false);
      });
  };

  confirmFriend = (senderId: number, receiverId: number): void => {
    let API_URL = this.context.API_URL;
    let openDetailsId = 0;

    axios
      .post(API_URL + "/api/confirmFriend", {
        senderId: senderId,
        receiverId: receiverId
      })
      .then(response => {
        if (response.data.status === "OK") {
          openDetailsId = senderId;

          this.context.setAlert(true, "success", lang.addedFriendSuccess["en"]);
          this.setShowUserDetails(this.state.userDetailsId);
        }
      })
      .then(response =>
        axios.post(API_URL + "/api/addNotification", {
          type: "friendship_confirmation",
          message: `${this.context.userData.name} ${lang.acceptYourInvitationSuccess["en"]}`,
          userId: receiverId,
          senderId: this.context.userData.id,
          openDetailsId: openDetailsId
        })
      )
      .catch(error => {
        this.context.setAlert(true, "danger", lang.addedFriendError["en"]);
      });
  };

  inviteFriend = (senderId: number, receiverId: number): void => {
    let API_URL = this.context.API_URL;
    let openDetailsId = 0;

    axios
      .post(API_URL + "/api/inviteFriend", {
        senderId: senderId,
        receiverId: receiverId
      })
      .then(response => {
        if (response.data.status === "OK") {
          openDetailsId = senderId;

          this.context.setAlert(
            true,
            "success",
            lang.invitationSendedSuccess["en"]
          );
          this.setShowUserDetails(this.state.userDetailsId);
        }
      })
      .then(response =>
        axios.post(API_URL + "/api/addNotification", {
          type: "friendship_invitation",
          message: `${this.context.userData.name} ${lang.inviteToFriends["en"]}`,
          userId: receiverId,
          senderId: this.context.userData.id,
          openDetailsId: openDetailsId
        })
      )
      .catch(error => {
        this.context.setAlert(true, "danger", lang.invitationSendedError["en"]);
      });
  };

  render() {
    const {
      usersAreInTheSameConversation,
      userDetailsData,
      usersFriendshipStatus,
      locationDetails,
      countFriends
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

                      {usersAreInTheSameConversation &&
                        this.props.navigation.state.params.showBtns && (
                          <Text style={styles.userDetailsContentHobbyContainer}>
                            {lang.conversationExists["en"]}
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
                            buttonComponentText={lang.showConversations["en"]}
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
                              buttonComponentText={lang.connect["en"]}
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
                                buttonComponentText={lang.invite["en"]}
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
                                buttonComponentText={
                                  lang.acceptInvitation["en"]
                                }
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
                                buttonComponentText={
                                  lang.sendedInvitation["en"]
                                }
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
                                buttonComponentText={lang.friendsTogether["en"]}
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
