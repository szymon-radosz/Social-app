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

const ResetPassword = (props: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigation = props.navigation;

  const resetPassword = (): void => {
    try {
      let API_URL = navigation.getParam("API_URL", "");
      axios
        .post(API_URL + "/api/password-reset", {
          email: email
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            setShowAlert(true);
            setAlertType("success");
            setAlertMessage("Sprawdź swoją skrzynkę.");
            setEmail("");
          } else {
            setShowAlert(true);
            setAlertType("success");
            setAlertMessage("Problem ze zresetowaniem hasła.");
          }
        })
        .catch(function(error) {
          setShowAlert(true);
          setAlertType("danger");
          setAlertMessage("Sprawdź poprawność swoich danych.");
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{`Resetuj swoje \nhasło`}</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#919191"
        onChangeText={email => setEmail(email)}
        value={email}
      />

      <TouchableHighlight style={styles.mainBtn} onPress={resetPassword}>
        <Text style={styles.peachBtnText}>Resetuj</Text>
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
export default ResetPassword;
