import React from "react";
import { Text, TouchableHighlight } from "react-native";
import styles from "./style";

const ButtonComponent = (props: {
  pressButtonComponent: any;
  buttonComponentText: string;
  fullWidth: boolean;
  underlayColor: string;
}) => {
  return (
    <TouchableHighlight
      style={
        props.fullWidth
          ? styles.buttonComponentFullWidth
          : styles.buttonComponent
      }
      onPress={props.pressButtonComponent}
      underlayColor={props.underlayColor}
    >
      <Text style={styles.peachBtnText}>{props.buttonComponentText}</Text>
    </TouchableHighlight>
  );
};
export default ButtonComponent;
