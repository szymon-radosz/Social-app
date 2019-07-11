import React from "react";
import { View } from "react-native";
import ButtonComponent from "./../../../Utils/ButtonComponent";
import styles from "./../style";
import InputComponent from "./../../../Utils/InputComponent";

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
    <React.Fragment>
      <View style={styles.messageBoxContainer}>
        <InputComponent
          placeholder="Napisz odpowiedź..."
          inputOnChange={(message: string) => props.setUserMessage(message)}
          value={props.userMessage}
          secureTextEntry={true}
          maxLength={400}
        />
      </View>
      <ButtonComponent
        pressButtonComponent={() =>
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
        buttonComponentText="Wyślij"
        fullWidth={true}
        underlayColor="#dd904d"
      />
    </React.Fragment>
  );
};
export default SendMessageBox;
