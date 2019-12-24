import React from "react";
import { SafeAreaView, Text, View, TouchableHighlight } from "react-native";
import styles from "./style";
import lang from "./../../assets/lang/Auth/ConfirmAccount";

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
          <Text style={styles.headerText}>{lang.header["en"]}</Text>

          <Text style={{ marginBottom: 40 }}>{lang.description["en"]}</Text>
          <TouchableHighlight
            onPress={() => props.navigation.navigate("Login")}
            underlayColor={"#fff"}
          >
            <Text style={styles.registerBtn}>{lang.login["en"]}</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export default ConfirmAccount;
