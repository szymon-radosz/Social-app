import React, { useState, useContext } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle
} from "react-native";
import axios from "axios";
import { GlobalContext } from "./../../Context/GlobalContext";
import ButtonComponent from "./../Utils/ButtonComponent";
import InputComponent from "./../Utils/InputComponent";
import Alert from "./../Alert/Alert";
import lang from "./../../assets/lang/Auth/ResetPassword";
import {
  customBlueColor,
  fontSizeBig
} from "./../../assets/global/globalStyles";

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState("");
  const context = useContext(GlobalContext);

  const resetPassword = (): void => {
    try {
      let API_URL = context.API_URL;
      axios
        .post(API_URL + "password-reset", {
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
              underlayColor="#5e88fc"
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

interface Style {
  container: ViewStyle;
  headerText: TextStyle;
  subBtnSection: ViewStyle;
  subBtnSectionAsk: TextStyle;
  registerBtn: TextStyle;
  areaContainer: ViewStyle;
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
  registerBtn: {
    color: customBlueColor,
    fontSize: 16,
    fontFamily: "Open Sans"
  }
});

export default ResetPassword;
