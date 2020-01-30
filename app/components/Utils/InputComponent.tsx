import React from "react";
import { TextInput } from "react-native";
import styles from "./style";

const InputComponent = (props: {
  placeholder: string;
  inputOnChange: (text: string) => void;
  value: string;
  secureTextEntry: boolean;
  maxLength: number;
}) => {
  return (
    <TextInput
      secureTextEntry={props.secureTextEntry}
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor="#919191"
      onChangeText={props.inputOnChange}
      value={props.value}
      maxLength={props.maxLength}
    />
  );
};
export default InputComponent;
