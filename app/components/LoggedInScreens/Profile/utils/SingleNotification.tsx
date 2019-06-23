import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./../style";
const friendship: any = require("./../../../../assets/images/friendship.png");
const messageNotification: any = require("./../../../../assets/images/messageNotification.png");
const startConversation: any = require("./../../../../assets/images/startConversation.png");
const forumNotification: any = require("./../../../../assets/images/forumNotification.png");

const SingleNotification = (props: any) => (
  <TouchableHighlight
    onPress={() =>
      props.notification.type === "sended_message"
        ? props.openMessages()
        : props.notification.type === "started_conversation_user"
        ? props.openMessages()
        : props.notification.type === "friendship_invitation"
        ? props.loadUserFriendsList()
        : props.notification.type === "friendship_confirmation"
        ? props.loadUserFriendsList()
        : props.notification.type === "comment_for_your_forum_post"
        ? props.openForum()
        : null
    }
  >
    <View
      style={
        props.notification.status === 0
          ? styles.singleNotificationContainerActive
          : styles.singleNotificationContainer
      }
    >
      {props.notification.type === "comment_for_your_forum_post" && (
        <Image
          style={{
            width: 50,
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto"
          }}
          source={forumNotification}
        />
      )}
      {props.notification.type === "started_conversation_user" && (
        <Image
          style={{
            width: 50,
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto"
          }}
          source={startConversation}
        />
      )}
      {props.notification.type === "sended_message" && (
        <Image
          style={{
            width: 50,
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto"
          }}
          source={messageNotification}
        />
      )}
      {props.notification.type === "friendship_invitation" && (
        <Image
          style={{
            width: 50,
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto"
          }}
          source={friendship}
        />
      )}
      {props.notification.type === "friendship_confirmation" && (
        <Image
          style={{
            width: 50,
            height: 50,
            marginBottom: 10,
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto"
          }}
          source={friendship}
        />
      )}

      <View style={styles.productListSingleProductTextContainer}>
        <Text style={styles.productOnListTextCategory}>
          {props.notification.message}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
);

export default SingleNotification;
