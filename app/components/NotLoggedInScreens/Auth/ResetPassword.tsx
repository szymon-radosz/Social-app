import React, { useState, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableHighlight
} from "react-native";
import styles from "./style";
import axios from "axios";
import { GlobalContext } from "./../../Context/GlobalContext";

const ResetPassword = (props: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const navigation = props.navigation;
  const context = useContext(GlobalContext);

  const resetPassword = (): void => {
    try {
      let API_URL = navigation.getParam("API_URL", "");
      axios
        .post(API_URL + "/api/password-reset", {
          email: email
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            context.setAlert(true, "success", "Sprawdź swoją skrzynkę.");
          } else {
            context.setAlert(true, "danger", "Problem ze zresetowaniem hasła.");
          }
        })
        .catch(function(error) {
          context.setAlert(true, "danger", "Sprawdź poprawność swoich danych.");
        });
    } catch (e) {
      context.setAlert(true, "danger", "Problem ze zresetowaniem hasła.");
    }
  };

  return (
    <React.Fragment>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <View style={styles.container}>
          <Text style={styles.headerText}>{`Resetuj swoje \nhasło`}</Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#919191"
            onChangeText={email => setEmail(email)}
            value={email}
          />

          <TouchableHighlight
            style={styles.mainBtn}
            onPress={resetPassword}
            underlayColor={"#dd904d"}
          >
            <Text style={styles.peachBtnText}>Resetuj</Text>
          </TouchableHighlight>

          <View style={styles.subBtnSection}>
            <Text style={styles.subBtnSectionAsk}>Posiadasz juz konto? </Text>
            <TouchableHighlight
              onPress={() =>
                navigation.navigate("Login", {
                  API_URL: navigation.getParam("API_URL", ""),
                  setUserData: navigation.getParam("setUserData")
                })
              }
              underlayColor={"#fff"}
            >
              <Text style={styles.registerBtn}>Logowanie</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export default ResetPassword;
