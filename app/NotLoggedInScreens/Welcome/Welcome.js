import React, { Component } from "react";
import { Button, Text, View, TouchableHighlight } from "react-native";
import styles from "./style.js";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
              this.props.navigation.navigate("Login", {
                API_URL: this.props.navigation.getParam("API_URL", ""),
                setUserData: this.props.navigation.getParam("setUserData")
              })
            }
          />
        </TouchableHighlight>
        <TouchableHighlight style={styles.registerBtn}>
          <Button
            title="Rejestracja"
            color="#fff"
            onPress={() =>
              this.props.navigation.navigate("Register", {
                API_URL: this.props.navigation.getParam("API_URL", ""),
                setUserData: this.props.navigation.getParam("setUserData")
              })
            }
          />
        </TouchableHighlight>
      </View>
    );
  }
}
