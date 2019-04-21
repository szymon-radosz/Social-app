import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground
} from "react-native";
// @ts-ignore
import DatePicker from "react-native-datepicker";
import styles from "./../style";
import { v4 as uuid } from "uuid";
import fillInfoBg from "./../../../assets/images/fillInfoBgMin.jpg";

interface ChooseKidsScreenProps {
  setActualKidName: any;
  actualKidDate: string;
  setActualKidDate: any;
  addKid: any;
  kids: any;
  nextStep: any;
  prevStep: any;
}

export default class ChooseKidsScreen extends Component<ChooseKidsScreenProps> {
  render() {
    return (
      <View>
        <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
          <Text style={styles.headerText}>
            Dodaj swoje dzieci{"\n"}do profilu
          </Text>
        </ImageBackground>
        <View style={styles.infoContainer}>
          <View style={styles.kidsInfoContainer}>
            <TextInput
              placeholder="Imię dziecka"
              placeholderTextColor="#919191"
              style={styles.input}
              onChangeText={(txt: string) => this.props.setActualKidName(txt)}
            />
          </View>
          <DatePicker
            style={styles.dataPicker}
            date={this.props.actualKidDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1980-05-01"
            maxDate="2019-03-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
                marginRight: 10
              },
              dateInput: {
                marginLeft: 36,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderRightWidth: 0
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date: string) => {
              this.props.setActualKidDate(date);
            }}
          />
        </View>

        <TouchableHighlight style={styles.nextBtn}>
          <Button title="Dodaj" color="#fff" onPress={this.props.addKid} />
        </TouchableHighlight>
        <View style={styles.infoContainer}>
          {this.props.kids.length > 0 && (
            <Text style={styles.headerTwoText}>Moje dziecko/dzieci:</Text>
          )}
          {this.props.kids &&
            this.props.kids.map(
              (kid: { name: string; dateOfBirth: string }, i: string) => {
                return (
                  <Text key={uuid()} style={styles.subText}>
                    {kid.name} - {kid.dateOfBirth}
                  </Text>
                );
              }
            )}
        </View>
        <TouchableHighlight style={styles.nextBtn}>
          <Button title="Dalej >" color="#fff" onPress={this.props.nextStep} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.previousBtn}>
          <Button title="< Wróć" color="#fff" onPress={this.props.prevStep} />
        </TouchableHighlight>
      </View>
    );
  }
}
