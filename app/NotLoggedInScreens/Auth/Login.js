import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import { createStackNavigator, createAppContainer } from "react-navigation";

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  headerText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 24,
    marginTop: 40,
    paddingBottom: 20
  },
  logoDesc: {
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
    fontSize: 16,
    paddingBottom: 30
  },
  input: {
    width: "90%",
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  loginBtn: {
    height: 45,
    width: 180,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 30
  },
  askDesc: {
    fontSize: 14,
    fontWeight: "300"
  },
  registerBtn: {}
});
