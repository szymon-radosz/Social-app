import React, { useContext } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Linking,
  Image,
  SafeAreaView
} from "react-native";
import Alert from "./../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import { GlobalContext } from "./../../../Context/GlobalContext";
import PageHeader from "./../../SharedComponents/PageHeader";

const fb: any = require("./../../../assets/images/fb.png");
const ig: any = require("./../../../assets/images/ig.png");

const About = (props: any) => {
  const context = useContext(GlobalContext);

  //console.log(["about", context.userData]);

  return (
    <React.Fragment>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff"
        }}
      >
        {context.showAlert && (
          <Alert
            alertType={context.alertType}
            alertMessage={context.alertMessage}
            closeAlert={context.closeAlert}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between"
          }}
          data-test="ProfileContainer"
        >
          <ScrollView>
            <PageHeader
              boldText={"Moje znajome"}
              normalText={""}
              closeMethod={() => props.navigation.goBack(null)}
              closeMethodParameter={""}
            />
            <View
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
                  onPress={() => props.navigation.navigate("FeedbackModal", {})}
                >
                  Masz pytanie?{" "}
                  <Text style={{ fontWeight: "600", color: "#f4a157" }}>
                    Napisz do nas!
                  </Text>
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
                      fontWeight: "600",
                      color: "#f4a157"
                    }}
                  >
                    e-mamy.pl
                  </Text>
                </TouchableHighlight>
              </View>
              <View>
                <TouchableHighlight
                  onPress={() => {
                    context.userData.platform &&
                    context.userData.platform === "android"
                      ? Linking.openURL(
                          "https://play.google.com/store/apps/details?id=com.emamy"
                        )
                      : context.userData.platform &&
                        context.userData.platform === "ios" &&
                        Linking.openURL(
                          "https://apps.apple.com/il/app/e-mamy/id1477994168"
                        );
                  }}
                  underlayColor={"#fff"}
                >
                  <Text
                    style={{
                      paddingTop: 30,
                      paddingBottom: 30,
                      fontFamily: "Open Sans",
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#f4a157"
                    }}
                  >
                    Oceń naszą aplikację
                  </Text>
                </TouchableHighlight>
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
            </View>
          </ScrollView>
          <BottomPanel data-test="BottomPanel" navigation={props.navigation} />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export default About;
