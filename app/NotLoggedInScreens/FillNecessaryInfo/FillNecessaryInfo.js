import React, { Component } from "react";
import { View } from "react-native";
import AgeDescScreen from "./utils/AgeDescScreen";
import PhotoScreen from "./utils/PhotoScreen";
import CoordsScreen from "./utils/CoordsScreen";
import ChooseKidsScreen from "./utils/ChooseKidsScreen";
import ChooseHobbiesScreen from "./utils/ChooseHobbiesScreen";
import ImagePicker from "react-native-image-picker";
import axios from "axios";

export default class FillNecessaryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      desc: "",
      kids: [],
      hobbies: [],
      actualStep: 1,
      photo: null,
      kids: [],
      actualKidName: "",
      actualKidDate: "2016-05-15",
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
  }

  componentDidMount() {
    this.getAllHobbies();
  }

  saveHobbies() {
    try {
      let API_URL = this.props.navigation.getParam("API_URL", "");
      let userEmailName = this.props.navigation.getParam("user").email;

      this.state.hobbies.map(hobby => {
        if (hobby.active) {
          axios
            .post(API_URL + "/api/saveHobbyUser", {
              userEmail: userEmailName,
              hobby_id: hobby.id
            })
            .then(response => {
              if (response.data.status === "OK") {
                console.log(response);
              }
            })
            .catch(function(error) {
              console.log(error.message);
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  changeHobbyStatus(hobbyKeyId) {
    let newHobbies = this.state.hobbies;

    //Find index of specific object using findIndex method.
    hobbyUpdateElementIndex = newHobbies.findIndex(
      obj => obj.keyId == hobbyKeyId
    );

    newHobbies[hobbyUpdateElementIndex].active = !newHobbies[
      hobbyUpdateElementIndex
    ].active;

    this.setState({ hobbies: newHobbies });
  }

  async onRegionChange(region) {
    await this.setState({ region });
  }

  getAllHobbies() {
    let API_URL = this.props.navigation.getParam("API_URL", "");

    axios
      .get(API_URL + "/api/hobbiesList")
      .then(response => {
        if (response.data.status === "OK") {
          response.data.result.map((hobby, i) => {
            let hobbyObj = {
              name: hobby.name,
              id: hobby.id,
              keyId: i,
              active: false
            };

            this.setState(prevState => ({
              hobbies: [...prevState.hobbies, hobbyObj]
            }));

            //console.log(this.state);
          });
        }
      })
      .catch(function(error) {
        console.log(error.message);
      });
  }

  setActualKidDate(date) {
    this.setState({ actualKidDate: date });
  }

  setActualKidName(name) {
    this.setState({ actualKidName: name });
  }

  async addKid() {
    if (this.state.actualKidName) {
      let kidObj = {
        name: this.state.actualKidName,
        dateOfBirth: this.state.actualKidDate
      };

      await this.setState(prevState => ({
        kids: [...prevState.kids, kidObj]
      }));
    }

    //console.log(["kids", this.state]);
  }

  async handleChange(name, value) {
    await this.setState(() => ({ [name]: value }));

    //console.log(this.state);
  }

  handleChoosePhoto() {
    const options = {
      noData: true,
      maxWidth: 500,
      maxHeight: 500,
      quality: 1.0
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log(response);
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  }

  fileUpload() {
    try {
      let API_URL = this.props.navigation.getParam("API_URL", "");
      let userEmailName = this.props.navigation.getParam("user").email;

      console.log([
        this.state.photo.uri,
        userEmailName.split("@")[0],
        userEmailName
      ]);

      axios
        .post(
          API_URL + "/api/uploadUserPhoto",
          {
            file: this.state.photo.uri,
            fileName: userEmailName.split("@")[0],
            userEmail: userEmailName
          }
          /* {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }*/
        )
        .then(response => {
          console.log(["fileUpload", response]);
          if (response.data.status === "OK") {
            console.log(response);
          }
        })
        .catch(function(error) {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  saveUserData() {
    console.log(this.props.navigation.getParam("user"));
    try {
      let API_URL = this.props.navigation.getParam("API_URL", "");
      let userEmailName = this.props.navigation.getParam("user").email;

      axios
        .post(API_URL + "/api/updateUserInfo", {
          userEmail: userEmailName,
          age: this.state.age,
          desc: this.state.desc,
          lat: this.state.region.latitude,
          lng: this.state.region.longitude
        })
        .then(response => {
          if (response.data.status === "OK") {
            console.log(response);
          }
        })
        .catch(function(error) {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  saveUserKids() {
    try {
      let API_URL = this.props.navigation.getParam("API_URL", "");
      let userEmailName = this.props.navigation.getParam("user").email;

      this.state.kids.map(kid => {
        axios
          .post(API_URL + "/api/saveKid", {
            userEmail: userEmailName,
            name: kid.name,
            dateOfBirth: kid.dateOfBirth
          })
          .then(response => {
            if (response.data.status === "OK") {
              console.log(response);
            }
          })
          .catch(function(error) {
            console.log(error.message);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  nextStep() {
    console.log(this.state.actualStep);
    this.setState({ actualStep: this.state.actualStep + 1 });
  }

  prevStep() {
    this.setState({ actualStep: this.state.actualStep - 1 });
  }

  submitData() {
    let navProps = this.props.navigation.state.params;

    this.saveUserData();
    this.fileUpload();
    this.saveUserKids();
    this.saveHobbies();

    navProps.setUserFilledInfo();
  }

  render() {
    return (
      <View>
        {this.state.actualStep === 1 && (
          <AgeDescScreen
            handleChange={this.handleChange}
            age={this.state.age}
            desc={this.state.desc}
            nextStep={this.nextStep}
          />
        )}

        {this.state.actualStep === 2 && (
          <PhotoScreen
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            photo={this.state.photo}
            handleChoosePhoto={this.handleChoosePhoto}
            fileUpload={this.fileUpload}
          />
        )}

        {this.state.actualStep === 3 && (
          <CoordsScreen
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            onRegionChange={this.onRegionChange}
            region={this.state.region}
          />
        )}

        {this.state.actualStep === 4 && (
          <ChooseKidsScreen
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            setActualKidName={this.setActualKidName}
            addKid={this.addKid}
            kids={this.state.kids}
            actualKidDate={this.state.actualKidDate}
            setActualKidDate={this.setActualKidDate}
          />
        )}

        {this.state.actualStep === 5 && (
          <ChooseHobbiesScreen
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            submitData={this.submitData}
            hobbies={this.state.hobbies}
            changeHobbyStatus={this.changeHobbyStatus}
          />
        )}
      </View>
    );
  }
}
