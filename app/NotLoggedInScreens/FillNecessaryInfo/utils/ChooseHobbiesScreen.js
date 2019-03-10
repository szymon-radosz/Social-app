import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

export default class ChooseHobbiesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={styles.headerText}>Wybierz swoje hobby.</Text>
        <View style={styles.hobbiesContainer}>
          {this.props.hobbies &&
            this.props.hobbies.map((hobby, i) => {
              //console.log(["hobby: ", hobby]);
              return (
                <TouchableOpacity
                  onPress={() => this.props.changeHobbyStatus(hobby.keyId)}
                  style={
                    hobby.active
                      ? styles.activeHobbyContainer
                      : styles.hobbyContainer
                  }
                >
                  <Text key={i}>{hobby.name}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
        <View style={styles.btnContainer}>
          <TouchableHighlight style={styles.nextBtn}>
            <Button
              title="Zapisz profil"
              color="#fff"
              onPress={this.props.submitData}
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.previousBtn}>
            <Button
              title="Wróć"
              color="#e07b8d"
              onPress={this.props.prevStep}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  headerText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 22,
    paddingBottom: 20,
    paddingTop: 20
  },
  hobbiesContainer: {
    //justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap"
    //flex: 1
  },
  btnContainer: {
    justifyContent: "center",
    flexDirection: "column"
  },
  hobbyContainer: {
    width: 100,
    height: 100,
    margin: 10,
    //justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5
  },
  activeHobbyContainer: {
    width: 100,
    height: 100,
    margin: 10,
    //justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e07b8d",
    borderRadius: 5
  },

  previousBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto"
  },
  nextBtn: {
    height: 45,
    width: 180,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto"
  }
});
