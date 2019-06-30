import React from "react";
import { Button, Text, View, TouchableHighlight } from "react-native";
import { peachColor } from "./../../../assets/global/globalStyles";
import styles from "./style";

const ConfirmAccount = (props: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.headerText}
      >{`Potwierdź swój adres e-mail, żeby \zacząć używać e-mamy!`}</Text>
      <TouchableHighlight>
        <Button
          title="Zaloguj się"
          color={peachColor}
          onPress={() =>
            props.navigation.navigate("Login", {
              API_URL: props.navigation.getParam("API_URL", ""),
              setUserData: props.navigation.getParam("setUserData")
            })
          }
        />
      </TouchableHighlight>
    </View>
  );
};
export default ConfirmAccount;
