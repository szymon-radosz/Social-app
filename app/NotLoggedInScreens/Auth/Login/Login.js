import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight
} from "react-native";
import styles from "./style.js";
import axios from "axios";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  /*componentDidMount() {
    console.log(["Login", this.props.navigation.state]);
    console.log(["State", this.props.navigation.state.params.API_URL]);
  }*/

  loginUser() {
    if (this.state.email && !this.state.password) {
      showMessage({
        message: "Podaj swoje hasło.",
        type: "danger",
        duration: 2000
      });
    } else if (!this.state.email && this.state.password) {
      showMessage({
        message: "Podaj swój adres e-mail.",
        type: "danger",
        duration: 2000
      });
    } else if (!this.state.email && !this.state.password) {
      showMessage({
        message: "Podaj swój adres e-mail i hasło.",
        type: "danger",
        duration: 2000
      });
    } else if (this.state.email && this.state.password) {
      try {
        let API_URL = this.props.navigation.getParam("API_URL", "");
        let navProps = this.props.navigation.state.params;

        axios
          .post(API_URL + "/api/login", {
            email: this.state.email,
            password: this.state.password
          })
          .then(function(response) {
            //console.log(response.data);

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
                  console.log(["details", response2.data]);

                  navProps.setUserData(response2.data.user);
                })
                .catch(function(error) {
                  console.log(error);

                  showMessage({
                    message: "Sprawdź poprawność swoich danych.",
                    type: "danger",
                    duration: 2000
                  });
                });
            } else {
              console.log("Nie ma tokena");
            }
          })
          .catch(function(error) {
            console.log(error);

            showMessage({
              message: "Sprawdź poprawność swoich danych.",
              type: "danger",
              duration: 2000
            });
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Logowanie</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#919191"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          placeholder="Hasło"
          secureTextEntry={true}
          placeholderTextColor="#919191"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableHighlight style={styles.loginBtn}>
          <Button
            title="Zaloguj"
            color="#fff"
            onPress={() => this.loginUser()}
          />
        </TouchableHighlight>

        <Text style={styles.askDesc}>Nie masz konta? </Text>

        <TouchableHighlight style={styles.registerBtn}>
          <Button
            title="Zarejestruj się za darmo"
            color="#e07b8d"
            onPress={() =>
              this.props.navigation.navigate("Register", {
                API_URL: this.props.navigation.getParam("API_URL", ""),
                setUserData: this.props.navigation.getParam("setUserData")
              })
            }
          />
        </TouchableHighlight>
        <FlashMessage ref="loginFlashMessage" />
      </View>
    );
  }
}
