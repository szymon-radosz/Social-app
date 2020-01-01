import React, { Component } from "react";
import SingleNotification from "./SingleNotification/SingleNotification";
import { GlobalContext } from "./../../../Context/GlobalContext";
import axios from "axios";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import Alert from "./../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import PageHeader from "./../../SharedComponents/PageHeader";
import styles from "./../style";
import lang from "./../../../assets/lang/Profile/utils/UserNotificationList";

const loaderImage: any = require("./../../../assets/images/loader.gif");

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
    this.context.setShowLoader(true);

    return new Promise((resolve, reject) => {
      axios
        .post(this.context.API_URL + "/api/loadNotificationByUserId", {
          userId: id
        })
        .then(async response => {
          if (response.data.status === "OK") {
            await this.setState({
              userNotificationList: response.data.result
            });

            await this.context.setShowLoader(false);

            resolve(true);
          }
        })
        .catch(async error => {
          await this.context.setAlert(
            true,
            "danger",
            lang.notificationListError["en"]
          );
          await this.context.setShowLoader(false);

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
      await this.context.clearUserNotificationsStatus(this.context.userData.id);
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
                    boldText={"Powiadomienia"}
                    normalText={""}
                    closeMethod={() => this.props.navigation.goBack(null)}
                    closeMethodParameter={""}
                  />
                  <View style={{ padding: 10 }}>
                    {userNotificationList &&
                      userNotificationList.map(
                        (notification: any, i: number) => {
                          return (
                            <SingleNotification
                              notification={notification}
                              key={`SingleNotification-${i}`}
                              navigation={this.props.navigation}
                            />
                          );
                        }
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
UserNotificationList.contextType = GlobalContext;
export default UserNotificationList;
