import React from "react";
import {
  Button,
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import styles from "./../style";
import fillInfoBg from "./../../../../assets/images/fillInfoBgMin.jpg";

const PhotoScreen = (props: {
  photo: any;
  handleChoosePhoto: any;
  nextStep: any;
  prevStep: any;
}): any => {
  return (
    <View>
      <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
        <Text style={styles.headerText}>Dodaj zdjęcie{"\n"}profilowe</Text>
      </ImageBackground>

      <Text style={styles.fillInfoHeader}>Dodaj swoje zdjęcie profilowe</Text>

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
        <Button title="Wróć" color="#fff" onPress={props.prevStep} />
      </TouchableHighlight>
    </View>
  );
};

export default PhotoScreen;
