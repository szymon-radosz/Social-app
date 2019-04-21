import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import styles from "./../style";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import fillInfoBg from "./../../../assets/images/fillInfoBgMin.jpg";

interface CoordsScreenProps {
  onRegionChange: any;
  region: any;
  nextStep: any;
  prevStep: any;
}

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

export default class CoordsScreen extends Component<CoordsScreenProps> {
  render() {
    return (
      <View>
        <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
          <Text style={styles.headerText}>Wybierz swoją{"\n"}okolicę</Text>
        </ImageBackground>

        <MapView
          customMapStyle={mapStyle}
          style={styles.map}
          scrollEnabled={true}
          zoomEnabled={true}
          onRegionChange={this.props.onRegionChange}
          initialRegion={this.props.region}
        >
          <Marker coordinate={this.props.region} />
        </MapView>

        <TouchableHighlight style={styles.nextBtn}>
          <Button title="Dalej >" color="#fff" onPress={this.props.nextStep} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.previousBtn}>
          <Button title="< Wróć" color="#fff" onPress={this.props.prevStep} />
        </TouchableHighlight>
      </View>
    );
  }
}
