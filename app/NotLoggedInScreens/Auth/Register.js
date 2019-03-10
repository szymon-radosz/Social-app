import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  TouchableHighlight,
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
      <View style={styles.container}>
        <Text style={styles.headerText}>Rejestracja</Text>

        <TextInput
          style={styles.input}
          placeholder="Imię"
          placeholderTextColor="#919191"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />

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

        <TextInput
          style={styles.input}
          placeholder="Potwierdź hasło"
          placeholderTextColor="#919191"
          onChangeText={passwordConf => this.setState({ passwordConf })}
          value={this.state.passwordConf}
        />
        <TouchableHighlight style={styles.loginBtn}>
          <Button
            title="Zarejestruj mnie"
            color="#fff"
            onPress={() => this.registerUser()}
          />
        </TouchableHighlight>

        <Text style={styles.askDesc}>Posiadasz juz konto? </Text>

        <TouchableHighlight style={styles.registerBtn}>
          <Button
            title="Zaloguj się"
            color="#e07b8d"
            onPress={() =>
              this.props.navigation.navigate("Login", {
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
