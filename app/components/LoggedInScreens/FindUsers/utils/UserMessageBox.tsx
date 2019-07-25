import React from "react";
import { View } from "react-native";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../../Utils/ButtonComponent";
import TextAreaComponent from "./../../../Utils/TextAreaComponent";

const UserMessageBox = (props: {
  hideShowUserMessageBox: any;
  setUserMessage: any;
  userMessage: string;
  sendMessage: any;
}): any => {
  return (
    <View style={styles.relative}>
      <PageHeader
        boldText={"Rozpocznij rozmowę"}
        normalText={""}
        closeMethod={props.hideShowUserMessageBox}
        closeMethodParameter={""}
      />

      <View style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>
        <TextAreaComponent
          placeholder="Napisz wiadomość..."
          inputOnChange={(message: string) => props.setUserMessage(message)}
          value={props.userMessage}
          maxLength={500}
          multiline={true}
          numberOfLines={10}
        />
      </View>

      <ButtonComponent
        pressButtonComponent={() => props.sendMessage(props.userMessage)}
        buttonComponentText="Wyślij"
        fullWidth={true}
        underlayColor="#dd904d"
      />
    </View>
  );
};
export default UserMessageBox;
