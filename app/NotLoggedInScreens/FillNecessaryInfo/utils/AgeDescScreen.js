import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";

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

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  headerText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 22,
    paddingBottom: 20,
    paddingTop: 20
  },
  subText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "400",
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 5
  },
  input: {
    width: "90%",
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "auto"
  },
  previousBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 20
  },
  nextBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto"
  }
});
