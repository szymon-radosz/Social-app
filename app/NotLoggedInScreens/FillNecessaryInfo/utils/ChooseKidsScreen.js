import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";
import DatePicker from "react-native-datepicker";
import styles from "./../style";

const ChooseKidsScreen = props => {
  return (
    <View>
      <Text style={styles.headerText}>
        Dodaj do profilu swoje dzieci, aby szukać inne mamy z dziećmi w podobnym
        wieku.
      </Text>
      <TextInput
        placeholder="Imię dziecka"
        placeholderTextColor="#919191"
        style={styles.input}
        onChangeText={txt => props.setActualKidName(txt)}
      />

      <DatePicker
        style={styles.dataPicker}
        date={props.actualKidDate}
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
        onDateChange={date => {
          props.setActualKidDate(date);
        }}
      />
      <TouchableHighlight style={styles.nextBtn}>
        <Button title="Dodaj" color="#fff" onPress={props.addKid} />
      </TouchableHighlight>

      {props.kids.length > 0 && (
        <Text style={styles.headerTwoText}>Moje dziecko/dzieci:</Text>
      )}
      {props.kids &&
        props.kids.map((kid, i) => {
          return (
            <Text key={i} style={styles.subText}>
              {kid.name} - {kid.dateOfBirth}
            </Text>
          );
        })}
      <TouchableHighlight style={styles.nextBtn}>
        <Button title="Dalej" color="#fff" onPress={props.nextStep} />
      </TouchableHighlight>
      <TouchableHighlight style={styles.previousBtn}>
        <Button
          title="Wróć"
          color="#e07b8d"
          style={styles.previousBtn}
          onPress={props.prevStep}
        />
      </TouchableHighlight>
    </View>
  );
};

export default ChooseKidsScreen;
