import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import styles from "./../style";

export default class ChooseHobbiesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={styles.headerText}>Wybierz swoje hobby.</Text>
        <View style={styles.hobbiesContainer}>
          {this.props.hobbies &&
            this.props.hobbies.map((hobby, i) => {
              //console.log(["hobby: ", hobby]);
              return (
                <TouchableOpacity
                  onPress={() => this.props.changeHobbyStatus(hobby.keyId)}
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
