import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput
} from "react-native";

export default class AgeDescScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Podaj wiek</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={txt => this.props.handleChange("age", txt)}
          keyboardType="numeric"
          maxLength={3}
        >
          {this.props.age !== 0 && this.props.age}
        </TextInput>

        <Text>Dodaj swój opis ({this.props.desc.length}/100 znaków)</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={txt => this.props.handleChange("desc", txt)}
          maxLength={100}
        >
          {this.props.desc}
        </TextInput>

        <Button title="Dalej" onPress={this.props.nextStep} />
      </View>
    );
  }
}
