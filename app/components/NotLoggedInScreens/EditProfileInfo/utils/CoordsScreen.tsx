import React, { Component } from "react";
import { Text, View, ImageBackground } from "react-native";
import styles from "./../style";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ButtonComponent from "./../../../Utils/ButtonComponent";

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

        <ButtonComponent
          pressButtonComponent={this.props.nextStep}
          buttonComponentText="Dalej"
          fullWidth={true}
          underlayColor="#dd904d"
        />
        <ButtonComponent
          pressButtonComponent={this.props.prevStep}
          buttonComponentText="Wróć"
          fullWidth={true}
          underlayColor="#dd904d"
        />
      </View>
    );
  }
}
