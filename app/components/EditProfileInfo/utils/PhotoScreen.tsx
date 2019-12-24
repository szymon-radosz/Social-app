import React from "react";
import { Text, View, Image, ImageBackground, ScrollView } from "react-native";
import styles from "./../style";
import ButtonComponent from "./../../Utils/ButtonComponent";
import lang from "./../../../assets/lang/EditProfileInfo/utils/PhotoScreen";

const fillInfoBg: any = require("./../../../assets/images/fillInfoBgMin.jpg");

const PhotoScreen = (props: {
  photo: any;
  handleChoosePhoto: any;
  nextStep: any;
  prevStep: any;
  userSavedPhoto: string;
  API_URL: string;
}): any => {
  //console.log(["PhotoScreen", props]);
  return (
    <View style={styles.sectionContainer}>
      <ScrollView>
        <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
          <Text style={styles.headerText}>{lang.header["en"]}</Text>
        </ImageBackground>

        <Text style={styles.fillInfoHeader}>{lang.photoText["en"]}</Text>

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
            buttonComponentText={lang.choose["en"]}
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
            buttonComponentText={lang.back["en"]}
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
              buttonComponentText={lang.next["en"]}
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
