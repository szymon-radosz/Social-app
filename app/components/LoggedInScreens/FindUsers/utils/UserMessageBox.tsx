import React from "react";
import { TextInput, Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";

const UserMessageBox = (props: {
  hideShowUserMessageBox: any;
  setUserMessage: any;
  userMessage: string;
  sendMessage: any;
  alertMessage: string;
  alertType: string;
}): any => {
  return (
    <View style={styles.relative}>
      <PageHeader
        boldText={"Rozpocznij rozmowę"}
        normalText={""}
        closeMethod={props.hideShowUserMessageBox}
        closeMethodParameter={""}
      />

      <View style={{ paddingTop: 10 }}>
        <TextInput
          multiline={true}
          numberOfLines={10}
          maxLength={500}
          onChangeText={message => props.setUserMessage(message)}
          value={props.userMessage}
          placeholder="Napisz wiadomość..."
          placeholderTextColor="#333"
          style={styles.userMessageTextArea}
        />
      </View>

      <TouchableHighlight
        style={styles.userDetailsRedirectMessageBtn}
        onPress={() => props.sendMessage(props.userMessage)}
      >
        <Text style={styles.peachBtnText}>Wyślij</Text>
      </TouchableHighlight>
    </View>
  );
};
export default UserMessageBox;
