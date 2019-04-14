import React, { Component } from "react";
import { Button, Text, View, TouchableHighlight } from "react-native";
import styles from "./style";
import NavigationScreenInterface from "./../../interfaces/NavigationScreenInterface";

export default class Welcome extends Component<NavigationScreenInterface> {
  /*constructor(props: WelcomeProps) {
    super(props);
    console.log(props);
  }*/
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>E-mamy</Text>
        <Text style={styles.logoDesc}>Pomocnik kazdej mamy</Text>

        <TouchableHighlight style={styles.loginBtn}>
          <Button
            //style={styles.loginBtn}
            title="Logowanie"
            color="#333333"
            onPress={(): void =>
              navigation.navigate("Login", {
                API_URL: navigation.getParam("API_URL"),
                setUserData: navigation.getParam("setUserData")
              })
            }
          />
        </TouchableHighlight>
        <TouchableHighlight style={styles.registerBtn}>
          <Button
            title="Rejestracja"
            color="#fff"
            onPress={() =>
              navigation.navigate("Register", {
                API_URL: navigation.getParam("API_URL", ""),
                setUserData: navigation.getParam("setUserData")
              })
            }
          />
        </TouchableHighlight>
      </View>
    );
  }
}
