import { createAppContainer, createStackNavigator } from "react-navigation";

import NotLoggedInMain from "./../NotLoggedInScreens/NotLoggedInMain";
import Welcome from "./../NotLoggedInScreens/Welcome/Welcome";
import Login from "./../NotLoggedInScreens/Auth/Login";
import Register from "./../NotLoggedInScreens/Auth/Register";
import ConfirmAccount from "./../NotLoggedInScreens/ConfirmAccount/ConfirmAccount";
import FillNecessaryInfo from "./../NotLoggedInScreens/FillNecessaryInfo/FillNecessaryInfo";
import LoggedInMain from "./../LoggedInScreens/LoggedInMain";

const MainStack = createStackNavigator(
  {
    Welcome: Welcome,
    Login: Login,
    Register: Register,
    NotLoggedInMain: NotLoggedInMain,
    ConfirmAccount: ConfirmAccount,
    FillNecessaryInfo: FillNecessaryInfo,
    LoggedInMain: LoggedInMain
  },
  {
    initialRouteName: "NotLoggedInMain"
  }
);

const AppContainer = createAppContainer(MainStack);

export default AppContainer;
