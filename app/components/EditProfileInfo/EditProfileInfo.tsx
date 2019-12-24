import React, { Component, Suspense } from "react";
import { View, Text, NativeModules, Image, SafeAreaView } from "react-native";
import axios from "axios";
// @ts-ignore
import Geocode from "react-geocode";
import styles from "./style";
const loaderImage: any = require("./../../assets/images/loader.gif");
var ImagePicker = NativeModules.ImageCropPicker;
import { GlobalContext } from "./../../Context/GlobalContext";
import Alert from "./../Alert/Alert";
import lang from "./../../assets/lang/EditProfileInfo/EditProfileInfo";

const AgeDescScreen = React.lazy(() => import("./utils/AgeDescScreen"));
const PhotoScreen = React.lazy(() => import("./utils/PhotoScreen"));
const CoordsScreen = React.lazy(() => import("./utils/CoordsScreen"));
const ChooseHobbiesScreen = React.lazy(() =>
  import("./utils/ChooseHobbiesScreen")
);

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyDfVowJ0BKBbPW_-eCzkUA-Zk55VFE16AI");

interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}

interface FillNecessaryInfoState {
  nickname: string;
  age: number;
  desc: string;
  hobbies: any;
  actualStep: number;
  photo: any;
  region: any;
  userSavedPhoto: string;
  locationString: string;
}

class EditProfileInfo extends Component<
  NavigationScreenInterface,
  FillNecessaryInfoState
