import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import styles from "./../style";
// @ts-ignore
import { v4 as uuid } from "uuid";

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
        <Text style={styles.headerText}>Wybierz swoje hobby.</Text>
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
            <Button
              title="Wróć"
              color="#e07b8d"
              onPress={this.props.prevStep}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
