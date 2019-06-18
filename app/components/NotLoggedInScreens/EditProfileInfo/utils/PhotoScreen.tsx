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
const fillInfoBg: any = require("./../../../../assets/images/fillInfoBgMin.jpg");

const PhotoScreen = (props: {
  photo: any;
  handleChoosePhoto: any;
  nextStep: any;
  prevStep: any;
  userSavedPhoto: string;
  API_URL: string;
}): any => {
  return (
    <View>
      <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
        <Text style={styles.headerText}>Dodaj zdjęcie{"\n"}profilowe</Text>
      </ImageBackground>

      <Text style={styles.fillInfoHeader}>Dodaj swoje zdjęcie profilowe</Text>

      {props.photo && (
        <Image source={{ uri: props.photo.path }} style={styles.image} />
      )}

      {props.userSavedPhoto && props.API_URL && !props.photo && (
        <Image
          source={{ uri: `${props.API_URL}userPhotos/${props.userSavedPhoto}` }}
          style={styles.image}
        />
      )}
      <TouchableHighlight style={styles.nextBtn}>
        <Button
          title="Wybierz zdjęcie"
          color="#fff"
          onPress={props.handleChoosePhoto}
        />
      </TouchableHighlight>

      {props.photo || props.userSavedPhoto ? (
        <TouchableHighlight style={styles.nextBtn}>
          <Button title="Dalej" color="#fff" onPress={props.nextStep} />
        </TouchableHighlight>
      ) : null}

      <TouchableHighlight style={styles.previousBtn}>
        <Button title="Wróć" color="#fff" onPress={props.prevStep} />
      </TouchableHighlight>
    </View>
  );
};

export default PhotoScreen;
