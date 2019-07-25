import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Linking,
  Image
} from "react-native";
import styles from "./../style";

const fb: any = require("./../../../../assets/images/fb.png");
const ig: any = require("./../../../../assets/images/ig.png");

const About = (props: any) => {
  return (
    <ScrollView
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        paddingTop: 20
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: "600",
            fontFamily: "Open Sans",
            fontSize: 16,
            marginBottom: 5
          }}
        >
          E-mamy.pl
        </Text>
        <Text
          style={{
            fontFamily: "Open Sans",
            fontSize: 14,
            marginBottom: 30
          }}
        >
          Bądź częścią lokalnej społeczności mam
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Open Sans",
            fontSize: 14,
            marginBottom: 30
          }}
          onPress={props.setShowFeedbackModal}
        >
          Masz pytanie?{" "}
          <Text style={{ fontWeight: "600" }}>Napisz do nas!</Text>
        </Text>
      </View>
      <View
        style={{
          flexWrap: "wrap",
          alignItems: "flex-start",
          flexDirection: "row"
        }}
      >
        <Text
          style={{
            fontFamily: "Open Sans",
            fontSize: 14
          }}
        >
          Odwiedź naszą stronę{" "}
        </Text>
        <TouchableHighlight
          onPress={() => {
            Linking.openURL("https://e-mamy.pl/");
          }}
          underlayColor={"#fff"}
        >
          <Text
            style={{
              fontFamily: "Open Sans",
              fontSize: 14,
              fontWeight: "600"
            }}
          >
            e-mamy.pl
          </Text>
        </TouchableHighlight>
      </View>
      <View>
        <Text style={{ paddingTop: 30, paddingBottom: 30 }}>
          Oceń naszą aplikację
        </Text>
      </View>
      <View>
        <Text>Bądź na bieżąco z najnowszymi postami</Text>
        <View
          style={{
            flexWrap: "wrap",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10
          }}
        >
          <TouchableHighlight
            onPress={() => {
              Linking.openURL(
                "https://www.facebook.com/E-mamy-678607299320582/"
              );
            }}
            underlayColor={"#fff"}
          >
            <Image
              style={{ width: 40, height: 40, marginRight: 5 }}
              source={fb}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              Linking.openURL("https://www.instagram.com/emamy_pl/");
            }}
            underlayColor={"#fff"}
          >
            <Image
              style={{ width: 40, height: 40, marginLeft: 5 }}
              source={ig}
            />
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};
export default About;
