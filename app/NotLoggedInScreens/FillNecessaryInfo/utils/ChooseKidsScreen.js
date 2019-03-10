import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  TouchableHighlight
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
        <Text style={styles.headerText}>
          Dodaj do profilu swoje dzieci, aby szukać inne mamy z dziećmi w
          podobnym wieku.
        </Text>
        <TextInput
          placeholder="Imię dziecka"
          placeholderTextColor="#919191"
          style={styles.input}
          onChangeText={txt => this.props.setActualKidName(txt)}
        />

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
          onDateChange={date => {
            this.props.setActualKidDate(date);
          }}
        />
        <TouchableHighlight style={styles.nextBtn}>
          <Button title="Dodaj" color="#fff" onPress={this.props.addKid} />
        </TouchableHighlight>

        {this.props.kids.length > 0 && (
          <Text style={styles.headerTwoText}>Moje dziecko/dzieci:</Text>
        )}
        {this.props.kids &&
          this.props.kids.map((kid, i) => {
            return (
              <Text key={i} style={styles.subText}>
                {kid.name} - {kid.dateOfBirth}
              </Text>
            );
          })}
        <TouchableHighlight style={styles.nextBtn}>
          <Button title="Dalej" color="#fff" onPress={this.props.nextStep} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.previousBtn}>
          <Button
            title="Wróć"
            color="#e07b8d"
            style={styles.previousBtn}
            onPress={this.props.prevStep}
          />
        </TouchableHighlight>
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
  headerTwoText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 20
  },
  subText: {
    textAlign: "center",
    color: "#333",
    fontWeight: "400",
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5
  },
  input: {
    width: "90%",
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "auto"
  },
  dataPicker: {
    width: "90%",
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "auto"
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: "auto",
    marginRight: "auto"
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
