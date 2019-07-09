import React, { Component } from "react";
import { Text, View, TouchableHighlight, ImageBackground } from "react-native";
import styles from "./../style";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
const fillInfoBg: any = require("./../../../../assets/images/fillInfoBgMin.jpg");

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
interface CoordsScreenProps {
  onRegionChange: any;
  region: any;
  nextStep: any;
  prevStep: any;
}

interface CoordsScreenState {}

export default class CoordsScreen extends Component<
  CoordsScreenProps,
  CoordsScreenState
> {
  constructor(props: CoordsScreenProps) {
    super(props);
  }

  render() {
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
          onRegionChange={this.props.onRegionChange}
          initialRegion={this.props.region}
        >
          <Marker coordinate={this.props.region} />
        </MapView>

        <TouchableHighlight
          style={styles.nextBtn}
          onPress={this.props.nextStep}
          underlayColor={"#dd904d"}
        >
          <Text style={styles.peachBtnText}>Dalej</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.previousBtn}
          onPress={this.props.prevStep}
          underlayColor={"#dd904d"}
        >
          <Text style={styles.peachBtnText}>Wróć</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
