import React, { useState, useContext } from "react";
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  ViewStyle
} from "react-native";
//@ts-ignore
import { GlobalContext } from "./../../../Context/GlobalContext";
import * as Animatable from "react-native-animatable";

const enFlag: any = require("./../../../assets/images/en-flag.png");
const deFlag: any = require("./../../../assets/images/de-flag.jpg");
const frFlag: any = require("./../../../assets/images/fr-flag.png");
const esFlag: any = require("./../../../assets/images/es-flag.png");
const zhFlag: any = require("./../../../assets/images/zh-flag.png");

const Languages = (props: any) => {
  const context = useContext(GlobalContext);

  const [showLanguages, setShowLanguages] = useState(false);
  const languages = [
    {
      icon: enFlag,
      text: "en"
    },
    {
      icon: deFlag,
      text: "de"
    },
    {
      icon: frFlag,
      text: "fr"
    },
    {
      icon: esFlag,
      text: "es"
    },
    {
      icon: zhFlag,
      text: "zh"
    }
  ];

  return (
    <View style={styles.activeFlag}>
      {languages.map((language, i) => {
        if (language.text === context.language) {
          return (
            <TouchableHighlight
              onPress={() => setShowLanguages(!showLanguages)}
              underlayColor={"#fff"}
              key={`active-flag`}
            >
              <Image style={styles.flag} source={language.icon} />
            </TouchableHighlight>
          );
        }
      })}

      {showLanguages &&
        languages &&
        languages.map((languageFlag, i) => {
          if (languageFlag.text !== context.language) {
            return (
              <Animatable.View animation="fadeIn" key={`flag-${i}`}>
                <TouchableHighlight
                  onPress={() => {
                    context.setLanguage(languageFlag.text);
                    setShowLanguages(false);
                  }}
                >
                  <Image style={styles.flag} source={languageFlag.icon} />
                </TouchableHighlight>
              </Animatable.View>
            );
          }
        })}
    </View>
  );
};

interface Style {
  activeFlag: ViewStyle;
  flag: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  activeFlag: {
    position: "absolute",
    zIndex: 10,
    right: 10,
    top: 10
  },
  flag: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10
  }
});

export default Languages;
