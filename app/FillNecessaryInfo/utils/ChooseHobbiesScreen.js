import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput
} from "react-native";

export default class ChooseHobbiesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Wybierz hobby</Text>
        {this.props.hobbies &&
          this.props.hobbies.map((hobby, i) => {
            console.log(["hobby: ", hobby]);
            return (
              <Text
                key={i}
                onPress={() => this.props.changeHobbyStatus(hobby.keyId)}
              >
                {hobby.name} - {hobby.active}
              </Text>
            );
          })}

        <Button title="Zapisz profil" onPress={this.props.submitData} />

        <Button title="Wróć" onPress={this.props.prevStep} />
      </View>
    );
  }
}
