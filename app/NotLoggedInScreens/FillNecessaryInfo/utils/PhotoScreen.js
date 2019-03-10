import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from "react-native";

export default class PhotoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={styles.headerText}>Wybierz zdjecie profilowe.</Text>

        {this.props.photo && (
          <Image source={{ uri: this.props.photo.uri }} style={styles.image} />
        )}
        <TouchableHighlight style={styles.nextBtn}>
          <Button
            title="Wybierz zdjęcie"
            color="#fff"
            onPress={this.props.handleChoosePhoto}
          />
        </TouchableHighlight>

        {this.props.photo && (
          <TouchableHighlight style={styles.nextBtn}>
            <Button title="Dalej" color="#fff" onPress={this.props.nextStep} />
          </TouchableHighlight>
        )}

        <TouchableHighlight style={styles.previousBtn}>
          <Button title="Wróć" color="#e07b8d" onPress={this.props.prevStep} />
        </TouchableHighlight>
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
  image: {
    width: 200,
    height: 200,
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
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto"
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
