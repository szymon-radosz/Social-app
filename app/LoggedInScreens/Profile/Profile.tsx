import React, { Component } from "react";
import { Platform, Text, View } from "react-native";

interface ProfileProps {}

export default class Profile extends Component<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>E-mamy.pl Profile</Text>
      </View>
    );
  }
}
