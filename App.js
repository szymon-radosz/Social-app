import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Main from "./app/Main";
import Welcome from "./app/Welcome/Welcome";
import Login from "./app/Auth/Login";
import Register from "./app/Auth/Register";
import ConfirmAccount from "./app/ConfirmAccount/ConfirmAccount";
import FindUsers from "./app/FindUsers/FindUsers";
import FillNecessaryInfo from "./app/FillNecessaryInfo/FillNecessaryInfo";
import { createStackNavigator, createAppContainer } from "react-navigation";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const RootStack = createStackNavigator(
  {
    Welcome: Welcome,
    Login: Login,
    Register: Register,
    Main: Main,
    ConfirmAccount: ConfirmAccount,
    FindUsers: FindUsers,
    FillNecessaryInfo: FillNecessaryInfo
  },
  {
    initialRouteName: "Main"
  }
);

const AppContainer = createAppContainer(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
