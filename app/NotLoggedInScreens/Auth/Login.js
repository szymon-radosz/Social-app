import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from "react-native";
import axios from "axios";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  componentDidMount() {
    console.log(["Login", this.props.navigation.state]);
    console.log(["State", this.props.navigation.state.params.API_URL]);
  }

  loginUser() {
    if (this.state.email && this.state.password) {
      try {
        let API_URL = this.props.navigation.getParam("API_URL", "");
        let navProps = this.props.navigation.state.params;

        axios
          .post(API_URL + "/api/login", {
            email: this.state.email,
            password: this.state.password
          })
          .then(function(response) {
            console.log(response.data);

            if (response.data.user.token) {
              let token = response.data.user.token;

              //console.log(["token", `Bearer ${token}`]);

              const config = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json"
              };

              //console.log(config);

              axios
                .post(API_URL + "/api/details", {}, { headers: config })
                .then(function(response2) {
                  console.log(response2.data);

                  navProps.setUserData(response2.data.user);
                })
                .catch(function(error) {
                  console.log(error);
                });
            } else {
              console.log("Nie ma tokena");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
  render() {
    return (
      <View>
        <Text>Logowanie</Text>

        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <Button title="Zaloguj" onPress={() => this.loginUser()} />

        <Text>Nie masz konta? </Text>
        <Button
          title="Zarejestruj się za darmo"
          onPress={() =>
            this.props.navigation.navigate("Register", {
              API_URL: this.props.navigation.getParam("API_URL", ""),
              setUserData: this.props.navigation.getParam("setUserData")
            })
          }
        />
      </View>
    );
  }
}
