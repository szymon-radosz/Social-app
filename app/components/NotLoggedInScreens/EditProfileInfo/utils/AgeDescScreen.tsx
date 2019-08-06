import React from "react";
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView
} from "react-native";
import styles from "./../style";
import ButtonComponent from "./../../../Utils/ButtonComponent";
import InputComponent from "./../../../Utils/InputComponent";
import TextAreaComponent from "./../../../Utils/TextAreaComponent";

const fillInfoBg: any = require("./../../../../assets/images/fillInfoBgMin.jpg");

const AgeDescScreen = (props: {
  handleChange: any;
  age: any;
  desc: string;
  nextStep: any;
}): any => {
  return (
    <View style={styles.sectionContainer}>
      <ScrollView>
        <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
          <Text style={styles.headerText}>Opowiedz nam o{"\n"}sobie</Text>
        </ImageBackground>

        <View style={styles.infoContainer}>
          <Text style={styles.fillInfoHeader}>Uzupełnij ogólne informacje</Text>
          <Text style={styles.subText}>Wiek *</Text>

          <InputComponent
            placeholder="Podaj swój wiek"
            inputOnChange={(age: string) => props.handleChange("age", age)}
            value={props.age !== 0 ? String(props.age) : ""}
            secureTextEntry={false}
            maxLength={2}
          />

          <Text style={styles.subText}>
            Opis ({props.desc.length}/250 znaków)
          </Text>

          <TextAreaComponent
            placeholder="Napisz kilka słów o sobie..."
            inputOnChange={(desc: string) => props.handleChange("desc", desc)}
            value={props.desc}
            maxLength={250}
            multiline={true}
            numberOfLines={10}
          />
        </View>
      </ScrollView>

      <View style={styles.sectionBtnContainer}>
        {props.age > 0 && (
          <ButtonComponent
            pressButtonComponent={props.nextStep}
            buttonComponentText="Dalej"
            fullWidth={true}
            underlayColor="#dd904d"
            whiteBg={false}
            showBackIcon={false}
          />
        )}
      </View>
    </View>
  );
};

export default AgeDescScreen;
