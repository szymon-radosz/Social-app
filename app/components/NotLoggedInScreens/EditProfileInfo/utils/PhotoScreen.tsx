import React from "react";
import {
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

      {props.photo ? (
        <Image source={{ uri: props.photo.path }} style={styles.image} />
      ) : null}

      {props.userSavedPhoto && props.API_URL && !props.photo ? (
        <Image
          source={{ uri: `${props.API_URL}userPhotos/${props.userSavedPhoto}` }}
          style={styles.image}
        />
      ) : null}
      <TouchableHighlight
        style={styles.nextBtn}
        onPress={props.handleChoosePhoto}
        underlayColor={"#dd904d"}
      >
        <Text style={styles.peachBtnText}>Wybierz zdjęcie</Text>
      </TouchableHighlight>

      {props.photo || props.userSavedPhoto ? (
        <TouchableHighlight
          style={styles.nextBtn}
          onPress={props.nextStep}
          underlayColor={"#dd904d"}
        >
          <Text style={styles.peachBtnText}>Dalej</Text>
        </TouchableHighlight>
      ) : null}

      <TouchableHighlight
        style={styles.previousBtn}
        onPress={props.prevStep}
        underlayColor={"#dd904d"}
      >
        <Text style={styles.peachBtnText}>Wróć</Text>
      </TouchableHighlight>
    </View>
  );
};

export default PhotoScreen;
