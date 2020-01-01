import React from "react";
import { View } from "react-native";
import ButtonComponent from "./../../Utils/ButtonComponent";
import styles from "./../style";
import InputComponent from "./../../Utils/InputComponent";
import lang from "./../../../assets/lang/Messages/utils/SendMessageBox";

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
  //console.log(["SendMessageBox", props]);
  /*console.log([
    "SendMessageBox sendMessage",
    props.receiverId,
    props.receiverName,
    props.receiverEmail,
    props.receiverPhotoPath,
    props.userMessage,
    props.conversationId,
    0
  ]);*/
  return (
    <React.Fragment>
      <View style={styles.messageBoxContainer}>
        <InputComponent
          placeholder={lang.message["en"]}
          inputOnChange={(message: string) => props.setUserMessage(message)}
          value={props.userMessage}
          secureTextEntry={false}
          maxLength={400}
        />
      </View>
      <View style={{ marginBottom: 15 }}>
        <ButtonComponent
          pressButtonComponent={async () => {
            await props.sendMessage(
              //@ts-ignore
              props.receiverId,
              props.userMessage,
              props.conversationId,
              0
            );
            await props.setUserMessage("");
          }}
          buttonComponentText={lang.sendMessage["en"]}
          fullWidth={true}
          underlayColor="#dd904d"
          whiteBg={false}
          showBackIcon={false}
        />
      </View>
    </React.Fragment>
  );
};
export default SendMessageBox;
