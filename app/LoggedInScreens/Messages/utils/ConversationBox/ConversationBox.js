import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

const ConversationBox = props => {
  console.log(["props", props]);
  return (
    <View>
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
      <Text>{props.conversation.messages[0].message}</Text>
    </View>
  );
};

export default ConversationBox;
