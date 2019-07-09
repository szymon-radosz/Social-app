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

interface AppState {
  showAlert: boolean;
  alertType: string;
  alertMessage: string;
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
      alertType: ""
    };
    this.setAlert = this.setAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

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
  render() {
    const { showAlert, alertType, alertMessage } = this.state;

    return (
      <GlobalContext.Provider
        value={{
          showAlert: showAlert,
          alertType: alertType,
          alertMessage: alertMessage,
          setAlert: this.setAlert
        }}
      >
        {showAlert != false && (
          <Alert
            alertType={alertType}
            alertMessage={alertMessage}
            closeAlert={this.closeAlert}
          />
        )}
        <AppContainer />
      </GlobalContext.Provider>
    );
  }
}
