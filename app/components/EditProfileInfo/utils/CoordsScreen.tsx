import React, { Component } from "react";
import { Text, View, ImageBackground, ScrollView } from "react-native";
import styles from "./../style";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ButtonComponent from "./../../Utils/ButtonComponent";
import lang from "./../../../assets/lang/EditProfileInfo/utils/CoordsScreen";

const fillInfoBg: any = require("./../../../assets/images/fillInfoBgMin.jpg");

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
      <View style={styles.sectionContainer}>
        <ScrollView>
          <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
            <Text style={styles.headerText}>{lang.header["en"]}</Text>
          </ImageBackground>

          <Text style={styles.fillInfoHeader}>{lang.cordsText["en"]}</Text>

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
        </ScrollView>

        <View style={styles.sectionBtnBackContainer}>
          <View style={{ width: "30%" }}>
            <ButtonComponent
              pressButtonComponent={this.props.prevStep}
              buttonComponentText={lang.back["en"]}
              fullWidth={false}
              underlayColor="#dd904d"
              whiteBg={true}
              showBackIcon={true}
            />
          </View>
          <View style={{ width: "71%" }}>
            <ButtonComponent
              pressButtonComponent={this.props.nextStep}
              buttonComponentText={lang.next["en"]}
              fullWidth={true}
              underlayColor="#dd904d"
              whiteBg={false}
              showBackIcon={false}
            />
          </View>
        </View>
      </View>
    );
  }
}
