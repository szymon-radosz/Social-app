import React, { Component } from "react";
import SingleNotification from "./SingleNotification/SingleNotification";
import { GlobalContext } from "./../../../Context/GlobalContext";
import axios from "axios";
import { View, SafeAreaView, ScrollView } from "react-native";
import Alert from "./../../../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import PageHeader from "./../../SharedComponents/PageHeader";

interface UserNotificationListProps {
  navigation: any;
}

interface UserNotificationListState {
  userNotificationList: any;
}

class UserNotificationList extends Component<
  UserNotificationListProps,
  UserNotificationListState
> {
  constructor(props: UserNotificationListProps) {
    super(props);
    this.state = {
      userNotificationList: []
    };
  }

  getUserNotificationList = () => {
    let id = this.context.userData.id;
    let that = this;

    return new Promise((resolve, reject) => {
      axios
        .post(this.context.API_URL + "/api/loadNotificationByUserId", {
          userId: id
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            that.setState({
              userNotificationList: response.data.result
            });

            resolve(true);
          }
        })
        .catch(function(error) {
          that.context.setAlert(
            true,
            "danger",
            "Wystąpił błąd z wyświetleniem listy powiadomień."
          );
          reject(true);
        });

      axios.post(this.context.API_URL + "/api/clearNotificationByUserId", {
        userId: id
      });
    });
  };

  componentDidMount = async () => {
    if (this.context.userData) {
      await this.getUserNotificationList();
      this.context.clearUserNotificationsStatus(this.context.userData.id);
    }
  };

  render() {
    const { userNotificationList } = this.state;
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
                boldText={"Powiadomienia"}
                normalText={""}
                closeMethod={() => this.props.navigation.goBack(null)}
                closeMethodParameter={""}
              />
              <View style={{ padding: 10 }}>
                {userNotificationList &&
                  userNotificationList.map((notification: any, i: number) => {
                    return (
                      <SingleNotification
                        notification={notification}
                        key={`SingleNotification-${i}`}
                        navigation={this.props.navigation}
                      />
                    );
                  })}
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
UserNotificationList.contextType = GlobalContext;
export default UserNotificationList;
