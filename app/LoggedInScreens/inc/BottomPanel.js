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

const API_URL = "http://127.0.0.1:8000/";

export default class BottomPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*componentDidMount() {
    this.props.navigation.navigate("FindUsers", {
      API_URL: API_URL,
      setUserData: this.props.navigation.getParam("setUserData")
    });
  }*/

  render() {
    return (
      <View style={styles.bottomPanel}>
        <Button
          onPress={() => this.props.openFindUsers()}
          title="Poznaj"
          color="#424242"
          fontWeight="bold"
          backgroundColor="#fff"
          fontSize={10}
        />
        <Button
          onPress={() => this.props.openAuctions()}
          title="Giełda"
          color="#424242"
          fontWeight="bold"
          backgroundColor="#fff"
          fontSize={10}
          //accessibilityLabel="Learn more about this purple button"
        />
        <Button
          //onPress={onPressLearnMore}
          title="Jak to działa?"
          color="#424242"
          fontWeight="bold"
          backgroundColor="#fff"
          fontSize={10}
          //accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => this.props.openEvents()}
          title="Wydarzenia"
          color="#424242"
          fontWeight="bold"
          backgroundColor="#fff"
          fontSize={10}
          style={styles.buttonBottom}
          //accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={() => this.props.openFProfile()}
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
