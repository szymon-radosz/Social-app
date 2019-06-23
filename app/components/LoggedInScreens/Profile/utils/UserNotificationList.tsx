import React from "react";
import SingleNotification from "./SingleNotification";
import { v4 as uuid } from "uuid";

const UserNotificationList = (props: any): any =>
  props.userNotificationList.map((notification: any, i: number) => {
    return (
      <SingleNotification
        notification={notification}
        openMessages={props.openMessages}
        loadUserFriendsList={props.loadUserFriendsList}
        openForum={props.openForum}
        key={uuid()}
      />
    );
  });

export default UserNotificationList;
