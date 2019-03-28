import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from "react-native";
import styles from "./style";

const ConversationBox = props => {
  console.log(["props", props]);
  return (
    <TouchableHighlight
      onPress={() => {
        props.openConversationDetails(
          props.conversation.id,
          props.conversation.receiverId,
          props.conversation.receiverName,
          props.conversation.receiverEmail,
          props.conversation.receiverPhotoPath
        );
      }}
    >
      <View style={styles.conversationBoxContainer}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: `${props.API_URL}userPhotos/${
                props.conversation.receiverPhotoPath
              }`
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text>{props.conversation.receiverName}</Text>
        <Text>{props.conversation.messages[0].updated_at}</Text>
        <Text
          style={
            props.conversation.userHadUnreadedMessages
              ? styles.unreadedConversation
              : styles.readedConversation
          }
        >
          {
            props.conversation.messages[props.conversation.messages.length - 1]
              .message
          }
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default ConversationBox;
