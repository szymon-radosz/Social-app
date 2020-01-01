import React, { Component } from "react";
import { GlobalContext } from "./../../../Context/GlobalContext";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";
import Alert from "./../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import PageHeader from "./../../SharedComponents/PageHeader";
import UserFriendsListRenderList from "./UserFriendsListRenderList/UserFriendsListRenderList";
import styles from "./../style";
import lang from "./../../../assets/lang/Profile/utils/UserFriendsList";

const loaderImage: any = require("./../../../assets/images/loader.gif");

interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}

interface UserFriendsListState {
  userFriendsList: any;
  userPendingFriendsList: any;
  showUserFriendsList: boolean;
  showPendingUserFriendsList: boolean;
  showUserNotificationList: boolean;
  displayFriendList: boolean;
}

interface UserFriendsListProps {
  navigation: any;
}

class UserFriendsList extends Component<
  UserFriendsListProps,
  UserFriendsListState,
  NavigationScreenInterface
> {
  constructor(props: UserFriendsListProps) {
    super(props);
    this.state = {
      userFriendsList: [],
      userPendingFriendsList: [],
      showUserFriendsList: false,
      showPendingUserFriendsList: false,
      showUserNotificationList: false,
      displayFriendList: true
    };
  }

  loadUserFriendsList = (): void => {
    let userId = this.context.userData.id;
    this.context.setShowLoader(true);

    if (userId) {
      axios
        .post(this.context.API_URL + "/api/friendsList", {
          userId: userId
        })
        .then(async response => {
          if (response.data.status === "OK") {
            await this.setState({
              userFriendsList: response.data.result.friendsList,
              showUserFriendsList: true,
              showPendingUserFriendsList: false,
              showUserNotificationList: false,
              displayFriendList: true
            });

            await this.context.setShowLoader(false);
          }
        })
        .catch(async error => {
          await this.context.setAlert(
            true,
            "danger",
            lang.friendsListError["en"]
          );

          await this.context.setShowLoader(false);
        });
    }
  };

  loadPendingUserFriendsList = (): void => {
    let userId = this.context.userData.id;
    this.context.setShowLoader(true);

    if (userId) {
      axios
        .post(this.context.API_URL + "/api/pendingFriendsList", {
          userId: userId
        })
        .then(async response => {
          if (response.data.status === "OK") {
            await this.setState({
              userPendingFriendsList: response.data.result.friendsList,
              showPendingUserFriendsList: true,
              showUserFriendsList: false,
              showUserNotificationList: false,
              displayFriendList: false
            });

            await this.context.setShowLoader(false);
          }
        })
        .catch(async error => {
          await this.context.setAlert(
            true,
            "danger",
            lang.friendsListError["en"]
          );

          await this.context.setShowLoader(false);
        });
    }
  };

  componentDidMount = () => {
    this.loadUserFriendsList();
  };

  render() {
    const {
      userFriendsList,
      userPendingFriendsList,
      displayFriendList,
      showUserFriendsList,
      showPendingUserFriendsList
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
                  <PageHeader
                    boldText={lang.myFriends["en"]}
                    normalText={""}
                    closeMethod={() => this.props.navigation.goBack(null)}
                    closeMethodParameter={""}
                  />

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
                            {lang.friends["en"]}
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
                            {lang.waiting["en"]}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    {showUserFriendsList && !showPendingUserFriendsList && (
                      <UserFriendsListRenderList
                        navigation={this.props.navigation}
                        userFriendsList={userFriendsList}
                      />
                    )}
                    {!showUserFriendsList && showPendingUserFriendsList && (
                      <UserFriendsListRenderList
                        navigation={this.props.navigation}
                        userFriendsList={userPendingFriendsList}
                      />
                    )}
                  </View>
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
UserFriendsList.contextType = GlobalContext;
export default UserFriendsList;
