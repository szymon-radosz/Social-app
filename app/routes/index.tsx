import { createAppContainer, createStackNavigator } from "react-navigation";
import React, { Component } from "react";
import NotLoggedInMain from "./../components/NotLoggedInScreens/NotLoggedInMain";
import Welcome from "./../components/NotLoggedInScreens/WelcomeScreen/Welcome";
import Login from "./../components/NotLoggedInScreens/Auth/Login";
import Register from "./../components/NotLoggedInScreens/Auth/Register";
import ResetPassword from "./../components/NotLoggedInScreens/Auth/ResetPassword";
import ConfirmAccount from "./../components/NotLoggedInScreens/Auth/ConfirmAccount";
import FillNecessaryInfo from "./../components/NotLoggedInScreens/EditProfileInfo/EditProfileInfo";
import LoggedInMain from "./../components/LoggedInScreens/LoggedInMain";
import { fadeIn } from "react-navigation-transitions";
import { GlobalContext } from "./../components/Context/GlobalContext";
import Alert from "./../Alert/Alert";
import axios from "axios";
import NavigationService from "./NavigationService";

const MainStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null
      }
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        header: null
      }
    },
    NotLoggedInMain: {
      screen: NotLoggedInMain,
      navigationOptions: {
        header: null
      }
    },
    ConfirmAccount: {
      screen: ConfirmAccount,
      navigationOptions: {
        header: null
      }
    },
    FillNecessaryInfo: {
      screen: FillNecessaryInfo,
      navigationOptions: {
        header: null
      }
    },
    LoggedInMain: {
      screen: LoggedInMain,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "NotLoggedInMain",
    transitionConfig: () => fadeIn()
  }
);

const AppContainer = createAppContainer(MainStack);

//ios
//const API_URL = "http://127.0.0.1:8000/";

//android
//const API_URL = "http://10.0.2.2:8000/";

//live
//const API_URL = "https://e-mamy.pl/";

interface AppState {
  showAlert: boolean;
  alertType: string;
  alertMessage: string;
  userData: any;
  userLoggedIn: boolean;
  //editProfileData: boolean;
  API_URL: string;
}
interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
    setParams: any;
  };
}

export default class App extends Component<
  NavigationScreenInterface,
  AppState
