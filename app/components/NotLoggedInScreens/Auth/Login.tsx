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

const Login = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(GlobalContext);

  const loginUser = (): void => {
    console.log([email, password]);
    if (email && !password) {
      context.setAlert(true, "danger", "Podaj swoje hasło.");
    } else if (!email && password) {
      context.setAlert(true, "danger", "Podaj swój adres e-mail.");
    } else if (!email && !password) {
      context.setAlert(true, "danger", "Podaj swój adres e-mail i hasło.");
    } else if (email && password) {
      try {
        let API_URL = context.API_URL;
        //let navProps = navigation.state.params;
        console.log([API_URL]);
        axios
          .post(API_URL + "/api/login", {
            email: email,
            password: password
          })
          .then(function(response) {
            console.log(response);
            if (response.data.status === "OK") {
              console.log(["response.data.user", response.data]);
              let token = response.data.user.token;

              const config = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json"
              };

              axios
                .post(context.API_URL + "/api/details", {}, { headers: config })
                .then(function(response2) {
                  if (response2.data.status === "OK") {
                    //navProps.setUserData(response2.data.result);

                    context.setUserData(response2.data.result);
                  }
                })
                .catch(function(error) {
                  context.setAlert(
                    true,
                    "danger",
                    "Sprawdź poprawność swoich danych."
                  );
                });
            } else {
              console.log("Nie ma tokena");
            }
          })
          .catch(function(error) {
            console.log(error);
            context.setAlert(
              true,
              "danger",
              "Sprawdź poprawność swoich danych."
            );
          });
      } catch (e) {
        console.log(e);
      }
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
            <Text
              style={styles.headerText}
            >{`Miło Cię widzieć \nponownie!`}</Text>

            <InputComponent
              placeholder="E-mail"
              inputOnChange={(email: string) => setEmail(email)}
              value={email}
              secureTextEntry={false}
              maxLength={100}
            />

            <InputComponent
              placeholder="Hasło"
              inputOnChange={(password: string) => setPassword(password)}
              value={password}
              secureTextEntry={true}
              maxLength={100}
            />

            <ButtonComponent
              pressButtonComponent={loginUser}
              buttonComponentText="Zaloguj"
              fullWidth={false}
              underlayColor="#dd904d"
              whiteBg={false}
              showBackIcon={false}
            />

            <View style={styles.subBtnSection}>
              <Text style={styles.subBtnSectionAsk}>Nie posiadasz konta? </Text>
              <TouchableHighlight
                onPress={() => navigation.navigate("Register")}
                underlayColor={"#fff"}
              >
                <Text style={styles.registerBtn}>Rejestracja</Text>
              </TouchableHighlight>
            </View>

            <Text
              style={styles.resetPasswordBtn}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              Resetuj hasło
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};
export default Login;
