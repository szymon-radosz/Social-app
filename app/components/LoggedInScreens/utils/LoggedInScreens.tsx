import React from "react";
import { ScrollView } from "react-native";
import FindUsers from "./../FindUsers/FindUsers";
import Auctions from "./../Auctions/Auctions";
import Messages from "./../Messages/Messages";
import Forum from "./../Forum/Forum";
import Profile from "./../Profile/Profile";

import FeedbackModal from "./FeedbackModal";

const LoggedInScreens = (props: any) => (
  <ScrollView>
    {props.openFindUsers && !props.showFeedbackModal && (
      <FindUsers
        API_URL={props.API_URL}
        user={props.user}
        openMessages={props.setOpenMessages}
        setOpenProfile={props.setOpenProfile}
        openFindUserId={props.openFindUserId}
      />
    )}
    {props.openAuctions && !props.showFeedbackModal && (
      <Auctions
        API_URL={props.API_URL}
        user={props.user}
        openMessages={props.setOpenMessages}
        openAuctionId={props.openAuctionId}
        openAuctionUserId={props.openAuctionUserId}
      />
    )}
    {props.openMessages && !props.showFeedbackModal && (
      <Messages
        API_URL={props.API_URL}
        user={props.user}
        clearUserUnreadedMessages={props.clearUserUnreadedMessages}
      />
    )}
    {props.openForum && !props.showFeedbackModal && (
      <Forum API_URL={props.API_URL} user={props.user} />
    )}
    {props.openProfile && !props.showFeedbackModal && (
      <Profile
        API_URL={props.API_URL}
        user={props.user}
        showUserFriends={props.showUserFriends ? true : false}
        setOpenFindUsers={props.setOpenFindUsers}
        setOpenAuctions={props.setOpenAuctions}
        navigation={props.navigation}
        openMessages={props.setOpenMessages}
        openForum={props.setOpenForum}
        clearUserData={props.clearUserData}
      />
    )}

    {props.showFeedbackModal && (
      <FeedbackModal
        setFeedbackMessage={props.setFeedbackMessage}
        feedbackMessage={props.feedbackMessage}
        sendFeedback={props.sendFeedback}
        feedbackTopic={props.feedbackTopic}
        setFeedbackTopic={props.setFeedbackTopic}
        activeTopic={props.activeTopic}
      />
    )}
  </ScrollView>
);

export default LoggedInScreens;
