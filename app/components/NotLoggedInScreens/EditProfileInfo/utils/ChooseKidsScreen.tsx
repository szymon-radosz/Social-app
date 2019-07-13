import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from "react-native";
// @ts-ignore
import DatePicker from "react-native-datepicker";
import styles from "./../style";
import { v4 as uuid } from "uuid";
import ButtonComponent from "./../../../Utils/ButtonComponent";
import InputComponent from "./../../../Utils/InputComponent";
import ListItemDelete from "./../../../Utils/ListItemDelete";

const fillInfoBg: any = require("./../../../../assets/images/fillInfoBgMin.jpg");
const trash: any = require("./../../../../assets/images/trash.png");

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
          <InputComponent
            placeholder="Imię dziecka"
            inputOnChange={(name: string) => props.setActualKidName(name)}
            value={props.actualKidName}
            secureTextEntry={false}
            maxLength={100}
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
              top: 2,
              marginLeft: 8,
              marginRight: 10
            },
            dateInput: {
              marginTop: -2,
              marginLeft: 48,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRightWidth: 0,
              height: 38,
              borderLeftColor: "#8c8c8c",
              color: "#424242",
              borderLeftWidth: 2
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
              <TouchableOpacity
                onPress={() => props.setGender("male")}
                style={
                  props.actualKidGender === "male"
                    ? styles.activeCheckbox
                    : styles.inActiveCheckbox
                }
              />

              <Text
                onPress={() => props.setGender("male")}
                style={styles.checkboxText}
              >
                Chłopiec
              </Text>
            </View>
            <View style={styles.checkboxWrapper}>
              <TouchableOpacity
                onPress={() => props.setGender("female")}
                style={
                  props.actualKidGender === "female"
                    ? styles.activeCheckbox
                    : styles.inActiveCheckbox
                }
              />

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

      <TouchableHighlight
        style={styles.nextBtn}
        onPress={props.addKid}
        underlayColor={"#dd904d"}
      >
        <Text style={styles.peachBtnText}>Dodaj</Text>
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
                  <ListItemDelete
                    key={uuid()}
                    text={`${kid.name} - chłopiec - ${kid.dateOfBirth}`}
                    onPress={() => {
                      props.removeKidFromState(kid.name);
                    }}
                  />
                );
              } else if (kid.childGender === "female") {
                return (
                  <ListItemDelete
                    key={uuid()}
                    text={`${kid.name} - dziewczynka - ${kid.dateOfBirth}`}
                    onPress={() => {
                      props.removeKidFromState(kid.name);
                    }}
                  />
                );
              }
            }
          )}
      </View>
      <View style={{ marginBottom: 30 }}>
        <ButtonComponent
          pressButtonComponent={props.nextStep}
          buttonComponentText="Dalej"
          fullWidth={true}
          underlayColor="#dd904d"
        />

        <ButtonComponent
          pressButtonComponent={props.prevStep}
          buttonComponentText="Wróć"
          fullWidth={true}
          underlayColor="#dd904d"
        />
      </View>
    </ScrollView>
  );
};
export default ChooseKidsScreen;
