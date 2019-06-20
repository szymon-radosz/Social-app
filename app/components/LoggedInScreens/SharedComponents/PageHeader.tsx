import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./style";
const backIcon: any = require("./../../../assets/images/backIcon.png");

const PageHeader = (props: {
  boldText: string;
  normalText: string;
  closeMethod: any;
}): any => {
  return (
    <View style={styles.pageHeaderContainer}>
      <TouchableOpacity
        onPress={() => props.closeMethod()}
        style={styles.buttonCloseModal}
      >
        <Image source={backIcon} style={styles.pageHeaderImage} />
      </TouchableOpacity>
      <Text style={styles.filterModalHeaderTextContainer}>
        <Text style={styles.filterModalHeaderTextBold}>{props.boldText}</Text>{" "}
        {props.normalText}
      </Text>
      <View style={styles.pageHeaderImage} />
    </View>
  );
};

export default PageHeader;
