import React from "react";
import {
  Button,
  Text,
  View,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import styles from "./../style";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import fillInfoBg from "./../../../../assets/images/fillInfoBgMin.jpg";

const mapStyle = [
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

const CoordsScreen = (props: {
  onRegionChange: any;
  region: any;
  nextStep: any;
  prevStep: any;
}): any => {
  return (
    <View>
      <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
        <Text style={styles.headerText}>Wybierz swoją{"\n"}okolicę</Text>
      </ImageBackground>

      <Text style={styles.fillInfoHeader}>
        Wybierz w jakiej okolicy szukasz znajomych
      </Text>

      <MapView
        customMapStyle={mapStyle}
        style={styles.map}
        scrollEnabled={true}
        zoomEnabled={true}
        onRegionChange={props.onRegionChange}
        initialRegion={props.region}
      >
        <Marker coordinate={props.region} />
      </MapView>

      <TouchableHighlight style={styles.nextBtn}>
        <Button title="Dalej" color="#fff" onPress={props.nextStep} />
      </TouchableHighlight>
      <TouchableHighlight style={styles.previousBtn}>
        <Button title="Wróć" color="#fff" onPress={props.prevStep} />
      </TouchableHighlight>
    </View>
  );
};

export default CoordsScreen;
