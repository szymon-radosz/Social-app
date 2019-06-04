import React from "react";
import SingleUserFriendList from "./SingleUserFriendList";

const UserFriendsList = (props: any) =>
  props.userFriendsList.map((friendsPair: any, i: number) => {
    if (friendsPair.users_invited_by_me.id === props.loggedInUser) {
      return (
        <SingleUserFriendList
          user={friendsPair.users_invited_me}
          API_URL={props.API_URL}
          setOpenFindUsers={props.setOpenFindUsers}
        />
      );
    } else if (friendsPair.users_invited_by_me.id !== props.loggedInUser) {
      return (
        <SingleUserFriendList
          user={friendsPair.users_invited_by_me}
          API_URL={props.API_URL}
          setOpenFindUsers={props.setOpenFindUsers}
        />
      );
    }
  });

export default UserFriendsList;
