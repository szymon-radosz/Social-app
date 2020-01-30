import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import styles from "./style";
const trash: any = require("./../../assets/images/trash.png");

const ListItemDelete = (props: {
  key: string;
  text: string;
  onPress: () => void;
}) => {
  return (
    <View key={props.key} style={styles.removeFilterBtnContainer}>
      <Text style={styles.removeFilterText}>{props.text}</Text>
      <TouchableHighlight
        style={styles.removeFilterBtn}
        onPress={props.onPress}
        underlayColor={"#dd904d"}
      >
        <Image source={trash} style={{ width: 20, height: 20 }} />
      </TouchableHighlight>
    </View>
  );
};
export default ListItemDelete;
