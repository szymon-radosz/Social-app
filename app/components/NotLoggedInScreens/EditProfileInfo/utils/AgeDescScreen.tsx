import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import styles from "./../style";
const fillInfoBg: any = require("./../../../../assets/images/fillInfoBgMin.jpg");

const AgeDescScreen = (props: {
  handleChange: any;
  age: any;
  desc: string;
  nextStep: any;
}): any => {
  return (
    <View>
      <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
        <Text style={styles.headerText}>Opowiedz nam o{"\n"}sobie</Text>
      </ImageBackground>

      <View style={styles.infoContainer}>
        <Text style={styles.fillInfoHeader}>Uzupełnij ogólne informacje</Text>
        <Text style={styles.subText}>Wiek</Text>
        <TextInput
          placeholder="Wiek"
          placeholderTextColor="#919191"
          style={styles.input}
          onChangeText={(txt: string) => props.handleChange("age", txt)}
          keyboardType="numeric"
          maxLength={2}
        >
          {props.age !== 0 && props.age}
        </TextInput>

        <Text style={styles.subText}>
          Opis * ({props.desc.length}/100 znaków)
        </Text>
        <TextInput
          placeholder="Opis"
          placeholderTextColor="#919191"
          style={styles.input}
          onChangeText={(txt: string) => props.handleChange("desc", txt)}
          maxLength={100}
        >
          {props.desc}
        </TextInput>
      </View>

      {props.age != 0 && (
        <TouchableHighlight
          style={styles.nextBtn}
          onPress={props.nextStep}
          underlayColor={"#dd904d"}
        >
          <Text style={styles.peachBtnText}>Dalej</Text>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default AgeDescScreen;
