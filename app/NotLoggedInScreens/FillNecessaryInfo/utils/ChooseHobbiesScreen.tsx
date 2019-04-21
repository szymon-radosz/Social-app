import React, { Component } from "react";
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
import fillInfoBg from "./../../../assets/images/fillInfoBgMin.jpg";

interface ChooseHobbiesScreenProps {
  hobbies: any;
  changeHobbyStatus: any;
  submitData: any;
  prevStep: any;
}

export default class ChooseHobbiesScreen extends Component<
  ChooseHobbiesScreenProps
> {
  render() {
    return (
      <View>
        <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
          <Text style={styles.headerText}>
            Wybierz swoje{"\n"}zainteresowania
          </Text>
        </ImageBackground>
        <View style={styles.hobbiesContainer}>
          {this.props.hobbies &&
            this.props.hobbies.map(
              (
                hobby: { keyId: number; active: boolean; name: string },
                i: number
              ) => {
                //console.log(["hobby: ", hobby]);
                return (
                  <TouchableOpacity
                    onPress={() => this.props.changeHobbyStatus(hobby.keyId)}
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
              onPress={this.props.submitData}
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.previousBtn}>
            <Button title="< Wróć" color="#fff" onPress={this.props.prevStep} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
