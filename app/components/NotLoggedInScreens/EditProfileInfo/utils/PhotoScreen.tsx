import React from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import styles from "./../style";
import ButtonComponent from "./../../../Utils/ButtonComponent";

const fillInfoBg: any = require("./../../../../assets/images/fillInfoBgMin.jpg");

const PhotoScreen = (props: {
  photo: any;
  handleChoosePhoto: any;
  nextStep: any;
  prevStep: any;
  userSavedPhoto: string;
  API_URL: string;
}): any => {
  console.log(["PhotoScreen", props]);
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
          source={{ uri: `${props.userSavedPhoto}` }}
          style={styles.image}
        />
      ) : null}

      <ButtonComponent
        pressButtonComponent={props.handleChoosePhoto}
        buttonComponentText="Wybierz zdjęcie"
        fullWidth={true}
        underlayColor="#dd904d"
      />

      {props.photo || props.userSavedPhoto ? (
        <ButtonComponent
          pressButtonComponent={props.nextStep}
          buttonComponentText="Dalej"
          fullWidth={true}
          underlayColor="#dd904d"
        />
      ) : null}

      <ButtonComponent
        pressButtonComponent={props.prevStep}
        buttonComponentText="Wróć"
        fullWidth={true}
        underlayColor="#dd904d"
      />
    </View>
  );
};

export default PhotoScreen;
