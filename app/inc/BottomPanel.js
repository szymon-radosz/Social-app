import React, { Component } from "react";
import { AppRegistry, Text, View, Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonBottom: {
    color: "red",
    fontWeight: "bold",
    backgroundColor: "#fff",
    fontSize: 10
  },
  bottomPanel: {
    borderTopWidth: 2,
    flexDirection: "row",
    alignSelf: "flex-start"
  }
});

export default class BottomPanel extends Component {
  render() {
    return (
      <View style={styles.bottomPanel}>
        <Button
          //onPress={onPressLearnMore}
          title="Szukaj"
          color="#424242"
          fontWeight="bold"
          backgroundColor="#fff"
          fontSize={10}
        />
        <Button
          //onPress={onPressLearnMore}
          title="Forum"
          color="#424242"
          fontWeight="bold"
          backgroundColor="#fff"
          fontSize={10}
          //accessibilityLabel="Learn more about this purple button"
        />
        <Button
          //onPress={onPressLearnMore}
          title="Poczta"
          color="#424242"
          fontWeight="bold"
          backgroundColor="#fff"
          fontSize={10}
          //accessibilityLabel="Learn more about this purple button"
        />
        <Button
          //onPress={onPressLearnMore}
          title="Giełda"
          color="#424242"
          fontWeight="bold"
          backgroundColor="#fff"
          fontSize={10}
          style={styles.buttonBottom}
          //accessibilityLabel="Learn more about this purple button"
        />
        <Button
          //onPress={onPressLearnMore}
          title="Profil"
          color="#424242"
          fontWeight="bold"
          backgroundColor="#fff"
          fontSize={10}
          style={styles.buttonBottom}
          //accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
