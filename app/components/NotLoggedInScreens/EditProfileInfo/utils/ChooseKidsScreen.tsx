import React from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  ScrollView
} from "react-native";
// @ts-ignore
import DatePicker from "react-native-datepicker";
import styles from "./../style";
import { v4 as uuid } from "uuid";
import fillInfoBg from "./../../../../assets/images/fillInfoBgMin.jpg";
import style from "../../../LoggedInScreens/style";

const ChooseKidsScreen = (props: {
  setActualKidName: any;
  actualKidDate: string;
  setActualKidDate: any;
  addKid: any;
  kids: any;
  nextStep: any;
  prevStep: any;
  setGender: any;
  actualKidGender: string;
  actualKidName: string;
  removeKidFromState: any;
}): any => {
  return (
    <ScrollView>
      <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
        <Text style={styles.headerText}>
          Dodaj swoje dzieci{"\n"}do profilu
        </Text>
      </ImageBackground>

      <View style={styles.infoContainer}>
        <Text style={styles.fillInfoHeader}>
          Dodaj informacje o dzieciach, aby znajdować matki o dzieciach w
          podobnym wieku i płci.
        </Text>
        <View style={styles.kidsInfoContainer}>
          <TextInput
            placeholder={"Imię dziecka"}
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={(txt: string) => props.setActualKidName(txt)}
          />
        </View>
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
          onDateChange={(date: string) => {
            props.setActualKidDate(date);
          }}
        />

        <View style={styles.childGenderContainer}>
          <Text style={styles.childGenderText}>Płeć dziecka</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxWrapper}>
              <TouchableHighlight
                onPress={() => props.setGender("male")}
                style={
                  props.actualKidGender === "male"
                    ? styles.activeCheckbox
                    : styles.inActiveCheckbox
                }
              >
                <Button
                  title=""
                  color="#000"
                  onPress={() => props.setGender("male")}
                />
              </TouchableHighlight>

              <Text
                onPress={() => props.setGender("male")}
                style={styles.checkboxText}
              >
                Chłopiec
              </Text>
            </View>
            <View style={styles.checkboxWrapper}>
              <TouchableHighlight
                onPress={() => props.setGender("female")}
                style={
                  props.actualKidGender === "female"
                    ? styles.activeCheckbox
                    : styles.inActiveCheckbox
                }
              >
                <Button
                  title=""
                  color="#000"
                  onPress={() => props.setGender("female")}
                />
              </TouchableHighlight>

              <Text
                onPress={() => props.setGender("female")}
                style={styles.checkboxText}
              >
                Dziewczynka
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableHighlight style={styles.nextBtn}>
        <Button title="Dodaj" color="#fff" onPress={props.addKid} />
      </TouchableHighlight>
      <View style={styles.infoContainer}>
        {props.kids.length > 0 && (
          <Text style={styles.headerTwoText}>Moje dziecko/dzieci:</Text>
        )}
        {props.kids &&
          props.kids.map(
            (
              kid: { name: string; dateOfBirth: string; childGender: string },
              i: string
            ) => {
              if (kid.childGender === "male") {
                return (
                  <Text
                    onPress={() => {
                      props.removeKidFromState(kid.name);
                    }}
                    key={uuid()}
                    style={styles.subText}
                  >
                    {kid.name} - chłopiec - {kid.dateOfBirth}
                  </Text>
                );
              } else if (kid.childGender === "female") {
                return (
                  <Text
                    onPress={() => {
                      props.removeKidFromState(kid.name);
                    }}
                    key={uuid()}
                    style={styles.subText}
                  >
                    {kid.name} - dziewczynka - {kid.dateOfBirth}
                  </Text>
                );
              }
            }
          )}
      </View>
      <TouchableHighlight style={styles.nextBtn}>
        <Button title="Dalej" color="#fff" onPress={props.nextStep} />
      </TouchableHighlight>
      <TouchableHighlight style={styles.previousBtn}>
        <Button title="Wróć" color="#fff" onPress={props.prevStep} />
      </TouchableHighlight>
    </ScrollView>
  );
};
export default ChooseKidsScreen;
