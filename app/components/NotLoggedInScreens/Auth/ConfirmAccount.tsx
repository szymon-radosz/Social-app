import React from "react";
import { SafeAreaView, Text, View, TouchableHighlight } from "react-native";
import styles from "./style";

const ConfirmAccount = (props: { navigation: any }) => {
  return (
    <React.Fragment>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        <View style={styles.container}>
          <Text style={styles.headerText}>{`Potwierdź swój adres email`}</Text>

          <Text style={{ marginBottom: 40 }}>
            Dbamy o wiarygodność naszej społeczności mam. Prosimy sprawdź swoją
            skrzynkę mailową i potwierdź swoją rejestrację. W razie problemów
            napisz do nas na kontakt@e-mamy.pl
          </Text>
          <TouchableHighlight
            onPress={() =>
              props.navigation.navigate("Login", {
                API_URL: props.navigation.getParam("API_URL", ""),
                setUserData: props.navigation.getParam("setUserData")
              })
            }
            underlayColor={"#fff"}
          >
            <Text style={styles.registerBtn}>Zaloguj się</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
      {showAlert != false && (
        <Alert alertType={alertType} alertMessage={alertMessage} />
      )}
    </React.Fragment>
  );
};
export default ConfirmAccount;
