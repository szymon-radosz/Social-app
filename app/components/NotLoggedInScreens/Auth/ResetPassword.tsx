import React, { useState, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  ScrollView
} from "react-native";
import styles from "./style";
import axios from "axios";
import { GlobalContext } from "./../../Context/GlobalContext";
import ButtonComponent from "./../../Utils/ButtonComponent";
import InputComponent from "./../../Utils/InputComponent";
import Alert from "./../../../Alert/Alert";

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState("");
  const context = useContext(GlobalContext);

  const resetPassword = (): void => {
    try {
      let API_URL = context.API_URL;
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

  const navigation = props.navigation;

  return (
    <React.Fragment>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        {context.showAlert && (
          <Alert
            alertType={context.alertType}
            alertMessage={context.alertMessage}
            closeAlert={context.closeAlert}
          />
        )}
        <ScrollView keyboardShouldPersistTaps={"always"}>
          <View style={styles.container}>
            <Text style={styles.headerText}>{`Resetuj swoje \nhasło`}</Text>

            <InputComponent
              placeholder="E-mail"
              inputOnChange={(email: string) => setEmail(email)}
              value={email}
              secureTextEntry={false}
              maxLength={100}
            />

            <ButtonComponent
              pressButtonComponent={resetPassword}
              buttonComponentText="Resetuj"
              fullWidth={false}
              underlayColor="#dd904d"
              whiteBg={false}
              showBackIcon={false}
            />

            <View style={styles.subBtnSection}>
              <Text style={styles.subBtnSectionAsk}>Posiadasz juz konto? </Text>
              <TouchableHighlight
                onPress={() => navigation.navigate("Login")}
                underlayColor={"#fff"}
              >
                <Text style={styles.registerBtn}>Logowanie</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};
export default ResetPassword;
