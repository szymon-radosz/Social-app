import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight
} from "react-native";
import { peachColor } from "./../../assets/global/globalStyles";
import styles from "./style";
import axios from "axios";
import Alert from "./../../Alert/Alert";
import NavigationScreenInterface from "./../../interfaces/NavigationScreenInterface";

interface LoginState {
  email: string;
  password: string;
  alertType: string;
  alertMessage: string;
  showAlert: boolean;
}

export default class Login extends Component<
  NavigationScreenInterface,
  LoginState
> {
  constructor(props: NavigationScreenInterface) {
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

  hideAlert = (): void => {
    this.setState({ showAlert: false });
  };

  loginUser = (): void => {
    const navigation = this.props.navigation;
    const { email, password } = this.state;
    if (email && !password) {
      this.setState({
        showAlert: true,
        alertType: "danger",
        alertMessage: "Podaj swoje hasło."
      });
    } else if (!email && password) {
      this.setState({
        showAlert: true,
        alertType: "danger",
        alertMessage: "Podaj swój adres e-mail."
      });
    } else if (!email && !password) {
      this.setState({
        showAlert: true,
        alertType: "danger",
        alertMessage: "Podaj swój adres e-mail i hasło."
      });
    } else if (email && password) {
      try {
        let API_URL = navigation.getParam("API_URL", "");
        let navProps = navigation.state.params;
        let that = this;
        axios
          .post(API_URL + "/api/login", {
            email: email,
            password: password
          })
          .then(function(response) {
            console.log(response.data);

            if (response.data.status === "OK") {
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

                  if (response2.data.status === "OK") {
                    navProps.setUserData(response2.data.result);
                  }
                })
                .catch(function(error) {
                  console.log(error);

                  that.setState({
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

            that.setState({
              showAlert: true,
              alertType: "danger",
              alertMessage: "Sprawdź poprawność swoich danych."
            });
          });
      } catch (e) {
        console.log(e);
      }
    }
  };
  render() {
    const navigation = this.props.navigation;
    const { email, password, alertType, alertMessage, showAlert } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Logowanie</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#919191"
          onChangeText={email => this.setState({ email })}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Hasło"
          secureTextEntry={true}
          placeholderTextColor="#919191"
          onChangeText={password => this.setState({ password })}
          value={password}
        />
        <TouchableHighlight style={styles.mainBtn}>
          <Button
            title="Zaloguj"
            color="#fff"
            onPress={() => this.loginUser()}
          />
        </TouchableHighlight>

        <Text style={styles.askDesc}>Nie masz konta? </Text>

        <TouchableHighlight style={styles.subMainBtn}>
          <Button
            title="Zarejestruj się za darmo"
            color={peachColor}
            onPress={() =>
              navigation.navigate("Register", {
                API_URL: navigation.getParam("API_URL", ""),
                setUserData: navigation.getParam("setUserData")
              })
            }
          />
        </TouchableHighlight>
        {showAlert != false && (
          <Alert alertType={alertType} alertMessage={alertMessage} />
        )}
      </View>
    );
  }
}
