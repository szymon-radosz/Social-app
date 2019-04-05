import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import styles from "./../style";

const ChooseHobbiesScreen = props => {
  return (
    <View>
      <Text style={styles.headerText}>Wybierz swoje hobby.</Text>
      <View style={styles.hobbiesContainer}>
        {props.hobbies &&
          props.hobbies.map((hobby, i) => {
            //console.log(["hobby: ", hobby]);
            return (
              <TouchableOpacity
                onPress={() => props.changeHobbyStatus(hobby.keyId)}
                style={
                  hobby.active
                    ? styles.activeHobbyContainer
                    : styles.hobbyContainer
                }
                key={i}
              >
                <Text>{hobby.name}</Text>
              </TouchableOpacity>
            );
          })}
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
          <Button title="Wróć" color="#e07b8d" onPress={props.prevStep} />
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default ChooseHobbiesScreen;
