import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  SafeAreaView
} from "react-native";
import styles from "./style";
//@ts-ignore
import AppIntroSlider from "react-native-app-intro-slider";
import ButtonComponent from "./../Utils/ButtonComponent";
import { GlobalContext } from "./../../Context/GlobalContext";
import lang from "./../../assets/lang/Welcome/Welcome";

const support: any = require("./../../assets/images/supportOrange.png");
const conversation: any = require("./../../assets/images/ecoOrange.png");
const stroller: any = require("./../../assets/images/strollerOrangeBig.png");
const makeUp: any = require("./../../assets/images/makeUpOrange.png");
const emamyLogo: any = require("./../../assets/images/emamyLogoTextVerticalSmall.png");

const Welcome = (props: any) => {
  const [slides, setSlides] = useState([
    {
      key: "slide1",
      text: lang.firstSlide["en"],
      image: emamyLogo
    },
    {
      key: "slide3",
      text: lang.secondSlide["en"],
      image: conversation
    },
    {
      key: "slide2",
      text: lang.thirdSlide["en"],
      image: support
    },
    {
      key: "slide4",
      text: lang.fourthSlide["en"],
      image: stroller
    },
    {
      key: "slide5",
      text: lang.fifthSlide["en"],
      image: makeUp
    }
  ]);

  const context = useContext(GlobalContext);

  useEffect(() => {
    //console.log(["welcome render", context]);
    context.setUserData("");
  }, []);

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff"
      }}
    >
      <View style={styles.container}>
        <AppIntroSlider
          renderItem={welcomeSliderRenderItem}
          slides={slides}
          activeDotStyle={styles.activeWelcomeSlideRect}
          dotStyle={styles.inActiveWelcomeSlideRect}
          paginationStyle={styles.welcomeSliderPagination}
        />

        <View>
          <ButtonComponent
            pressButtonComponent={() => navigation.navigate("Login")}
            buttonComponentText={lang.login["en"]}
            fullWidth={false}
            underlayColor="#dd904d"
            whiteBg={false}
            showBackIcon={false}
          />
          <TouchableHighlight
            style={styles.registerBtn}
            onPress={() => navigation.navigate("Register")}
            underlayColor={"#fff"}
          >
            <Text style={styles.subBtn}>{lang.register["en"]}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Welcome;