> {
  constructor(props: NavigationScreenInterface) {
    super(props);
    this.state = {
      nickname: "",
      age: 0,
      desc: "",
      hobbies: [],
      actualStep: 1,
      photo: null,
      locationString: "",
      userSavedPhoto: "",
      region: {
        latitude: 52.237049,
        longitude: 21.017532,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  componentDidMount = async () => {
    if (this.context.userData) {
      //console.log(["this.context.userData", this.context.userData]);
      this.setState({
        nickname: this.context.userData.nickname,
        age: this.context.userData.age,
        desc: this.context.userData.description
          ? this.context.userData.description
          : "",
        userSavedPhoto: this.context.userData.photo_path
      });

      if (
        this.context.userData.lattitude !== 0 &&
        this.context.userData.longitude !== 0
      ) {
        this.setState({
          region: {
            latitude: this.context.userData.lattitude,
            longitude: this.context.userData.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }
        });
      }

      await this.getAllHobbies();
    }
    //user logged in first time
    else {
      await this.getAllHobbies();
    }
  };

  cleanUserHobbies = async () => {
    try {
      let API_URL = this.context.API_URL;
      let userId = this.context.userData.id;

      let json = await axios
        .post(API_URL + "/api/cleanUserHobbies", {
          userId: userId
        })
        .catch(error => {
          //console.log(error.message);
        });

      return json;
    } catch (error) {
      //console.log(error);
    }
  };

  saveHobbies = (): void => {
    try {
      let API_URL = this.context.API_URL;
      let userEmailName = this.context.userData.email;

      this.state.hobbies.map(async (hobby: { active: boolean; id: number }) => {
        if (hobby.active) {
          let json = await axios
            .post(API_URL + "/api/saveHobbyUser", {
              userEmail: userEmailName,
              hobby_id: hobby.id
            })
            .catch(error => {
              //console.log(error.message);
            });

          return json;
        }
      });
    } catch (error) {
      //console.log(error);
    }
  };

  changeHobbyStatus = (hobbyKeyId: number): void => {
    let newHobbies = this.state.hobbies;

    //Find index of specific object using findIndex method.
    let hobbyUpdateElementIndex = newHobbies.findIndex(
      (obj: { keyId: number }) => obj.keyId == hobbyKeyId
    );

    newHobbies[hobbyUpdateElementIndex].active = !newHobbies[
      hobbyUpdateElementIndex
    ].active;

    this.setState({ hobbies: newHobbies });
  };

  onRegionChange = async (region: any) => {
    await this.setState({ region });
  };

  getAllHobbies = (): void => {
    let API_URL = this.context.API_URL;
    let activeHobbies: { name: string }[] = [];
    //if user want to edit profile and have some hobbies, then we format that hobbies array and set active hobbies
    if (
      this.context.userData.hobbies &&
      this.context.userData.hobbies.length > 0
    ) {
      this.context.userData.hobbies.map(async (hobby: any, i: number) => {
        let activeHobbyObj = {
          name: hobby.name
        };
        activeHobbies.push(activeHobbyObj);
      });
    }

    axios
      .get(API_URL + "/api/hobbiesList")
      .then(response => {
        if (response.data.status === "OK") {
          //console.log(["response.data.result", response.data.result]);
          //loop through existing state list of all hobbies and check if name is element of activeHobbies
          response.data.result.map(
            (hobby: { name: string; id: number }, i: number) => {
              let hobbyObj = {};

              if (
                activeHobbies.filter(
                  activeHobby => activeHobby.name === hobby.name
                ).length > 0
              ) {
                hobbyObj = {
                  name: hobby.name,
                  id: hobby.id,
                  keyId: i,
                  active: true
                };
              } else {
                hobbyObj = {
                  name: hobby.name,
                  id: hobby.id,
                  keyId: i,
                  active: false
                };
              }

              this.setState(prevState => ({
                hobbies: [...prevState.hobbies, hobbyObj]
              }));
            }
          );
        }
      })
      .catch(error => {
        //console.log(error.message);
      });
  };

  handleChange = (name: string, value: string) => {
    // @ts-ignore
    this.setState((): void => ({ [name]: value }));
  };

  handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      forceJpg: true,
      cropperCircleOverlay: false,
      freeStyleCropEnabled: true,
      compressImageQuality: 0.8,
      compressVideoPreset: "MediumQuality",
      includeBase64: true
    })
      .then((image: any) => {
        //console.log(image);
        this.setState({ photo: image });
      })
      .catch((e: any) => {
        //console.log(e);
      });
  };

  fileUpload = async () => {
    if (this.state.photo !== null) {
      try {
        let API_URL = this.context.API_URL;
        let userEmailName = this.context.userData.email;

        const formData = new FormData();
        formData.append("file", this.state.photo.data);
        formData.append("fileName", userEmailName.split("@")[0]);
        formData.append("userEmail", userEmailName);

        let json = await axios
          .post(API_URL + "api/uploadUserPhoto", formData)
          .catch(error => {
            //console.log(error);
          });

        return json;
      } catch (error) {
        //console.log(error);
      }
    }
  };

  userLocationString = async () => {
    const { region } = this.state;

    let locationString;
    await Geocode.fromLatLng(region.latitude, region.longitude).then(
      (res: any) => {
        if (
          res.results[0].address_components[2] &&
          res.results[0].address_components[2].long_name &&
          res.results[0].address_components[3] &&
          res.results[0].address_components[3].long_name
        ) {
          let cityDistrict = res.results[0].address_components[2].long_name;
          let city = res.results[0].address_components[3].long_name;

          locationString = `${cityDistrict}, ${city}`;
          this.setState({ locationString: locationString });
        } else {
          locationString = `${res.results[0].formatted_address}`;

          this.setState({ locationString: locationString });
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  };

  saveUserData = async () => {
    const { age, nickname, desc, region, locationString } = this.state;

    try {
      let API_URL = this.context.API_URL;
      let userEmailName = this.context.userData.email;

      let json = await axios
        .post(API_URL + "/api/updateUserInfo", {
          userEmail: userEmailName,
          nickname: nickname,
          age: age,
          desc: desc,
          lat: region.latitude,
          lng: region.longitude,
          locationString: locationString
        })
        .catch(error => {
          //console.log(error);
        });

      return json;
    } catch (error) {
      //console.log(error);
    }
  };

  checkAvailableNickname = async () => {
    const { nickname } = this.state;

    try {
      let API_URL = this.context.API_URL;
      let userEmailName = this.context.userData.email;

      let json = await axios
        .post(API_URL + "/api/checkAvailableNickname", {
          userEmail: userEmailName,
          nickname: nickname
        })
        .then(async response => {
          this.context.setShowLoader(true);
          if (response.data.status === "OK") {
            await this.saveData();

            this.context.setShowLoader(false);

            return true;
          } else {
            await this.setState({ actualStep: 1 });

            this.context.setAlert(true, "danger", lang.nickExistsError["en"]);

            this.context.setShowLoader(false);

            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });

      return json;
    } catch (error) {
      return false;
    }
  };

  nextStep = (): void => {
    this.setState({ actualStep: this.state.actualStep + 1 });
  };

  prevStep = (): void => {
    this.setState({ actualStep: this.state.actualStep - 1 });
  };

  saveData = async () => {
    //first remove user kids and hobbies and save new data
    await this.userLocationString();
    await this.cleanUserHobbies();
    await this.saveHobbies();
    await this.saveUserData();
    await this.fileUpload();

    await this.context.setUserFilledInfo();
    await this.setState({ actualStep: 1 });
  };

  submitData = () => {
    this.checkAvailableNickname();
  };

  render() {
    const {
      nickname,
      age,
      desc,
      photo,
      region,
      hobbies,
      actualStep,
      userSavedPhoto
    } = this.state;
    return (
      <React.Fragment>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff"
          }}
        >
          {this.context.showAlert && (
            <Alert
              alertType={this.context.alertType}
              alertMessage={this.context.alertMessage}
              closeAlert={this.context.closeAlert}
            />
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
            data-test="FindUsers"
          >
            <View data-test="editProfileInfoContainer" style={{ flex: 1 }}>
              {this.context.showLoader ? (
                <View
                  style={styles.loaderContainer}
                  data-test="loaderContainer"
                >
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={loaderImage}
                  />
                </View>
              ) : (
                <React.Fragment>
                  {actualStep === 1 && (
                    <Suspense fallback={<Text>{lang.loading["en"]}</Text>}>
                      <AgeDescScreen
                        handleChange={this.handleChange}
                        nickname={nickname}
                        age={age}
                        desc={desc}
                        nextStep={this.nextStep}
                        data-test="ageDescScreenContainer"
                      />
                    </Suspense>
                  )}
                  {actualStep === 2 && (
                    <Suspense fallback={<Text>{lang.loading["en"]}</Text>}>
                      <PhotoScreen
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        photo={photo}
                        handleChoosePhoto={this.handleChoosePhoto}
                        API_URL={this.context.API_URL}
                        userSavedPhoto={userSavedPhoto}
                        data-test="photoScreenContainer"
                      />
                    </Suspense>
                  )}
                  {actualStep === 3 && (
                    <Suspense fallback={<Text>{lang.loading["en"]}</Text>}>
                      <CoordsScreen
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        onRegionChange={this.onRegionChange}
                        region={region}
                        data-test="coordsScreenContainer"
                      />
                    </Suspense>
                  )}
                  {actualStep === 4 && (
                    <Suspense fallback={<Text>{lang.loading["en"]}</Text>}>
                      <ChooseHobbiesScreen
                        prevStep={this.prevStep}
                        submitData={this.submitData}
                        hobbies={hobbies}
                        changeHobbyStatus={this.changeHobbyStatus}
                        data-test="chooseHobbiesScreenContainer"
                      />
                    </Suspense>
                  )}
                </React.Fragment>
              )}
            </View>
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
EditProfileInfo.contextType = GlobalContext;
export default EditProfileInfo;
