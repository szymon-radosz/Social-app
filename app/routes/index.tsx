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
    Welcome: Welcome,
    Login: Login,
    Register: Register,
    ResetPassword: ResetPassword,
    NotLoggedInMain: NotLoggedInMain,
    ConfirmAccount: ConfirmAccount,
    FillNecessaryInfo: FillNecessaryInfo,
    LoggedInMain: LoggedInMain
  },
  {
    initialRouteName: "NotLoggedInMain",
    transitionConfig: () => fadeIn()
  }
);

const AppContainer = createAppContainer(MainStack);

export default AppContainer;
