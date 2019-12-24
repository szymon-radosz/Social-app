import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import styles from "./../style";
import ButtonComponent from "./../../Utils/ButtonComponent";
import lang from "./../../../assets/lang/EditProfileInfo/utils/ChooseHobbiesScreen";

const fillInfoBg: any = require("./../../../assets/images/fillInfoBgMin.jpg");
const gymOrange: any = require("./../../../assets/images/editProfile/gymOrange.png");
const walkOrange: any = require("./../../../assets/images/editProfile/walkOrange.png");
const ecoOrange: any = require("./../../../assets/images/editProfile/ecoOrange.png");
const airplaneOrange: any = require("./../../../assets/images/editProfile/airplaneOrange.png");
const bookOrange: any = require("./../../../assets/images/editProfile/bookOrange.png");
const cookingOrange: any = require("./../../../assets/images/editProfile/cookingOrange.png");
const tvOrange: any = require("./../../../assets/images/editProfile/tvOrange.png");
const vegetablesOrange: any = require("./../../../assets/images/editProfile/vegetablesOrange.png");
const ticketsOrange: any = require("./../../../assets/images/editProfile/ticketsOrange.png");
const spotlightsOrange: any = require("./../../../assets/images/editProfile/spotlightsOrange.png");
const musicOrange: any = require("./../../../assets/images/editProfile/musicOrange.png");
const dressOrange: any = require("./../../../assets/images/editProfile/dressOrange.png");
const danceOrange: any = require("./../../../assets/images/editProfile/danceOrange.png");
const moneyOrange: any = require("./../../../assets/images/editProfile/moneyOrange.png");
const palmOrange: any = require("./../../../assets/images/editProfile/palmOrange.png");
const paintOrange: any = require("./../../../assets/images/editProfile/paintOrange.png");
const networkOrange: any = require("./../../../assets/images/editProfile/networkOrange.png");
const cameraOrange: any = require("./../../../assets/images/editProfile/cameraOrange.png");

const ChooseHobbiesScreen = (props: {
  hobbies: any;
  changeHobbyStatus: any;
  submitData: any;
  prevStep: any;
}): any => {
  //console.log(["props.hobbies", props.hobbies]);
  return (
    <View style={styles.sectionContainer}>
      <ScrollView>
        <ImageBackground source={fillInfoBg} style={{ width: "100%" }}>
          <Text style={styles.headerText}>{lang.header["en"]}</Text>
        </ImageBackground>
        <Text style={styles.fillInfoHeader}>{lang.hobbyText["en"]}</Text>
        <View style={styles.hobbiesContainer}>
          {props.hobbies &&
            props.hobbies.map(
              (
                hobby: { keyId: number; active: boolean; name: string },
                i: number
              ) => {
                return (
                  <TouchableOpacity
                    onPress={() => props.changeHobbyStatus(hobby.keyId)}
                    style={
                      hobby.active
                        ? styles.activeHobbyContainer
                        : styles.hobbyContainer
                    }
                    key={`ChooseHobbiesScreen-${i}`}
                  >
                    {hobby.name === "Sport" ? (
                      <View>
                        <Image
                          source={gymOrange}
                          resizeMode="contain"
                          style={styles.hobbyOptionImage}
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Spacery" ? (
                      <View>
                        <Image
                          source={walkOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Zero Waste" ? (
                      <View>
                        <Image
                          source={ecoOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Podróże" ? (
                      <View>
                        <Image
                          source={airplaneOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Czytanie" ? (
                      <View>
                        <Image
                          source={bookOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Gotowanie" ? (
                      <View>
                        <Image
                          source={cookingOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Seriale" ? (
                      <View>
                        <Image
                          source={tvOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Odżywianie" ? (
                      <View>
                        <Image
                          source={vegetablesOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Kino" ? (
                      <View>
                        <Image
                          source={ticketsOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Teatr" ? (
                      <View>
                        <Image
                          source={spotlightsOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Muzyka" ? (
                      <View>
                        <Image
                          source={musicOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Moda" ? (
                      <View>
                        <Image
                          source={dressOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Taniec" ? (
                      <View>
                        <Image
                          source={danceOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Biznes" ? (
                      <View>
                        <Image
                          source={moneyOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Zwierzęta" ? (
                      <View>
                        <Image
                          source={palmOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Sztuka" ? (
                      <View>
                        <Image
                          source={paintOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Social Media" ? (
                      <View>
                        <Image
                          source={networkOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : hobby.name === "Fotografia" ? (
                      <View>
                        <Image
                          source={cameraOrange}
                          style={styles.hobbyOptionImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.hobbyOptionText}>{hobby.name}</Text>
                      </View>
                    ) : (
                      <View>
                        <Text>{hobby.name}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }
            )}
        </View>
      </ScrollView>

      <View style={styles.sectionBtnBackContainer}>
        <View style={{ width: "30%" }}>
          <ButtonComponent
            pressButtonComponent={props.prevStep}
            buttonComponentText={lang.back["en"]}
            fullWidth={false}
            underlayColor="#dd904d"
            whiteBg={true}
            showBackIcon={true}
          />
        </View>
        <View style={{ width: "71%" }}>
          <ButtonComponent
            pressButtonComponent={props.submitData}
            buttonComponentText={lang.save["en"]}
            fullWidth={true}
            underlayColor="#dd904d"
            whiteBg={false}
            showBackIcon={false}
          />
        </View>
      </View>
    </View>
  );
};

export default ChooseHobbiesScreen;
