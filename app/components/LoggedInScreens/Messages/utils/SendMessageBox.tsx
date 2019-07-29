import React, { useContext } from "react";
import { View } from "react-native";
import ButtonComponent from "./../../../Utils/ButtonComponent";
import styles from "./../style";
import InputComponent from "./../../../Utils/InputComponent";
import { GlobalContext } from "./../../../Context/GlobalContext";

const SendMessageBox = (props: {
  sendMessage: any;
  receiverId: number;
  receiverName: string;
  receiverEmail: string;
  receiverPhotoPath: string;
  userMessage: string;
  setUserMessage: any;
  conversationId: number;
}): any => {
  const context = useContext(GlobalContext);

  return (
    <React.Fragment>
      <View style={styles.messageBoxContainer}>
        <InputComponent
          placeholder="Napisz odpowiedź..."
          inputOnChange={(message: string) => props.setUserMessage(message)}
          value={props.userMessage}
          secureTextEntry={false}
          maxLength={400}
        />
      </View>
      <ButtonComponent
        pressButtonComponent={(): any =>
          props.sendMessage(
            //@ts-ignore
            context.userData.id,
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
