import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight
} from "react-native";
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
      setShowAlert(false);
      setShowAlert(true);
      setAlertType("danger");
      setAlertMessage("Podaj swoje hasło.");
    } else if (!email && password) {
      setShowAlert(false);
      setShowAlert(true);
      setAlertType("danger");
      setAlertMessage("Podaj swój adres e-mail.");
    } else if (!email && !password) {
      setShowAlert(false);
      setShowAlert(true);
      setAlertType("danger");
      setAlertMessage("Podaj swój adres e-mail i hasło.");
    } else if (email && password) {
      console.log([
        email,
        password,
        navigation.getParam("API_URL", ""),
        navigation.state.params
      ]);
      try {
        let API_URL = navigation.getParam("API_URL", "");
        let navProps = navigation.state.params;
        axios
          .post(API_URL + "/api/login", {
            email: email,
            password: password
          })
          .then(function(response) {
            if (response.data.status === "OK") {
              console.log(["response.data.user", response.data]);
              let token = response.data.user.token;

              const config = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json"
              };

              axios
                .post(API_URL + "/api/details", {}, { headers: config })
                .then(function(response2) {
                  console.log(response2);
                  if (response2.data.status === "OK") {
                    navProps.setUserData(response2.data.result);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                  setShowAlert(false);
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
      <TouchableHighlight
        style={styles.mainBtn}
        onPress={loginUser}
        underlayColor={"#dd904d"}
      >
        <Text style={styles.peachBtnText}>Zaloguj</Text>
      </TouchableHighlight>

      <View style={styles.subBtnSection}>
        <Text style={styles.subBtnSectionAsk}>Nie posiadasz konta? </Text>
        <TouchableHighlight
          onPress={() =>
            navigation.navigate("Register", {
              API_URL: navigation.getParam("API_URL", ""),
              setUserData: navigation.getParam("setUserData")
            })
          }
          underlayColor={"#fff"}
        >
          <Text style={styles.registerBtn}>Rejestracja</Text>
        </TouchableHighlight>
      </View>

      <Text
        style={styles.resetPasswordBtn}
        onPress={() =>
          navigation.navigate("ResetPassword", {
            API_URL: navigation.getParam("API_URL", ""),
            setUserData: navigation.getParam("setUserData")
          })
        }
      >
        Resetuj hasło
      </Text>

      {showAlert != false && (
        <Alert alertType={alertType} alertMessage={alertMessage} />
      )}
    </View>
  );
};
export default Login;
