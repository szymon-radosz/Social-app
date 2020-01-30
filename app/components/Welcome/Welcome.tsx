import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Dimensions
} from "react-native";
//@ts-ignore
import AppIntroSlider from "react-native-app-intro-slider";
import ButtonComponent from "./../Utils/ButtonComponent";
import { GlobalContext } from "./../../Context/GlobalContext";
import Languages from "./Languages/Languages";
import {
  customBlueColor,
  fontSizeBig,
  peachBtnText
} from "../../assets/global/globalStyles";

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

const logo: any = require("./../../assets/images/logo-sq.png");
const friends: any = require("./../../assets/images/friends.png");
const support: any = require("./../../assets/images/support.png");
const like: any = require("./../../assets/images/like.png");

const Welcome = (props: any) => {
  const context = useContext(GlobalContext);

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    //console.log(["welcome render", context]);
    context.setUserData("");

    let slides = [
      {
        key: "slide1",
        text:
          context.translations &&
          context.translations.slide1 &&
          context.translations.slide1[context.language],
        image: logo
      },
      {
        key: "slide2",
        text:
          context.translations &&
          context.translations.slide2 &&
          context.translations.slide2[context.language],
        image: friends
      },
      {
        key: "slide3",
        text:
          context.translations &&
          context.translations.slide3 &&
          context.translations.slide3[context.language],
        image: support
      },
      {
        key: "slide4",
        text:
          context.translations &&
          context.translations.slide4 &&
          context.translations.slide4[context.language],
        image: like
      }
    ];

    setSlides(slides);
  }, [context.translations, context.language]);

  const welcomeSliderRenderItem = (item: {
    key: string;
    image: any;
    text: string;
  }) => {
    return (
      <View style={styles.welcomeSlide}>
        <Image
          style={styles.sliderImg}
          resizeMode="contain"
          source={item.image}
        />
        <Text style={styles.welcomeSlideText}>{item.text}</Text>
      </View>
    );
  };

  const navigation = props.navigation;

  return (
    <SafeAreaView style={styles.areaContainer}>
      <View style={styles.container}>
        <Languages />
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
            buttonComponentText={
              context.translations &&
              context.translations.login &&
              context.translations.login[context.language]
            }
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
            <Text style={styles.subBtn}>
              {context.translations &&
                context.translations.register &&
                context.translations.register[context.language]}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

interface Style {
  container: ViewStyle;
  logo: TextStyle;
  registerBtn: TextStyle;
  fullWidth: any;
  welcomeSlide: ViewStyle;
  welcomeSlideText: TextStyle;
  activeWelcomeSlideRect: ViewStyle;
  inActiveWelcomeSlideRect: ViewStyle;
  welcomeSliderPagination: ViewStyle;
  subBtn: TextStyle;
  peachBtnText: any;
  sliderImg: ViewStyle;
  areaContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  welcomeSliderPagination: {
    marginTop: 30,
    marginBottom: 30
  },
  activeWelcomeSlideRect: {
    backgroundColor: customBlueColor,
    width: 35,
    marginTop: 100
  },
  inActiveWelcomeSlideRect: {
    backgroundColor: "#e5e5e5",
    width: 15,
    marginTop: 100
  },
  welcomeSlide: {
    justifyContent: "space-around",
    alignItems: "center",
    height: fullHeight / 1.8
  },
  welcomeSlideText: {
    fontSize: 22,
    color: "#424242",
    textAlign: "center",
    fontWeight: "300",
    fontFamily: "Open Sans",
    marginBottom: 80,
    width: "70%"
  },
  fullWidth: fullWidth,
  logo: {
    textAlign: "center",
    color: "#333",
    fontWeight: "800",
    fontSize: fontSizeBig,
    paddingBottom: 10
  },
  subBtn: {
    color: "#5e88fc",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Open Sans"
  },
  peachBtnText: peachBtnText,
  registerBtn: { marginBottom: 50 },
  sliderImg: { maxWidth: 120 },
  areaContainer: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default Welcome;
