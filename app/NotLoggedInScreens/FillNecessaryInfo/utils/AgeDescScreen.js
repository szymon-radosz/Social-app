import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";
import styles from "./../style";

const AgeDescScreen = props => {
  return (
    <View>
      <Text style={styles.headerText}>
        Uzupełnij swoje dane, aby lepiej korzystać z E-mamy
      </Text>
      <Text style={styles.subText}>Wiek</Text>
      <TextInput
        placeholder="Wiek"
        placeholderTextColor="#919191"
        style={styles.input}
        onChangeText={txt => props.handleChange("age", txt)}
        keyboardType="numeric"
        maxLength={3}
      >
        {props.age !== 0 && props.age}
      </TextInput>

      <Text style={styles.subText}>
        Opis * ({props.desc.length}/100 znaków)
      </Text>
      <TextInput
        placeholder="Opis"
        placeholderTextColor="#919191"
        style={styles.input}
        onChangeText={txt => props.handleChange("desc", txt)}
        maxLength={100}
      >
        {props.desc}
      </TextInput>

      {props.age.length > 0 && (
        <TouchableHighlight style={styles.nextBtn}>
          <Button title="Dalej" color="#fff" onPress={props.nextStep} />
        </TouchableHighlight>
      )}
    </View>
  );
};
export default AgeDescScreen;
