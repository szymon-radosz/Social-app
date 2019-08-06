import React, { Component, Suspense } from "react";
import { View, Text, NativeModules, Image } from "react-native";
import axios from "axios";
// @ts-ignore
import Geocode from "react-geocode";
import styles from "./style";
const loaderImage: any = require("./../../../assets/images/loader.gif");
var ImagePicker = NativeModules.ImageCropPicker;
import { GlobalContext } from "./../../Context/GlobalContext";

const AgeDescScreen = React.lazy(() => import("./utils/AgeDescScreen"));
const PhotoScreen = React.lazy(() => import("./utils/PhotoScreen"));
const CoordsScreen = React.lazy(() => import("./utils/CoordsScreen"));
const ChooseKidsScreen = React.lazy(() => import("./utils/ChooseKidsScreen"));
const ChooseHobbiesScreen = React.lazy(() =>
  import("./utils/ChooseHobbiesScreen")
);

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyDk3FIFmkVy87I4hq2fdJ1x6H_mDa96I30");

interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}

interface FillNecessaryInfoState {
  age: number;
  desc: string;
  kids: any;
  hobbies: any;
  actualStep: number;
  photo: any;
  actualKidName: string;
  actualKidDate: string;
  actualKidGender: string;
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
      age: 0,
      desc: "",
      kids: [],
      hobbies: [],
      actualStep: 1,
      photo: null,
      locationString: "",
      userSavedPhoto: "",
      actualKidName: "",
      actualKidDate: "2016-05-15",
      actualKidGender: "female",
      region: {
        latitude: 52.237049,
        longitude: 21.017532,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.submitData = this.submitData.bind(this);
    this.setActualKidName = this.setActualKidName.bind(this);
    this.addKid = this.addKid.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.setActualKidDate = this.setActualKidDate.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    this.saveUserKids = this.saveUserKids.bind(this);
    this.getAllHobbies = this.getAllHobbies.bind(this);
    this.changeHobbyStatus = this.changeHobbyStatus.bind(this);
    this.saveHobbies = this.saveHobbies.bind(this);
    this.setGender = this.setGender.bind(this);
    this.cleanUserKids = this.cleanUserKids.bind(this);
    this.cleanUserHobbies = this.cleanUserHobbies.bind(this);
    this.removeKidFromState = this.removeKidFromState.bind(this);
    this.userLocationString = this.userLocationString.bind(this);
  }

