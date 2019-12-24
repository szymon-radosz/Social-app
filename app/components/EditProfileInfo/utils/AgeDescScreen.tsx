import React from "react";
import { Text, View, ImageBackground, ScrollView } from "react-native";
import styles from "./../style";
import ButtonComponent from "./../../Utils/ButtonComponent";
import InputComponent from "./../../Utils/InputComponent";
import TextAreaComponent from "./../../Utils/TextAreaComponent";
import lang from "./../../../assets/lang/EditProfileInfo/utils/AgeDescScreen";

const fillInfoBg: any = require("./../../../assets/images/fillInfoBgMin.jpg");

const AgeDescScreen = (props: {
  handleChange: any;
  age: any;
  nickname: string;
  desc: string;
  nextStep: any;
}): any => {
  return (
    <View style={styles.sectionContainer}>
      <ScrollView>
        <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
          <Text style={styles.headerText}>{lang.header["en"]}</Text>
        </ImageBackground>

        <View style={styles.infoContainer}>
          <Text style={styles.fillInfoHeader}>{lang.fillBasicInfo["en"]}</Text>

          <Text style={styles.subText}>
            {lang.nick["en"]} ({props.nickname.length}/20 {lang.chars["en"]}) *
          </Text>

          <InputComponent
            placeholder={lang.nick["en"]}
            inputOnChange={(nickname: string) =>
              props.handleChange("nickname", nickname)
            }
            value={props.nickname}
            secureTextEntry={false}
            maxLength={20}
          />

          <Text style={styles.subText}>{lang.age["en"]} *</Text>

          <InputComponent
            placeholder={lang.age["en"]}
            inputOnChange={(age: string) => props.handleChange("age", age)}
            value={props.age !== 0 ? String(props.age) : ""}
            secureTextEntry={false}
            maxLength={2}
          />

          <Text style={styles.subText}>
            {lang.description["en"]} ({props.desc.length}/250 {lang.chars["en"]}
            )
          </Text>

          <TextAreaComponent
            placeholder={lang.description["en"]}
            inputOnChange={(desc: string) => props.handleChange("desc", desc)}
            value={props.desc}
            maxLength={250}
            multiline={true}
            numberOfLines={10}
          />
        </View>
      </ScrollView>

      <View style={styles.sectionBtnContainer}>
        {props.age > 0 && props.nickname !== "" && (
          <ButtonComponent
            pressButtonComponent={props.nextStep}
            buttonComponentText={lang.next["en"]}
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
