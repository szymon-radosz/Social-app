import React from "react";
import { ScrollView } from "react-native";
import FindUsers from "./../FindUsers/FindUsers";
import Auctions from "./../Auctions/Auctions";
import Messages from "./../Messages/Messages";
import Forum from "./../Forum/Forum";
import Profile from "./../Profile/Profile";

const LoggedInScreens = (props: any) => (
  <ScrollView>
    {props.openFindUsers && (
      <FindUsers
        API_URL={props.API_URL}
        user={props.user}
        openMessages={props.setOpenMessages}
        setOpenProfile={props.setOpenProfile}
        openFindUserId={props.openFindUserId}
      />
    )}
    {props.openAuctions && (
      <Auctions
        API_URL={props.API_URL}
        user={props.user}
        openMessages={props.setOpenMessages}
        openAuctionId={props.openAuctionId}
        openAuctionUserId={props.openAuctionUserId}
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
        setOpenFindUsers={props.setOpenFindUsers}
        setOpenAuctions={props.setOpenAuctions}
        navigation={props.navigation}
      />
    )}
  </ScrollView>
);

export default LoggedInScreens;
