import React from "react";
import { Text, TouchableHighlight, Image } from "react-native";
import styles from "./style";
const backArrow: any = require("./../../assets/images/backArrow.png");

const ButtonComponent = (props: {
  pressButtonComponent: any;
  buttonComponentText: string;
  fullWidth: boolean;
  underlayColor: string;
  whiteBg: boolean;
  showBackIcon: boolean;
}) => {
  return (
    <TouchableHighlight
      style={
        props.fullWidth
          ? styles.buttonComponentFullWidth
          : props.whiteBg
          ? styles.buttonComponentFullWidthWhite
          : styles.buttonComponent
      }
      onPress={props.pressButtonComponent}
      underlayColor={props.underlayColor}
    >
      {props.showBackIcon ? (
        <Image source={backArrow} style={{ width: 20 }} resizeMode="contain" />
      ) : (
        <Text style={props.whiteBg ? styles.whiteBtnText : styles.peachBtnText}>
          {props.buttonComponentText}
        </Text>
      )}
    </TouchableHighlight>
  );
};
export default ButtonComponent;
