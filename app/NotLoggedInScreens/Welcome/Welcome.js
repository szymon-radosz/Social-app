import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableHighlight
} from "react-native";
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(["welcome", this.props.navigation.state]);
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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: {
    textAlign: "center",
    color: "#333",
    fontWeight: "800",
    fontSize: 24,
    paddingBottom: 10
  },
  logoDesc: {
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
    fontSize: 16,
    paddingBottom: 30
  },
  loginBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 20
  },
  registerBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 20
  }
});
