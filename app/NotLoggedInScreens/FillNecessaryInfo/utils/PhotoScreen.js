import React, { Component } from "react";
import { Button, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./../style";

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
