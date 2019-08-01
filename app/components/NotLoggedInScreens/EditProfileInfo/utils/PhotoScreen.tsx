import React from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ImageBackground,
  ScrollView
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
    <View style={styles.sectionContainer}>
      <ScrollView>
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

        <View style={{ marginTop: 10 }}>
          <ButtonComponent
            pressButtonComponent={props.handleChoosePhoto}
            buttonComponentText="Wybierz zdjęcie"
            fullWidth={true}
            underlayColor="#dd904d"
            whiteBg={false}
            showBackIcon={false}
          />
        </View>
      </ScrollView>

      <View style={styles.sectionBtnBackContainer}>
        <View style={{ width: "30%" }}>
          <ButtonComponent
            pressButtonComponent={props.prevStep}
            buttonComponentText="Wróć"
            fullWidth={false}
            underlayColor="#dd904d"
            whiteBg={true}
            showBackIcon={true}
          />
        </View>
        <View style={{ width: "71%" }}>
          {props.photo || props.userSavedPhoto ? (
            <ButtonComponent
              pressButtonComponent={props.nextStep}
              buttonComponentText="Dalej"
              fullWidth={true}
              underlayColor="#dd904d"
              whiteBg={false}
              showBackIcon={false}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default PhotoScreen;
