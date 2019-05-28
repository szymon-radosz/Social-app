import React from "react";
import {
  TextInput,
  Button,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import styles from "./../style";
import Alert from "./../../../Alert/Alert";

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
      <TouchableHighlight style={styles.buttonCloseModal}>
        <Button
          title="<"
          color="#fff"
          onPress={() => props.hideShowUserMessageBox()}
        />
      </TouchableHighlight>
      <View style={styles.userDetailsHeader}>
        <Text style={styles.userMessageHeader}>Rozpocznij rozmowę</Text>
      </View>

      <TextInput
        multiline={true}
        numberOfLines={10}
        onChangeText={message => props.setUserMessage(message)}
        value={props.userMessage}
        placeholder="Napisz wiadomość..."
        placeholderTextColor="#333"
        style={styles.userMessageTextArea}
      />
      <TouchableHighlight style={styles.userMessageBtn}>
        <Button
          title="Wyślij"
          color="#fff"
          onPress={() => props.sendMessage(props.userMessage)}
        />
      </TouchableHighlight>
      {props.alertMessage != "" && (
        <Alert alertType={props.alertType} alertMessage={props.alertMessage} />
      )}
    </View>
  );
};
export default UserMessageBox;