  componentDidMount = async () => {
    if (this.context.userData) {
      //console.log(["this.context.userData", this.context.userData]);
      this.setState({
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

      //if user want to edit profile and have some kids, then we format that kids array and assign it to state
      if (this.context.userData.kids && this.context.userData.kids.length > 0) {
        this.context.userData.kids.map(async (kid: any, i: number) => {
          let kidObj = {
            name: kid.name,
            dateOfBirth: kid.date_of_birth,
            childGender: kid.child_gender
          };

          await this.setState(prevState => ({
            kids: [...prevState.kids, kidObj]
          }));
        });
      }
    }
    //user logged in first time
    else {
      await this.getAllHobbies();
    }
  };

  removeKidFromState = (kidName: string): void => {
    this.setState(prevState => ({
      kids: prevState.kids.filter((kid: any) => kid.name !== kidName)
    }));
  };

  cleanUserHobbies = async () => {
    try {
      let API_URL = this.context.API_URL;
      let userId = this.context.userData.id;

      let json = await axios
        .post(API_URL + "/api/cleanUserHobbies", {
          userId: userId
        })
        .catch(function(error) {
          console.log(error.message);
        });

      return json;
    } catch (error) {
      console.log(error);
    }
  };

  cleanUserKids = async () => {
    try {
      let API_URL = this.context.API_URL;
      let userId = this.context.userData.id;

      let json = axios
        .post(API_URL + "/api/cleanUserKids", {
          userId: userId
        })
        .catch(function(error) {
          console.log(error.message);
        });
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  setGender = (gender: string): void => {
    if (gender === "female") {
      this.setState({ actualKidGender: "female" });
    } else if (gender === "male") {
      this.setState({ actualKidGender: "male" });
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
            .catch(function(error) {
              console.log(error.message);
            });

          return json;
        }
      });
    } catch (error) {
      console.log(error);
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
          console.log(["response.data.result", response.data.result]);
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
      .catch(function(error) {
        console.log(error.message);
      });
  };

  setActualKidDate = (date: string): void => {
    this.setState({ actualKidDate: date });
  };

  setActualKidName = (name: string): void => {
    this.setState({ actualKidName: name });
  };

  addKid = async () => {
    if (this.state.actualKidName) {
      let kidObj = {
        name: this.state.actualKidName,
        dateOfBirth: this.state.actualKidDate,
        childGender: this.state.actualKidGender
      };

      await this.setState(prevState => ({
        kids: [...prevState.kids, kidObj]
      }));
      this.setState({
        actualKidName: "",
        actualKidDate: "2016-05-15",
        actualKidGender: "female"
      });
    }
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
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      cropperCircleOverlay: false,
      freeStyleCropEnabled: true,
      compressImageQuality: 1,
      compressVideoPreset: "MediumQuality",
      includeBase64: true
    })
      .then((image: any) => {
        console.log(image);
        this.setState({ photo: image });
      })
      .catch((e: any) => {
        console.log(e);
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
          .catch(function(error) {
            console.log(error);
          });

        return json;
      } catch (error) {
        console.log(error);
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
    const { age, desc, region, locationString } = this.state;

    try {
      let API_URL = this.context.API_URL;
      let userEmailName = this.context.userData.email;

      let json = await axios
        .post(API_URL + "/api/updateUserInfo", {
          userEmail: userEmailName,
          age: age,
          desc: desc,
          lat: region.latitude,
          lng: region.longitude,
          locationString: locationString
        })
        .catch(function(error) {
          console.log(error);
        });

      return json;
    } catch (error) {
      console.log(error);
    }
  };

  saveUserKids = (): void => {
    try {
      let API_URL = this.context.API_URL;
      let userEmailName = this.context.userData.email;

      this.state.kids.map(async (kid: any) => {
        let json = await axios
          .post(API_URL + "/api/saveKid", {
            userEmail: userEmailName,
            name: kid.name,
            dateOfBirth: kid.dateOfBirth,
            childGender: kid.childGender
          })
          .catch(function(error) {
            console.log(error.message);
          });

        return json;
      });
    } catch (error) {
      console.log(error);
    }
  };

  nextStep = (): void => {
    this.setState({ actualStep: this.state.actualStep + 1 });
  };

  prevStep = (): void => {
    this.setState({ actualStep: this.state.actualStep - 1 });
  };

  submitData = async () => {
    this.context.setShowLoader(true);
    //first remove user kids and hobbies and save new data
    await this.userLocationString();
    await this.cleanUserKids();
    await this.cleanUserHobbies();
    await this.saveUserKids();
    await this.saveHobbies();
    await this.saveUserData();
    await this.fileUpload();

    await this.context.setUserFilledInfo();
    this.context.setShowLoader(false);
  };

  render() {
    const {
      age,
      desc,
      photo,
      region,
      kids,
      actualKidDate,
      actualKidName,
      hobbies,
      actualStep,
      actualKidGender,
      userSavedPhoto
    } = this.state;
    return (
      <View data-test="editProfileInfoContainer" style={{ flex: 1 }}>
        {this.context.showLoader ? (
          <View style={styles.loaderContainer} data-test="loaderContainer">
            <Image style={{ width: 100, height: 100 }} source={loaderImage} />
          </View>
        ) : (
          <React.Fragment>
            {actualStep === 1 && (
              <Suspense fallback={<Text>Wczytywanie...</Text>}>
                <AgeDescScreen
                  handleChange={this.handleChange}
                  age={age}
                  desc={desc}
                  nextStep={this.nextStep}
                  data-test="ageDescScreenContainer"
                />
              </Suspense>
            )}
            {actualStep === 2 && (
              <Suspense fallback={<Text>Wczytywanie...</Text>}>
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
              <Suspense fallback={<Text>Wczytywanie...</Text>}>
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
              <Suspense fallback={<Text>Wczytywanie...</Text>}>
                <ChooseKidsScreen
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  setActualKidName={this.setActualKidName}
                  addKid={this.addKid}
                  kids={kids}
                  actualKidDate={actualKidDate}
                  actualKidName={actualKidName}
                  setActualKidDate={this.setActualKidDate}
                  setGender={this.setGender}
                  actualKidGender={actualKidGender}
                  removeKidFromState={this.removeKidFromState}
                  data-test="chooseKidsScreenContainer"
                />
              </Suspense>
            )}
            {actualStep === 5 && (
              <Suspense fallback={<Text>Wczytywanie...</Text>}>
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
    );
  }
}
EditProfileInfo.contextType = GlobalContext;
export default EditProfileInfo;
