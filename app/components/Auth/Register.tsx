import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  SafeAreaView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle
} from "react-native";
import axios from "axios";
import { GlobalContext } from "./../../Context/GlobalContext";
import ButtonComponent from "./../Utils/ButtonComponent";
import InputComponent from "./../Utils/InputComponent";
import Alert from "./../Alert/Alert";
import lang from "./../../assets/lang/Auth/Register";
import {
  customBlueColor,
  fontSizeBig,
  loaderContainer
} from "./../../assets/global/globalStyles";

const loaderImage: any = require("./../../assets/images/loader.gif");

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

  const validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const registerUser = async () => {
    if (!name || !email || !password || !passwordConf) {
      context.setAlert(true, "danger", lang.allFieldsError["en"]);
    } else if (password !== passwordConf) {
      context.setAlert(
        true,
        "danger",
        lang.passwordAndConfirmationNotMatchedError["en"]
      );
    } else if (password == passwordConf && password.length < 6) {
      context.setAlert(true, "danger", lang.passwordLengthError["en"]);
    } else if (!validateEmail(email)) {
      context.setAlert(true, "danger", lang.emailError["en"]);
    } else if (
      password === passwordConf &&
      name &&
      email &&
      password &&
      passwordConf &&
      validateEmail(email)
    ) {
      try {
        let API_URL = context.API_URL;

        context.setShowLoader(true);

        axios
          .post(API_URL + "/api/checkIfEmailExists", {
            email: email
          })
          .then(async response => {
            if (response.data.status === "OK" && response.data.result === 1) {
              //console.log(["checkIfEmailExists", response.data.result]);

              context.setAlert(true, "danger", lang.accountExistsError["en"]);

              setEmail("");

              context.setShowLoader(false);
            } else {
              axios
                .post(API_URL + "/api/register", {
                  name: name,
                  email: email,
                  password: password,
                  platform: platform
                })
                .then(response => {
                  //console.log(response.data);
                  if (response.data.status === "OK") {
                    context.setShowLoader(false);

                    context.setAlert(
                      true,
                      "success",
                      lang.confirmAccountSuccess["en"]
                    );

                    setName("");
                    setEmail("");
                    setPassword("");
                    setPasswordConf("");

                    context.setUserData(response.data.user);
                    //navProps.setUserData(response.data.user);
                  }
                })
                .catch(error => {
                  context.setShowLoader(false);
                });
            }
          });
      } catch (e) {}
    } else {
      context.setAlert(
        true,
        "danger",
        lang.passwordAndConfirmationNotMatchedError["en"]
      );
    }
  };

  return (
    <React.Fragment>
      {context.showLoader ? (
        <View style={styles.loaderContainer}>
          <Image style={styles.loaderImg} source={loaderImage} />
        </View>
      ) : (
        <SafeAreaView style={styles.areaContainer}>
          {context.showAlert && (
            <Alert
              alertType={context.alertType}
              alertMessage={context.alertMessage}
              closeAlert={context.closeAlert}
            />
          )}
          <ScrollView keyboardShouldPersistTaps={"always"}>
            <View style={styles.container}>
              <Text style={styles.headerText}>{lang.header["en"]}</Text>

              <InputComponent
                placeholder={lang.name["en"]}
                inputOnChange={(name: string) => setName(name)}
                value={name}
                secureTextEntry={false}
                maxLength={100}
              />
              <InputComponent
                placeholder={lang.email["en"]}
                inputOnChange={(email: string) => setEmail(email)}
                value={email}
                secureTextEntry={false}
                maxLength={100}
              />
              <InputComponent
                placeholder={lang.password["en"]}
                inputOnChange={(password: string) => setPassword(password)}
                value={password}
                secureTextEntry={true}
                maxLength={100}
              />
              <InputComponent
                placeholder={lang.passwordConfirmation["en"]}
                inputOnChange={(passwordConf: string) =>
                  setPasswordConf(passwordConf)
                }
                value={passwordConf}
                secureTextEntry={true}
                maxLength={100}
              />
              <TouchableHighlight
                onPress={() => {
                  Linking.openURL("");
                }}
                underlayColor={"#fff"}
              >
                <Text style={styles.termsBtn}>
                  {lang.registerAcceptTerms["en"]}
                </Text>
              </TouchableHighlight>

              <ButtonComponent
                pressButtonComponent={registerUser}
                buttonComponentText={lang.register["en"]}
                fullWidth={false}
                underlayColor="#dd904d"
                whiteBg={false}
                showBackIcon={false}
              />

              <View style={styles.subBtnSection}>
                <Text style={styles.subBtnSectionAsk}>
                  {lang.haveAccount["en"]}
                </Text>
                <TouchableHighlight
                  onPress={() => navigation.navigate("Login")}
                  underlayColor={"#fff"}
                >
                  <Text style={styles.registerBtn}>{lang.login["en"]}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </React.Fragment>
  );
};

interface Style {
  container: ViewStyle;
  headerText: TextStyle;
  subBtnSection: ViewStyle;
  subBtnSectionAsk: TextStyle;
  registerBtn: TextStyle;
  loaderContainer: any;
  termsBtn: TextStyle;
  areaContainer: ViewStyle;
  loaderImg: ImageStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  areaContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: fontSizeBig,
    marginTop: 70,
    paddingBottom: 50,
    fontFamily: "Open Sans"
  },
  subBtnSection: {
    flexDirection: "row",
    alignSelf: "center"
  },
  subBtnSectionAsk: {
    color: "#333",
    fontSize: 16,
    fontFamily: "Open Sans"
  },
  termsBtn: {
    color: "#a3a3a3",
    fontWeight: "600",
    fontSize: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "Open Sans"
  },
  registerBtn: {
    color: customBlueColor,
    fontSize: 16,
    fontFamily: "Open Sans"
  },
  loaderContainer: loaderContainer,
  loaderImg: { width: 100, height: 100 }
});

export default Register;
