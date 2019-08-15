import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import styles from "../../style";
const friendship: any = require("./../../../../assets/images/friendship.png");
const messageNotification: any = require("./../../../../assets/images/messageNotification.png");
const startConversation: any = require("./../../../../assets/images/startConversation.png");
const forumNotification: any = require("./../../../../assets/images/forumNotification.png");

const SingleNotification = (props: any) => (
  <TouchableHighlight
    onPress={() =>
      props.notification.type === "sended_message"
        ? props.navigation.navigate("ConversationDetails", {
            conversationId: props.notification.open_details_id,
            receiverId: props.notification.sender_id
          })
        : props.notification.type === "started_conversation_user"
        ? props.navigation.navigate("ConversationDetails", {
            conversationId: props.notification.open_details_id,
            receiverId: props.notification.sender_id
          })
        : props.notification.type === "friendship_invitation"
        ? props.navigation.navigate("UserDetails", {
            userId: props.notification.sender_id,
            showBtns: true
          })
        : props.notification.type === "friendship_confirmation"
        ? props.navigation.navigate("UserDetails", {
            userId: props.notification.sender_id,
            showBtns: true
          })
        : props.notification.type === "comment_for_your_forum_post"
        ? props.navigation.navigate("PostDetails", {
            postId: props.notification.open_details_id
          })
        : null
    }
    underlayColor={"#fff"}
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
        <View style={{ paddingRight: 15 }}>
          <Text style={styles.productOnListTextCategory}>
            {props.notification.message}
          </Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

export default SingleNotification;
