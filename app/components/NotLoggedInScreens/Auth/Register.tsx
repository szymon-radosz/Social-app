import React, { useState } from "react";
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

const Register = (props: { navigation: any }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigation = props.navigation;

  const registerUser = (): void => {
    if (!name || !email || !password || !passwordConf) {
      setShowAlert(false);
      setShowAlert(true);
      setAlertType("danger");
      setAlertMessage("Wszystkie pola są wymagane.");
    } else if (password !== passwordConf) {
      setShowAlert(false);
      setShowAlert(true);
      setAlertType("danger");
      setAlertMessage("Hasło i potwierdzenie hasła muszą być identyczne.");
    } else if (password === passwordConf) {
      try {
        let API_URL = navigation.getParam("API_URL", "");
        let navProps = navigation.state.params;

        axios
          .post(API_URL + "/api/register", {
            name: name,
            email: email,
            password: password
          })
          .then(function(response) {
            if (response.data.status === "OK") {
              setShowAlert(false);
              setShowAlert(true);
              setAlertType("success");
              setAlertMessage(
                "Sprawdź swoją skrzynkę mailową i potwierdź swoje konto przez otrzymaną od nas wiadomość."
              );

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

  return (
    <View style={styles.container}>
      <Text
        style={styles.headerText}
      >{`Dołącz do naszej \nspołeczności!`}</Text>

      <TextInput
        style={styles.input}
        placeholder="Imię"
        placeholderTextColor="#919191"
        onChangeText={name => setName(name)}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#919191"
        onChangeText={email => setEmail(email)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry={true}
        placeholderTextColor="#919191"
        onChangeText={password => setPassword(password)}
        value={password}
      />

      <TextInput
        style={styles.input}
        placeholder="Potwierdź hasło"
        secureTextEntry={true}
        placeholderTextColor="#919191"
        onChangeText={passwordConf => setPasswordConf(passwordConf)}
        value={passwordConf}
      />
      <TouchableHighlight style={styles.mainBtn} onPress={registerUser}>
        <Text style={styles.peachBtnText}>Zarejestruj</Text>
      </TouchableHighlight>

      <View style={styles.subBtnSection}>
        <Text style={styles.subBtnSectionAsk}>Posiadasz juz konto? </Text>
        <TouchableHighlight>
          <Text
            style={styles.registerBtn}
            onPress={() =>
              navigation.navigate("Login", {
                API_URL: navigation.getParam("API_URL", ""),
                setUserData: navigation.getParam("setUserData")
              })
            }
          >
            Logowanie
          </Text>
        </TouchableHighlight>
      </View>

      {showAlert != false && (
        <Alert alertType={alertType} alertMessage={alertMessage} />
      )}
    </View>
  );
};
export default Register;
