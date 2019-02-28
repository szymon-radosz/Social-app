import React, { Component } from "react";
import { Platform, StyleSheet, Button, Text, View } from "react-native";

export default class FillNecessaryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      lattitude: 0,
      longitude: 0
    };
  }

  render() {
    return (
      <View>
        <Text>Uzupełnij niezbędne dane, aby lepiej korzystać z E-mamy.</Text>
      </View>
    );
  }
}
