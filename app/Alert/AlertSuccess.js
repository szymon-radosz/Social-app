import React, { Component } from "react";
import { Text, View } from "react-native";

const AlertSuccess = props => (
  <View>
    <Text>{props.message}</Text>
  </View>
);

export default AlertSuccess;
