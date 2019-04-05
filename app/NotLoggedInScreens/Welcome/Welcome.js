import React, { Component } from "react";
import { Button, Text, View, TouchableHighlight } from "react-native";
import styles from "./style.js";

const Welcome = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>E-mamy</Text>
      <Text style={styles.logoDesc}>Pomocnik kazdej mamy</Text>

      <TouchableHighlight style={styles.loginBtn}>
        <Button
          style={styles.loginBtn}
          title="Logowanie"
          color="#333333"
          onPress={() =>
            props.navigation.navigate("Login", {
              API_URL: props.navigation.getParam("API_URL", ""),
              setUserData: props.navigation.getParam("setUserData")
            })
          }
        />
      </TouchableHighlight>
      <TouchableHighlight style={styles.registerBtn}>
        <Button
          title="Rejestracja"
          color="#fff"
          onPress={() =>
            props.navigation.navigate("Register", {
              API_URL: props.navigation.getParam("API_URL", ""),
              setUserData: props.navigation.getParam("setUserData")
            })
          }
        />
      </TouchableHighlight>
    </View>
  );
};

export default Welcome;
