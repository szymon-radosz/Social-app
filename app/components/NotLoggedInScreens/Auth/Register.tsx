import React, { Component } from "react";
import {
  TextInput,
  Text,
  View,
  Button,
  TouchableHighlight
} from "react-native";
import { peachColor } from "./../../../assets/global/globalStyles";
import axios from "axios";
import styles from "./style";
import Alert from "./../../../Alert/Alert";

interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}

interface RegisterState {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
  alertMessage: string;
  alertType: string;
  showAlert: boolean;
}

export default class Register extends Component<
  NavigationScreenInterface,
  RegisterState
> {
  constructor(props: NavigationScreenInterface) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConf: "",
      alertMessage: "",
      alertType: "",
      showAlert: false
    };

    this.registerUser = this.registerUser.bind(this);
  }

  registerUser = (): void => {
    const navigation = this.props.navigation;
    const { name, email, password, passwordConf } = this.state;
    if (!name || !email || !password || !passwordConf) {
      this.setState({
        showAlert: true,
        alertType: "danger",
        alertMessage: "Wszystkie pola są wymagane."
      });
    } else if (password !== passwordConf) {
      this.setState({
        showAlert: true,
        alertType: "danger",
        alertMessage: "Hasło i potwierdzenie hasła muszą być identyczne."
      });
    } else if (password === passwordConf) {
      try {
        console.log([name, email, password]);
        let API_URL = navigation.getParam("API_URL", "");
        let navProps = navigation.state.params;

        let that = this;

        console.log(API_URL);

        axios
          .post(API_URL + "/api/register", {
            name: name,
            email: email,
            password: password
          })
          .then(function(response) {
            console.log(["register", response]);
            console.log(response.data);

            if (response.data.status === "OK") {
              that.setState({
                showAlert: true,
                alertType: "success",
                alertMessage:
                  "Sprawdź swoją skrzynkę mailową i potwierdź swoje konto przez otrzymaną od nas wiadomość."
              });

              navProps.setUserData(response.data.user);
            }
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
  };

  render() {
    const navigation = this.props.navigation;
    const {
      name,
      email,
      password,
      passwordConf,
      alertMessage,
      alertType,
      showAlert
    } = this.state;
    return (
      <View style={styles.container}>
        <Text
          style={styles.headerText}
        >{`Dołącz do naszej \nspołeczności!`}</Text>

        <TextInput
          style={styles.input}
          placeholder="Imię"
          placeholderTextColor="#919191"
          onChangeText={name => this.setState({ name })}
          value={name}
        />

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

        <TextInput
          style={styles.input}
          placeholder="Potwierdź hasło"
          secureTextEntry={true}
          placeholderTextColor="#919191"
          onChangeText={passwordConf => this.setState({ passwordConf })}
          value={passwordConf}
        />
        <TouchableHighlight style={styles.mainBtn}>
          <Button
            title="Zarejestruj"
            color="#fff"
            onPress={() => this.registerUser()}
          />
        </TouchableHighlight>

        <Text style={styles.askDesc}>Posiadasz juz konto? </Text>

        <TouchableHighlight>
          <Button
            title="Zaloguj się"
            color={peachColor}
            onPress={() =>
              navigation.navigate("Login", {
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
