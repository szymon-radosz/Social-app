import React, { Component } from "react";
import SingleNotification from "./SingleNotification";
import { v4 as uuid } from "uuid";
import { View } from "react-native";

interface UserNotificationListProps {
  userNotificationList: any;
  openMessages: any;
  loadUserFriendsList: any;
  openForum: any;
  clearUserNotificationsStatus: any;
  userId: number;
}

interface UserNotificationListState {}

export default class UserNotificationList extends Component<
  UserNotificationListProps,
  UserNotificationListState
> {
  constructor(props: UserNotificationListProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.clearUserNotificationsStatus(this.props.userId);
  }

  render() {
    return (
      <View>
        {this.props.userNotificationList.map((notification: any, i: number) => {
          return (
            <SingleNotification
              notification={notification}
              openMessages={this.props.openMessages}
              loadUserFriendsList={this.props.loadUserFriendsList}
              openForum={this.props.openForum}
              key={uuid()}
            />
          );
        })}
      </View>
    );
  }
}
