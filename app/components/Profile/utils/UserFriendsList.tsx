import React, { Component } from "react";
import { GlobalContext } from "./../../../Context/GlobalContext";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import Alert from "./../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import PageHeader from "./../../SharedComponents/PageHeader";
import UserFriendsListRenderList from "./UserFriendsListRenderList/UserFriendsListRenderList";
import styles from "./../style";

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
    this.loadUserFriendsList = this.loadUserFriendsList.bind(this);
    this.loadPendingUserFriendsList = this.loadPendingUserFriendsList.bind(
      this
    );
  }

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
            <ScrollView>
              <PageHeader
                boldText={"Moje znajome"}
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
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
UserFriendsList.contextType = GlobalContext;
export default UserFriendsList;
