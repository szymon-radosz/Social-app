import React, { Component } from "react";
import { Button, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./../style";

const PhotoScreen = props => {
  return (
    <View>
      <Text style={styles.headerText}>Wybierz zdjecie profilowe.</Text>

      {props.photo && (
        <Image source={{ uri: props.photo.uri }} style={styles.image} />
      )}
      <TouchableHighlight style={styles.nextBtn}>
        <Button
          title="Wybierz zdjęcie"
          color="#fff"
          onPress={props.handleChoosePhoto}
        />
      </TouchableHighlight>

      {props.photo && (
        <TouchableHighlight style={styles.nextBtn}>
          <Button title="Dalej" color="#fff" onPress={props.nextStep} />
        </TouchableHighlight>
      )}

      <TouchableHighlight style={styles.previousBtn}>
        <Button title="Wróć" color="#e07b8d" onPress={props.prevStep} />
      </TouchableHighlight>
    </View>
  );
};

export default PhotoScreen;
