import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TextInput
} from "react-native";

export default class PhotoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Wybierz zdjecie profilowe</Text>

        {this.props.photo && (
          <Image
            source={{ uri: this.props.photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button
          title="Wybierz zdjęcie"
          onPress={this.props.handleChoosePhoto}
        />

        <Button title="Dalej" onPress={this.props.nextStep} />
        <Button title="Wróć" onPress={this.props.prevStep} />
      </View>
    );
  }
}
