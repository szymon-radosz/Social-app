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
      <View style={{ borderWidth: 1, width: "100%" }}>
        <TouchableOpacity>
          <Image
            style={{ width: 45, height: 45 }}
            source={{
              uri: `${props.API_URL}userPhotos/${
                props.conversation.receiverPhotoPath
              }`
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text>{props.conversation.receiverEmail}</Text>
        <Text>{props.conversation.messages[0].updated_at}</Text>
        <Text
          style={{
            color: props.conversation.userHadUnreadedMessages ? "blue" : "#000"
          }}
        >
          {props.conversation.messages[0].message}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default ConversationBox;
