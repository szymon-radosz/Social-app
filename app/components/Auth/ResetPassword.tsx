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
import ButtonComponent from "./../Utils/ButtonComponent";
import InputComponent from "./../Utils/InputComponent";
import Alert from "./../Alert/Alert";
import lang from "./../../assets/lang/Auth/ResetPassword";

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
        .then(response => {
          if (response.data.status === "OK") {
            setEmail("");
            context.setAlert(true, "success", lang.chackEmailSuccess["en"]);
          } else {
            setEmail("");
            context.setAlert(true, "danger", lang.resetError["en"]);
          }
        })
        .catch(error => {
          context.setAlert(true, "danger", lang.checkCredentialsError["en"]);
        });
    } catch (e) {
      context.setAlert(true, "danger", lang.resetError["en"]);
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
            <Text style={styles.headerText}>{lang.header["en"]}</Text>

            <InputComponent
              placeholder={lang.email["en"]}
              inputOnChange={(email: string) => setEmail(email)}
              value={email}
              secureTextEntry={false}
              maxLength={100}
            />

            <ButtonComponent
              pressButtonComponent={resetPassword}
              buttonComponentText={lang.header["en"]}
              fullWidth={false}
              underlayColor="#dd904d"
              whiteBg={false}
              showBackIcon={false}
            />

            <View style={styles.subBtnSection}>
              <Text style={styles.subBtnSectionAsk}>
                {lang.hasAccount["en"]}
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
    </React.Fragment>
  );
};
export default ResetPassword;