> {
  constructor(props: NavigationScreenInterface) {
    super(props);
    this.state = {
      showAlert: false,
      alertMessage: "",
      alertType: "",
      userData: [],
      userLoggedIn: false,
      //editProfileData: false,
      API_URL: "http://127.0.0.1:8000/"
    };
    this.setAlert = this.setAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.setUserData = this.setUserData.bind(this);
    this.setUserFilledInfo = this.setUserFilledInfo.bind(this);
    this.clearUserUnreadedMessages = this.clearUserUnreadedMessages.bind(this);
    this.clearUserNotificationsStatus = this.clearUserNotificationsStatus.bind(
      this
    );
    this.clearUserData = this.clearUserData.bind(this);
    this.setUserFilledInfo = this.setUserFilledInfo.bind(this);
  }

  setUserFilledInfo = (): void => {
    try {
      let userEmailName = this.state.userData.email;
      let API_URL = this.state.API_URL;
      let that = this;

      console.log(["setUserFilledInfo", userEmailName, API_URL]);

      axios
        .post(API_URL + "/api/setUserFilledInfo", {
          userEmail: userEmailName
        })
        .then(async response => {
          console.log(["setUserFilledInfo", response]);
          if (response.data.status === "OK") {
            await that.setState({
              userData: response.data.result[0]
              //editProfileData: false
            });
            that.checkUserStatus();
          }
        })
        .catch(function(error) {
          console.log(["setUserFilledInfoErr1", error]);
        });
    } catch (error) {
      console.log(["setUserFilledInfoErr2", error]);
    }
  };

  clearUserNotificationsStatus = async (userId: number) => {
    try {
      const { userData } = this.state;
      let API_URL = this.state.API_URL;
      let that = this;

      axios
        .post(API_URL + "/api/clearUserNotificationsStatus", {
          userId: userId
        })
        .then(async response => {
          if (response.data.status === "OK") {
            let newUserState = userData;
            newUserState.unreadedNotifications = false;
            newUserState.unreadedNotificationsAmount = 0;
            await that.setState({ userData: newUserState });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  clearUserUnreadedMessages = async (
    userId: number,
    conversationId: number
  ) => {
    try {
      const { userData } = this.state;
      let API_URL = this.state.API_URL;
      let that = this;

      axios
        .post(API_URL + "/api/setUserMessagesStatus", {
          userId: userId,
          conversationId: conversationId
        })
        .then(async response => {
          if (response.data.status === "OK") {
            let newUserState = userData;
            newUserState.unreadedConversationMessage =
              response.data.result.userUnreadedMessages;
            newUserState.unreadedConversationMessageAmount =
              response.data.result.userUnreadedMessagesCount;
            await that.setState({ userData: newUserState });

            that.checkUserStatus();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

    //console.log(this.state.userData);
  };

  checkUserStatus = (): void => {
    const { userData } = this.state;
    console.log(["checkUserStatus"]);

    if (userData.verified === 1 && userData.user_filled_info === 1) {
      NavigationService.navigate("LoggedInMain", {});
    } else if (userData.verified === 0) {
      NavigationService.navigate("ConfirmAccount", {});
    } else if (userData.verified === 1 && userData.user_filled_info === 0) {
      NavigationService.navigate("FillNecessaryInfo", {});
    }
  };

  setUserData = (data: any) => {
    console.log("setUserData", data);
    const userData = {
      age: data.age,
      conversations: data.conversations,
      description: data.description,
      email: data.email,
      hobbies: data.hobbies,
      id: data.id,
      kids: data.kids,
      lattitude: data.lattitude,
      longitude: data.longitude,
      location_string: data.location_string,
      name: data.name,
      notifications: data.notifications,
      photo_path: data.photo_path,
      unreadedConversationMessage: data.unreadedConversationMessage,
      unreadedConversationMessageAmount: data.unreadedConversationMessageAmount,
      unreadedNotifications: data.unreadedNotifications,
      unreadedNotificationsAmount: data.unreadedNotificationsAmount,
      user_filled_info: data.user_filled_info,
      verified: data.verified,
      votes: data.votes
    };
    this.setState({ userData: userData });

    this.checkUserStatus();
  };

  setAlert = (
    showAlert: boolean,
    alertType: string,
    alertMessage: string
  ): any => {
    this.setState({
      showAlert: showAlert,
      alertType: alertType,
      alertMessage: alertMessage
    });
  };

  closeAlert = () => {
    this.setState({
      showAlert: false,
      alertType: "",
      alertMessage: ""
    });
  };

  clearUserData = (): void => {
    this.setState({ userData: [] });
  };

  componentDidMount = (): void => {
    /*if (!this.state.userLoggedIn) {
      NavigationService.navigate("Welcome", {});
    }*/
    NavigationService.navigate("Welcome", {});
  };

  /*componentDidUpdate = (): void => {
    if (this.state.editProfileData === true) {
      NavigationService.navigate("FillNecessaryInfo", {});
    }
  };*/

  render() {
    const {
      showAlert,
      alertType,
      alertMessage,
      userData,
      //editProfileData,
      API_URL
    } = this.state;

    return (
      <GlobalContext.Provider
        value={{
          showAlert: showAlert,
          alertType: alertType,
          alertMessage: alertMessage,
          setAlert: this.setAlert,
          userData: userData,
          setUserData: this.setUserData,
          clearUserData: this.clearUserData,
          setUserFilledInfo: this.setUserFilledInfo,
          API_URL: API_URL,
          //editProfileData: editProfileData,
          clearUserUnreadedMessages: this.clearUserUnreadedMessages,
          clearUserNotificationsStatus: this.clearUserNotificationsStatus
        }}
      >
        {showAlert != false && (
          <Alert
            alertType={alertType}
            alertMessage={alertMessage}
            closeAlert={this.closeAlert}
          />
        )}
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </GlobalContext.Provider>
    );
  }
}
