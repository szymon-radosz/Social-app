import { createAppContainer, createStackNavigator } from "react-navigation";
import React, { Component } from "react";
//import NotLoggedInMain from "./../components/NotLoggedInScreens/NotLoggedInMain";
import Welcome from "./../components/WelcomeScreen/Welcome";
import Login from "./../components/Auth/Login";
import Register from "./../components/Auth/Register";
import ResetPassword from "./../components/Auth/ResetPassword";
import ConfirmAccount from "./../components/Auth/ConfirmAccount";
import FillNecessaryInfo from "./../components/EditProfileInfo/EditProfileInfo";
//Users
import FindUsers from "./../components/FindUsers/FindUsers";
import UserDetails from "./../components/FindUsers/utils/UserDetails";
import UserMessageBox from "./../components/FindUsers/utils/UserMessageBox";
//Auctions
import Auctions from "./../components/Auctions/Auctions";
import ProductDetails from "./../components/Auctions/utils/ProductDetails";
import AddNewProductBox from "./../components/Auctions/utils/AddNewProductBox";
//Messages
import Messages from "./../components/Messages/Messages";
import ConversationDetails from "./../components/Messages/utils/ConversationDetails";
//Forum
import Forum from "./../components/Forum/Forum";
import SavePost from "./../components/Forum/utils/SavePost";
import PostDetails from "./../components/Forum/utils/PostDetails";
//Profile
import Profile from "./../components/Profile/Profile";
import UserFriendsList from "./../components/Profile/utils/UserFriendsList";
import UserAuctionsList from "./../components/Profile/utils/UserAuctionsList";
import UserNotificationList from "./../components/Profile/utils/UserNotificationList";
import About from "./../components/Profile/utils/About";
//Feedback
import FeedbackModal from "./../components/FeedbackModal/FeedbackModal";
//@ts-ignore
import { fadeIn } from "react-navigation-transitions";
import { GlobalContext } from "./../Context/GlobalContext";
import axios from "axios";
import NavigationService from "./NavigationService";

const MainStack = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
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
    /*NotLoggedInMain: {
      screen: NotLoggedInMain,
      navigationOptions: {
        header: null
      }
    },*/
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
    UserList: {
      screen: FindUsers,
      navigationOptions: {
        header: null
      }
    },
    UserDetails: {
      screen: UserDetails,
      navigationOptions: {
        header: null
      }
    },
    UserMessageBox: {
      screen: UserMessageBox,
      navigationOptions: {
        header: null
      }
    },
    Auctions: {
      screen: Auctions,
      navigationOptions: {
        header: null
      }
    },
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions: {
        header: null
      }
    },
    AddNewProduct: {
      screen: AddNewProductBox,
      navigationOptions: {
        header: null
      }
    },
    Messages: {
      screen: Messages,
      navigationOptions: {
        header: null
      }
    },
    ConversationDetails: {
      screen: ConversationDetails,
      navigationOptions: {
        header: null
      }
    },
    Forum: {
      screen: Forum,
      navigationOptions: {
        header: null
      }
    },
    AddNewPost: {
      screen: SavePost,
      navigationOptions: {
        header: null
      }
    },
    PostDetails: {
      screen: PostDetails,
      navigationOptions: {
        header: null
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null
      }
    },
    UserFriendsList: {
      screen: UserFriendsList,
      navigationOptions: {
        header: null
      }
    },
    UserAuctionsList: {
      screen: UserAuctionsList,
      navigationOptions: {
        header: null
      }
    },
    UserNotificationList: {
      screen: UserNotificationList,
      navigationOptions: {
        header: null
      }
    },
    FeedbackModal: {
      screen: FeedbackModal,
      navigationOptions: {
        header: null
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Welcome",
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
  showLoader: boolean;
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
      API_URL: "http://127.0.0.1:8000/",
      //API_URL: "https://e-mamy.pl/",
      showLoader: false
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
    this.setShowLoader = this.setShowLoader.bind(this);
  }

  setShowLoader = (param: boolean): any => {
    this.setState({
      showLoader: param
    });
  };

  setUserFilledInfo = async () => {
    let userEmailName = this.state.userData.email;
    let API_URL = this.state.API_URL;
    let that = this;

    let json = await axios
      .post(API_URL + "/api/setUserFilledInfo", {
        userEmail: userEmailName
      })
      .then(async response => {
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

    return json;
  };

  clearUserNotificationsStatus = async (userId: number) => {
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

            //that.checkUserStatus();
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
      NavigationService.navigate("UserList", {});
    } else if (userData.verified === 0) {
      NavigationService.navigate("ConfirmAccount", {});
    } else if (userData.verified === 1 && userData.user_filled_info === 0) {
      NavigationService.navigate("FillNecessaryInfo", {});
    }
  };

  setUserData = (data: any) => {
    //console.log("setUserData", data);

    if (data) {
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
        unreadedConversationMessageAmount:
          data.unreadedConversationMessageAmount,
        unreadedNotifications: data.unreadedNotifications,
        unreadedNotificationsAmount: data.unreadedNotificationsAmount,
        user_filled_info: data.user_filled_info,
        verified: data.verified,
        votes: data.votes
      };
      this.setState({ userData: userData });

      this.checkUserStatus();
    } else {
      this.setState({ userData: [] });
    }
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
    NavigationService.navigate("Welcome", {});
  };

  render() {
    const {
      showAlert,
      alertType,
      alertMessage,
      userData,
      API_URL,
      showLoader
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
          clearUserUnreadedMessages: this.clearUserUnreadedMessages,
          clearUserNotificationsStatus: this.clearUserNotificationsStatus,
          showLoader: showLoader,
          setShowLoader: this.setShowLoader,
          closeAlert: this.closeAlert,
          //@ts-ignore
          NavigationService: NavigationService
        }}
      >
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          alertType={alertType}
          alertMessage={alertMessage}
          closeAlert={this.closeAlert}
          showAlert={showAlert}
        />
      </GlobalContext.Provider>
    );
  }
}
