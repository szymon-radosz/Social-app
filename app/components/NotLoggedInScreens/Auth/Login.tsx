import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight
} from "react-native";
import { peachColor } from "./../../../assets/global/globalStyles";
import styles from "./style";
import axios from "axios";
import Alert from "./../../../Alert/Alert";

const Login = (props: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigation = props.navigation;

  const loginUser = (): void => {
    if (email && !password) {
      setShowAlert(true);
      setAlertType("danger");
      setAlertMessage("Podaj swoje hasło.");
    } else if (!email && password) {
      setShowAlert(true);
      setAlertType("danger");
      setAlertMessage("Podaj swój adres e-mail.");
    } else if (!email && !password) {
      setShowAlert(true);
      setAlertType("danger");
      setAlertMessage("Podaj swój adres e-mail i hasło.");
    } else if (email && password) {
      try {
        let API_URL = navigation.getParam("API_URL", "");
        let navProps = navigation.state.params;
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

                  setShowAlert(true);
                  setAlertType("danger");
                  setAlertMessage("Sprawdź poprawność swoich danych.");
                });
            } else {
              console.log("Nie ma tokena");
            }
          })
          .catch(function(error) {
            console.log(error);

            setShowAlert(true);
            setAlertType("danger");
            setAlertMessage("Sprawdź poprawność swoich danych.");
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{`Miło Cię widzieć \nponownie!`}</Text>

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
      <TouchableHighlight style={styles.mainBtn}>
        <Button title="Zaloguj" color="#fff" onPress={loginUser} />
      </TouchableHighlight>

      <Text style={styles.askDesc}>Nie masz konta? </Text>

      <TouchableHighlight>
        <Button
          title="Zarejestruj się"
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
};
export default Login;
