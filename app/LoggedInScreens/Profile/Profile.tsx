import React, { Component } from "react";
import { Platform, Text, View, ImageBackground } from "react-native";
import forumBg from "./../../assets/images/profileBgMin.jpg";
import styles from "./style";

interface ProfileProps {}

export default class Profile extends Component<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <ImageBackground source={forumBg} style={{ width: "100%" }}>
          <Text style={styles.pageTitle}>
            Zaktualizuj swoje
            {"\n"}informacje.
          </Text>
        </ImageBackground>
        <Text>E-mamy.pl Profile</Text>
      </View>
    );
  }
}
