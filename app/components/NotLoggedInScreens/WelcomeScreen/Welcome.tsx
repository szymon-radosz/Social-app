import React, { useState } from "react";
import { Button, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./style";
import AppIntroSlider from "react-native-app-intro-slider";

const support: any = require("./../../../assets/images/support.png");
const conversation: any = require("./../../../assets/images/conversation.png");
const stroller: any = require("./../../../assets/images/stroller.png");
const makeUp: any = require("./../../../assets/images/makeUp.png");
const emamyLogo: any = require("./../../../assets/images/emamyLogoTextVerticalSmall.png");

const Welcome = (props: { navigation: any }) => {
  const [slides, setSlides] = useState([
    {
      key: "slide1",
      text: "Bądź częścią lokalnej \nspołeczności matek",
      image: emamyLogo
    },
    {
      key: "slide3",
      text: "Twórz pozytywne relacje \nz innymi kobietami",
      image: conversation
    },
    {
      key: "slide2",
      text: "Wymieniaj się uwagami \nna wspólnym forum",
      image: support
    },
    {
      key: "slide4",
      text: "Kupuj oraz sprzedawaj \nprzedmioty",
      image: stroller
    },
    {
      key: "slide5",
      text: "Bądź sobą - bo taką\nCię lubimy!",
      image: makeUp
    }
  ]);

  const welcomeSliderRenderItem = (item: {
    key: string;
    image: any;
    text: string;
  }) => {
    return (
      <View style={styles.welcomeSlide}>
        <Image
          style={{ width: 150 }}
          resizeMode="contain"
          source={item.image}
        />
        <Text style={styles.welcomeSlideText}>{item.text}</Text>
      </View>
    );
  };

  const navigation = props.navigation;
  return (
    <View style={styles.container}>
      <AppIntroSlider
        renderItem={welcomeSliderRenderItem}
        slides={slides}
        activeDotStyle={styles.activeWelcomeSlideRect}
        dotStyle={styles.inActiveWelcomeSlideRect}
        paginationStyle={styles.welcomeSliderPagination}
      />
      <View>
        <TouchableHighlight style={styles.loginBtn}>
          <Button
            //style={styles.loginBtn}
            title="Logowanie"
            color="#fff"
            onPress={(): void =>
              navigation.navigate("Login", {
                API_URL: navigation.getParam("API_URL"),
                setUserData: navigation.getParam("setUserData"),
                clearUserData: navigation.getParam("clearUserData")
              })
            }
          />
        </TouchableHighlight>
        <TouchableHighlight style={styles.registerBtn}>
          <Button
            title="Rejestracja"
            color="#f7b67e"
            onPress={() =>
              navigation.navigate("Register", {
                API_URL: navigation.getParam("API_URL", ""),
                setUserData: navigation.getParam("setUserData"),
                clearUserData: navigation.getParam("clearUserData")
              })
            }
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default Welcome;
