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
            onPress={() => props.navigation.navigate("Login")}
            underlayColor={"#fff"}
          >
            <Text style={styles.registerBtn}>Zaloguj się</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export default ConfirmAccount;
