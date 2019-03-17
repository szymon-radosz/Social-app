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
import Alert from "./../../../Alert/Alert";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      alertMessage: "",
      alertType: "",
      showAlert: false
    };

    this.hideAlert = this.hideAlert.bind(this);
  }

  hideAlert() {
    this.setState({ showAlert: false });
  }

  loginUser() {
    if (this.state.email && !this.state.password) {
      this.setState({
        showAlert: true,
        alertType: "danger",
        alertMessage: "Podaj swoje hasło."
      });
    } else if (!this.state.email && this.state.password) {
      this.setState({
        showAlert: true,
        alertType: "danger",
        alertMessage: "Podaj swój adres e-mail."
      });
    } else if (!this.state.email && !this.state.password) {
      this.setState({
        showAlert: true,
        alertType: "danger",
        alertMessage: "Podaj swój adres e-mail i hasło."
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

                  this.setState({
                    showAlert: true,
                    alertType: "danger",
                    alertMessage: "Sprawdź poprawność swoich danych."
                  });
                });
            } else {
              console.log("Nie ma tokena");
            }
          })
          .catch(function(error) {
            console.log(error);

            this.setState({
              showAlert: true,
              alertType: "danger",
              alertMessage: "Sprawdź poprawność swoich danych."
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
        {this.state.showAlert != false && (
          <Alert
            alertType={this.state.alertType}
            alertMessage={this.state.alertMessage}
          />
        )}
      </View>
    );
  }
}
