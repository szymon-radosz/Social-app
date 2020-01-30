import React from "react";
import { TextInput } from "react-native";
import styles from "./style";

const TextAreaComponent = (props: {
  placeholder: string;
  inputOnChange: (text: string) => void;
  value: string;
  maxLength: number;
  multiline: boolean;
  numberOfLines: number;
}) => {
  return (
    <TextInput
      style={styles.textarea}
      placeholder={props.placeholder}
      placeholderTextColor="#919191"
      onChangeText={props.inputOnChange}
      value={props.value}
      maxLength={props.maxLength}
      multiline={props.multiline}
      numberOfLines={props.numberOfLines}
    />
  );
};
export default TextAreaComponent;
