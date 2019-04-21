import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import styles from "./../style";
import fillInfoBg from "./../../../assets/images/fillInfoBgMin.jpg";

interface AgeDescScreenInterface {
  handleChange: any;
  age: any;
  desc: string;
  nextStep: any;
}

export default class AgeDescScreen extends Component<AgeDescScreenInterface> {
  render() {
    return (
      <View>
        <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
          <Text style={styles.headerText}>Opowiedz nam o{"\n"}sobie</Text>
        </ImageBackground>

        <View style={styles.infoContainer}>
          <Text style={styles.subText}>Wiek</Text>
          <TextInput
            placeholder="Wiek"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={(txt: string) => this.props.handleChange("age", txt)}
            keyboardType="numeric"
            maxLength={3}
          >
            {this.props.age !== 0 && this.props.age}
          </TextInput>

          <Text style={styles.subText}>
            Opis * ({this.props.desc.length}/100 znaków)
          </Text>
          <TextInput
            placeholder="Opis"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={(txt: string) => this.props.handleChange("desc", txt)}
            maxLength={100}
          >
            {this.props.desc}
          </TextInput>
        </View>

        {this.props.age.length > 0 && (
          <TouchableHighlight style={styles.nextBtn}>
            <Button
              title="Dalej >"
              color="#fff"
              onPress={this.props.nextStep}
            />
          </TouchableHighlight>
        )}
      </View>
    );
  }
}
