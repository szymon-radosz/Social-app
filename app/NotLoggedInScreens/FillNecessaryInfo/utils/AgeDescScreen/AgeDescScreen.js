import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";
import styles from "./style";

export default class AgeDescScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
          onChangeText={txt => this.props.handleChange("age", txt)}
          keyboardType="numeric"
          maxLength={3}
        >
          {this.props.age !== 0 && this.props.age}
        </TextInput>

        <Text style={styles.subText}>
          Opis * ({this.props.desc.length}/100 znaków)
        </Text>
        <TextInput
          placeholder="Opis"
          placeholderTextColor="#919191"
          style={styles.input}
          onChangeText={txt => this.props.handleChange("desc", txt)}
          maxLength={100}
        >
          {this.props.desc}
        </TextInput>

        {this.props.age.length > 0 && (
          <TouchableHighlight style={styles.nextBtn}>
            <Button title="Dalej" color="#fff" onPress={this.props.nextStep} />
          </TouchableHighlight>
        )}
      </View>
    );
  }
}
