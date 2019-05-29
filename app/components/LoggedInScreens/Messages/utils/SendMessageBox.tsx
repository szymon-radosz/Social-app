import React from "react";
import {
  Button,
  TextInput,
  TouchableHighlight,
  Text,
  View
} from "react-native";
import styles from "./../style";

const SendMessageBox = (props: {
  sendMessage: any;
  senderId: number;
  receiverId: number;
  receiverName: string;
  receiverEmail: string;
  receiverPhotoPath: string;
  userMessage: string;
  setUserMessage: any;
  conversationId: number;
}): any => {
  return (
    <View>
      <View
        style={{
          borderTopColor: "#E5E5E5",
          borderTopWidth: 1,
          marginTop: 5
        }}
      />

      <TextInput
        style={{
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          padding: 10,
          height: 40,
          borderWidth: 1,
          borderRadius: 6
        }}
        placeholder="Napisz odpowiedź..."
        placeholderTextColor="#919191"
        onChangeText={message => props.setUserMessage(message)}
        value={props.userMessage}
      />
      <TouchableHighlight style={styles.sendMessageBtn}>
        <Button
          title="Wyślij"
          color="#fff"
          onPress={() =>
            props.sendMessage(
              props.senderId,
              props.receiverId,
              props.receiverName,
              props.receiverEmail,
              props.receiverPhotoPath,
              props.userMessage,
              props.conversationId,
              0
            )
          }
        />
      </TouchableHighlight>
    </View>
  );
};
export default SendMessageBox;
