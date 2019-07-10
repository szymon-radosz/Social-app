import React, { useState, useContext } from "react";
import {
  TextInput,
  Text,
  View,
  Image,
  TouchableHighlight,
  SafeAreaView,
  Linking
} from "react-native";
const loaderImage: any = require("./../../../assets/images/loader.gif");
import axios from "axios";
import styles from "./style";
import { GlobalContext } from "./../../Context/GlobalContext";

const Register = (props: { navigation: any }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [loader, setLoader] = useState(false);
  const context = useContext(GlobalContext);

  const navigation = props.navigation;

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

        setLoader(true);

        axios
          .post(API_URL + "/api/register", {
            name: name,
            email: email,
            password: password
          })
          .then(function(response) {
            console.log(response.data);
            if (response.data.status === "OK") {
              setLoader(false);

              context.setAlert(
                true,
                "danger",
                "Sprawdź swoją skrzynkę mailową i potwierdź swoje konto przez otrzymaną od nas wiadomość."
              );

              context.setUserData(response.data.user);
              //navProps.setUserData(response.data.user);
            }
          })
          .catch(function(error) {
            setLoader(false);
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
      {loader ? (
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
            <TouchableHighlight
              style={styles.mainBtn}
              onPress={registerUser}
              underlayColor={"#dd904d"}
            >
              <Text style={styles.peachBtnText}>Zarejestruj</Text>
            </TouchableHighlight>

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
        </SafeAreaView>
      )}
    </React.Fragment>
  );
};
export default Register;
