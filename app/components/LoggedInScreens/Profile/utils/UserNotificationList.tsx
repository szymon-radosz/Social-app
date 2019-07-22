import React, { Component } from "react";
import SingleNotification from "./SingleNotification";
import { v4 as uuid } from "uuid";
import { View } from "react-native";
import { GlobalContext } from "./../../../Context/GlobalContext";

interface UserNotificationListProps {
  userNotificationList: any;
  openMessages: any;
  loadUserFriendsList: any;
  openForum: any;
}

interface UserNotificationListState {}

class UserNotificationList extends Component<
  UserNotificationListProps,
  UserNotificationListState
> {
  constructor(props: UserNotificationListProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.context.userData) {
      this.context.clearUserNotificationsStatus(this.context.userData.id);
    }
  }

  render() {
    return (
      <View>
        {this.props.userNotificationList &&
          this.props.userNotificationList.map(
            (notification: any, i: number) => {
              return (
                <SingleNotification
                  notification={notification}
                  openMessages={this.props.openMessages}
                  loadUserFriendsList={this.props.loadUserFriendsList}
                  openForum={this.props.openForum}
                  key={uuid()}
                />
              );
            }
          )}
      </View>
    );
  }
}
UserNotificationList.contextType = GlobalContext;
export default UserNotificationList;
