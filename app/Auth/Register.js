import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Alert
} from "react-native";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", passwordConf: "" };

    this.registerUser = this.registerUser.bind(this);
  }

  registerUser() {
    if (this.state.password === this.state.passwordConf) {
      try {
        console.log([this.state.name, this.state.email, this.state.password]);
        let API_URL = this.props.navigation.getParam("API_URL", "");
        let navProps = this.props.navigation.state.params;

        axios
          .post(API_URL + "/api/register", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          })
          .then(function(response) {
            console.log(response.data);

            navProps.setUserData(response.data.user);
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("passwords dont match");
    }
  }

  componentDidMount() {
    console.log(this.props.navigation.getParam("API_URL", ""));
  }

  render() {
    return (
      <View>
        <Text>Rejestracja</Text>

        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />

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

        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={passwordConf => this.setState({ passwordConf })}
          value={this.state.passwordConf}
        />

        <Button title="Zarejestruj mnie" onPress={() => this.registerUser()} />

        <Text>Posiadasz juz konto? </Text>
        <Button
          title="Zaloguj się"
          onPress={() =>
            this.props.navigation.navigate("Login", {
              API_URL: this.props.navigation.getParam("API_URL", ""),
              setUserData: this.props.navigation.getParam("setUserData")
            })
          }
        />
      </View>
    );
  }
}
