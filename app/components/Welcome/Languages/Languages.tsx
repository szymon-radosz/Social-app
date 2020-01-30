import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  SafeAreaView
} from "react-native";
//@ts-ignore
import { GlobalContext } from "./../../../Context/GlobalContext";
import * as Animatable from "react-native-animatable";

const enFlag: any = require("./../../../assets/images/en-flag.png");
const deFlag: any = require("./../../../assets/images/de-flag.jpg");
const frFlag: any = require("./../../../assets/images/fr-flag.png");
const esFlag: any = require("./../../../assets/images/es-flag.png");
const zhFlag: any = require("./../../../assets/images/zh-flag.png");

const Welcome = (props: any) => {
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
    <View style={{ position: "absolute", zIndex: 10, right: 10, top: 10 }}>
      {languages.map((language, i) => {
        if (language.text === context.language) {
          return (
            <TouchableHighlight
              onPress={() => setShowLanguages(!showLanguages)}
              underlayColor={"#fff"}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginBottom: 10
                }}
                source={language.icon}
              />
            </TouchableHighlight>
          );
        }
      })}

      {showLanguages &&
        languages &&
        languages.map((languageFlag, i) => {
          if (languageFlag.text !== context.language) {
            return (
              <Animatable.View animation="fadeIn">
                <TouchableHighlight
                  onPress={() => {
                    context.setLanguage(languageFlag.text);
                    setShowLanguages(false);
                  }}
                >
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginBottom: 10
                    }}
                    source={languageFlag.icon}
                  />
                </TouchableHighlight>
              </Animatable.View>
            );
          }
        })}
    </View>
  );
};
export default Welcome;
