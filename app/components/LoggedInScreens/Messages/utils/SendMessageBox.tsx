import React from "react";
import { Button, TextInput, TouchableHighlight, View } from "react-native";
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
      <View style={styles.sendMessageBoxContainer} />

      <TextInput
        style={styles.sendMessageBoxInput}
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
