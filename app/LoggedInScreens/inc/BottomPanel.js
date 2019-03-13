import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  Image,
  ImageButton
} from "react-native";
import styles from "./style";
import network from "./../../assets/images/network.png";
import sell from "./../../assets/images/sell.png";
import message from "./../../assets/images/message.png";
import forum from "./../../assets/images/forum.png";
import profile from "./../../assets/images/profile.png";

const API_URL = "http://127.0.0.1:8000/";

export default class BottomPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*componentDidMount() {
    this.props.navigation.navigate("FindUsers", {
      API_URL: API_URL,
      setUserData: this.props.navigation.getParam("setUserData")
    });
  }*/

  render() {
    return (
      <View style={styles.bottomPanel}>
        <TouchableOpacity onPress={() => this.props.openFindUsers()}>
          <Image
            style={styles.buttonImage}
            source={network}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>POZNAJ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.openAuctions()}>
          <Image
            style={styles.buttonImage}
            source={sell}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>TARG</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.openEvents()}>
          <Image
            style={styles.buttonImage}
            source={message}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>WIADOMOŚCI</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.buttonImage}
            source={forum}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>FORUM</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.openFProfile()}>
          <Image
            style={styles.buttonImage}
            source={profile}
            resizeMode="contain"
          />
          <Text style={styles.buttonText}>PROFIL</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
