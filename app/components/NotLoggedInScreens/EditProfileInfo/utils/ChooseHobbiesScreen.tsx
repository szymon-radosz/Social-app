import React from "react";
import {
  Button,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import styles from "./../style";
// @ts-ignore
import { v4 as uuid } from "uuid";
const fillInfoBg: any = require("./../../../../assets/images/fillInfoBgMin.jpg");

const ChooseHobbiesScreen = (props: {
  hobbies: any;
  changeHobbyStatus: any;
  submitData: any;
  prevStep: any;
}): any => {
  return (
    <View>
      <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
        <Text style={styles.headerText}>Wybierz swoje{"\n"}hobby</Text>
      </ImageBackground>
      <Text style={styles.fillInfoHeader}>
        Wybierz swoje hobby, aby nawiązywać znajomości z kobietami o podobnych
        zainteresowaniach.{" "}
      </Text>
      <View style={styles.hobbiesContainer}>
        {props.hobbies &&
          props.hobbies.map(
            (
              hobby: { keyId: number; active: boolean; name: string },
              i: number
            ) => {
              //console.log(["hobby: ", hobby]);
              return (
                <TouchableOpacity
                  onPress={() => props.changeHobbyStatus(hobby.keyId)}
                  style={
                    hobby.active
                      ? styles.activeHobbyContainer
                      : styles.hobbyContainer
                  }
                  key={uuid()}
                >
                  <Text>{hobby.name}</Text>
                </TouchableOpacity>
              );
            }
          )}
      </View>
      <View style={styles.btnContainer}>
        <TouchableHighlight style={styles.nextBtn}>
          <Button
            title="Zapisz profil"
            color="#fff"
            onPress={props.submitData}
          />
        </TouchableHighlight>
        <TouchableHighlight style={styles.previousBtn}>
          <Button title="Wróć" color="#fff" onPress={props.prevStep} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ChooseHobbiesScreen;
