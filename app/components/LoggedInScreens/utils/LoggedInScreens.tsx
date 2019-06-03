import React from "react";
import { View } from "react-native";
import FindUsers from "./../FindUsers/FindUsers";
import Auctions from "./../Auctions/Auctions";
import Messages from "./../Messages/Messages";
import Forum from "./../Forum/Forum";
import Profile from "./../Profile/Profile";

const LoggedInScreens = (props: any) => (
  <View>
    {props.openFindUsers && (
      <FindUsers
        API_URL={props.API_URL}
        user={props.user}
        openMessages={props.setOpenMessages}
        setOpenProfile={props.setOpenProfile}
      />
    )}
    {props.openAuctions && (
      <Auctions
        API_URL={props.API_URL}
        user={props.user}
        openMessages={props.setOpenMessages}
      />
    )}
    {props.openMessages && (
      <Messages
        API_URL={props.API_URL}
        user={props.user}
        clearUserUnreadedMessages={props.clearUserUnreadedMessages}
      />
    )}
    {props.openForum && <Forum API_URL={props.API_URL} user={props.user} />}
    {props.openProfile && (
      <Profile
        API_URL={props.API_URL}
        user={props.user}
        showUserFriends={props.showUserFriends ? true : false}
      />
    )}
  </View>
);

export default LoggedInScreens;
