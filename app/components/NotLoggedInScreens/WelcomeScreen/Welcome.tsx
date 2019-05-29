import React, { Component } from "react";
import { Button, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./style";
import AppIntroSlider from "react-native-app-intro-slider";
import eco from "./../../../assets/images/eco.png";
import support from "./../../../assets/images/support.png";
import conversation from "./../../../assets/images/conversation.png";
import stroller from "./../../../assets/images/stroller.png";
import makeUp from "./../../../assets/images/makeUp.png";

interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}

interface WelcomeProps {
  navigation: any;
}

interface WelcomeState {
  slides: any;
}

export default class Welcome extends Component<
  WelcomeProps,
  WelcomeState,
  NavigationScreenInterface
> {
  constructor(props: WelcomeProps) {
    super(props);
    //console.log(props);

    this.state = {
      slides: [
        {
          key: "slide1",
          text: "Bądź częścią lokalnej \nspołeczności matek",
          image: eco
        },
        {
          key: "slide2",
          text: "Wymieniaj się uwagami \nna wspólnym forum",
          image: support
        },
        {
          key: "slide3",
          text: "Twórz pozytywne relacje \nz innymi kobietami",
          image: conversation
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
      ]
    };
  }

  welcomeSliderRenderItem = (item: {
    title: string;
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

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <AppIntroSlider
          renderItem={this.welcomeSliderRenderItem}
          slides={this.state.slides}
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
                  setUserData: navigation.getParam("setUserData")
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
                  setUserData: navigation.getParam("setUserData")
                })
              }
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
