import { createAppContainer, createStackNavigator } from "react-navigation";

import NotLoggedInMain from "./../components/NotLoggedInScreens/NotLoggedInMain";
import Welcome from "./../components/NotLoggedInScreens/WelcomeScreen/Welcome";
import Login from "./../components/NotLoggedInScreens/Auth/Login";
import Register from "./../components/NotLoggedInScreens/Auth/Register";
import ResetPassword from "./../components/NotLoggedInScreens/Auth/ResetPassword";
import ConfirmAccount from "./../components/NotLoggedInScreens/Auth/ConfirmAccount";
import FillNecessaryInfo from "./../components/NotLoggedInScreens/EditProfileInfo/EditProfileInfo";
import LoggedInMain from "./../components/LoggedInScreens/LoggedInMain";

import { fadeIn } from "react-navigation-transitions";

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

export default AppContainer;
