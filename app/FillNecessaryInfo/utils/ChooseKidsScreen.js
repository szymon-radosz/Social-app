import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput
} from "react-native";
import DatePicker from "react-native-datepicker";

export default class ChooseKidsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>
          Dodaj do profilu swoje dzieci, aby szukać inne mamy z dziećmi w
          podobnym wieku.
        </Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={txt => this.props.setActualKidName(txt)}
        />

        <DatePicker
          style={{ width: 200 }}
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
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.props.setActualKidDate(date);
          }}
        />

        <Button title="Dodaj" onPress={this.props.addKid} />

        {this.props.kids &&
          this.props.kids.map((kid, i) => {
            return (
              <Text key={i}>
                {kid.name} - {kid.dateOfBirth}
              </Text>
            );
          })}

        <Button title="Dalej" onPress={this.props.nextStep} />
        <Button title="Wróć" onPress={this.props.prevStep} />
      </View>
    );
  }
}
