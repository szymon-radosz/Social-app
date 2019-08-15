import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./style";
const backIcon: any = require("./../../assets/images/backIcon.png");

const PageHeader = (props: {
  boldText: string;
  normalText: string;
  closeMethod: any;
  closeMethodParameter: any;
}): any => {
  return (
    <View style={styles.pageHeaderContainer}>
      <TouchableOpacity
        onPress={() => props.closeMethod(props.closeMethodParameter)}
        style={styles.buttonCloseModal}
      >
        <Image source={backIcon} style={styles.pageHeaderImage} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={styles.filterModalHeaderTextContainer}>
          <Text style={styles.filterModalHeaderTextBold}>{props.boldText}</Text>
          {props.normalText}
        </Text>
      </View>
      <View style={styles.pageHeaderImage} />
    </View>
  );
};

export default PageHeader;
