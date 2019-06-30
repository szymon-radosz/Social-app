import React, { Suspense } from "react";
import { ScrollView, Text } from "react-native";

const FindUsers = React.lazy(() => import("./../FindUsers/FindUsers"));
const Auctions = React.lazy(() => import("./../Auctions/Auctions"));
const Messages = React.lazy(() => import("./../Messages/Messages"));
const Forum = React.lazy(() => import("./../Forum/Forum"));
const Profile = React.lazy(() => import("./../Profile/Profile"));
const FeedbackModal = React.lazy(() => import("./FeedbackModal"));

const LoggedInScreens = (props: any) => (
  <ScrollView>
    {props.openFindUsers && !props.showFeedbackModal && (
      <Suspense fallback={<Text>Wczytywanie...</Text>}>
        <FindUsers
          API_URL={props.API_URL}
          user={props.user}
          openMessages={props.setOpenMessages}
          setOpenProfile={props.setOpenProfile}
          openFindUserId={props.openFindUserId}
        />
      </Suspense>
    )}

    {props.openAuctions && !props.showFeedbackModal && (
      <Suspense fallback={<Text>Wczytywanie...</Text>}>
        <Auctions
          API_URL={props.API_URL}
          user={props.user}
          openMessages={props.setOpenMessages}
          openAuctionId={props.openAuctionId}
          openAuctionUserId={props.openAuctionUserId}
        />
      </Suspense>
    )}

    {props.openMessages && !props.showFeedbackModal && (
      <Suspense fallback={<Text>Wczytywanie...</Text>}>
        <Messages
          API_URL={props.API_URL}
          user={props.user}
          clearUserUnreadedMessages={props.clearUserUnreadedMessages}
        />
      </Suspense>
    )}

    {props.openForum && !props.showFeedbackModal && (
      <Suspense fallback={<Text>Wczytywanie...</Text>}>
        <Forum API_URL={props.API_URL} user={props.user} />
      </Suspense>
    )}

    {props.openProfile && !props.showFeedbackModal && (
      <Suspense fallback={<Text>Wczytywanie...</Text>}>
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
          clearUserNotificationsStatus={props.clearUserNotificationsStatus}
        />
      </Suspense>
    )}

    {props.showFeedbackModal && (
      <Suspense fallback={<Text>Wczytywanie...</Text>}>
        <FeedbackModal
          setFeedbackMessage={props.setFeedbackMessage}
          feedbackMessage={props.feedbackMessage}
          sendFeedback={props.sendFeedback}
          feedbackTopic={props.feedbackTopic}
          setFeedbackTopic={props.setFeedbackTopic}
          activeTopic={props.activeTopic}
        />
      </Suspense>
    )}
  </ScrollView>
);

export default LoggedInScreens;
