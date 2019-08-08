import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  SafeAreaView,
  Linking,
  Platform,
  ScrollView
} from "react-native";
import axios from "axios";
import styles from "./style";
import { GlobalContext } from "./../../Context/GlobalContext";
import ButtonComponent from "./../../Utils/ButtonComponent";
import InputComponent from "./../../Utils/InputComponent";
import Alert from "./../../../Alert/Alert";

const loaderImage: any = require("./../../../assets/images/loader.gif");

const Register = (props: { navigation: any }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [platform, setPlatform] = useState("");
  const context = useContext(GlobalContext);

  const navigation = props.navigation;

  useEffect(() => {
    if (Platform.OS === "ios") {
      setPlatform("ios");
    } else {
      setPlatform("android");
    }
  }, []);

  const registerUser = (): void => {
    if (!name || !email || !password || !passwordConf) {
      context.setAlert(true, "danger", "Wszystkie pola są wymagane.");
    } else if (password !== passwordConf) {
      context.setAlert(
        true,
        "danger",
        "Hasło i potwierdzenie hasła muszą być identyczne."
      );
    } else if (password == passwordConf && password.length < 6) {
      context.setAlert(true, "danger", "Hasło musi mieć conajmniej 6 znaków.");
    } else if (password === passwordConf) {
      try {
        let API_URL = context.API_URL;

        context.setShowLoader(true);

        axios
          .post(API_URL + "/api/register", {
            name: name,
            email: email,
            password: password,
            platform: platform
          })
          .then(function(response) {
            console.log(response.data);
            if (response.data.status === "OK") {
              context.setShowLoader(false);

              context.setAlert(
                true,
                "success",
                "Sprawdź swoją skrzynkę mailową i potwierdź swoje konto przez otrzymaną od nas wiadomość."
              );

              context.setUserData(response.data.user);
              //navProps.setUserData(response.data.user);
            }
          })
          .catch(function(error) {
            context.setShowLoader(false);
          });
      } catch (e) {}
    } else {
      context.setAlert(
        true,
        "danger",
        "Hasło i potwierdzenie musi być identyczne."
      );
    }
  };

  return (
    <React.Fragment>
      {context.showLoader ? (
        <View style={styles.loaderContainer}>
          <Image style={{ width: 100, height: 100 }} source={loaderImage} />
        </View>
      ) : (
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
              >{`Dołącz do naszej \nspołeczności!`}</Text>

              <InputComponent
                placeholder="Imię"
                inputOnChange={(name: string) => setName(name)}
                value={name}
                secureTextEntry={false}
                maxLength={100}
              />
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
              <InputComponent
                placeholder="Potwierdź hasło"
                inputOnChange={(passwordConf: string) =>
                  setPasswordConf(passwordConf)
                }
                value={passwordConf}
                secureTextEntry={true}
                maxLength={100}
              />
              <TouchableHighlight
                onPress={() => {
                  Linking.openURL("https://e-mamy.pl/regulamin");
                }}
                underlayColor={"#fff"}
              >
                <Text style={styles.termsBtn}>
                  Rejestrując się akceptujesz regulamin E-mamy
                </Text>
              </TouchableHighlight>

              <ButtonComponent
                pressButtonComponent={registerUser}
                buttonComponentText="Zarejestruj"
                fullWidth={false}
                underlayColor="#dd904d"
                whiteBg={false}
                showBackIcon={false}
              />

              <View style={styles.subBtnSection}>
                <Text style={styles.subBtnSectionAsk}>
                  Posiadasz juz konto?{" "}
                </Text>
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
      )}
    </React.Fragment>
  );
};
export default Register;
