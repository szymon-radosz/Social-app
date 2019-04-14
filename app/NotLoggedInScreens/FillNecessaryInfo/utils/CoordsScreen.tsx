import React, { Component } from "react";
import { Button, Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface CoordsScreenProps {
  onRegionChange: any;
  region: any;
  nextStep: any;
  prevStep: any;
}

const mapStyle = [
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#e9e9e9"
      },
      {
        lightness: 17
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5"
      },
      {
        lightness: 20
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff"
      },
      {
        lightness: 17
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffffff"
      },
      {
        lightness: 29
      },
      {
        weight: 0.2
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff"
      },
      {
        lightness: 18
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff"
      },
      {
        lightness: 16
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5"
      },
      {
        lightness: 21
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#dedede"
      },
      {
        lightness: 21
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#ffffff"
      },
      {
        lightness: 16
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36
      },
      {
        color: "#333333"
      },
      {
        lightness: 40
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#f2f2f2"
      },
      {
        lightness: 19
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#fefefe"
      },
      {
        lightness: 20
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#fefefe"
      },
      {
        lightness: 17
      },
      {
        weight: 1.2
      }
    ]
  }
];

export default class CoordsScreen extends Component<CoordsScreenProps> {
  render() {
    return (
      <View>
        <Text style={styles.headerText}>
          Wybierz okolicę swojego miejsca zamieszkania.
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

        <TouchableHighlight style={styles.nextBtn}>
          <Button title="Dalej" color="#fff" onPress={this.props.nextStep} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.previousBtn}>
          <Button title="Wróć" color="#e07b8d" onPress={this.props.prevStep} />
        </TouchableHighlight>
      </View>
    );
  }
}
