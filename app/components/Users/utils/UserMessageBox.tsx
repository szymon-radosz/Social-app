import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import Alert from "./../../Alert/Alert";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../Utils/ButtonComponent";
import TextAreaComponent from "./../../Utils/TextAreaComponent";
import { GlobalContext } from "./../../../Context/GlobalContext";
import { withNavigation } from "react-navigation";
import lang from "./../../../assets/lang/Users/utils/UserMessageBox";
import axios from "axios";

interface UserMessageBoxState {
  message: string;
  userMessage: string;
}

interface UserMessageBoxProps {
  navigation: any;
}

class UserMessageBox extends Component<
  UserMessageBoxProps,
  UserMessageBoxState
> {
  constructor(props: UserMessageBoxProps) {
    super(props);
    this.state = {
      userMessage: "",
      message: ""
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("willFocus", () => {
      /*console.log([
        "this.props.navigation.state.params.userId",
        navigation.state.params.userId
      ]);*/

      let API_URL = this.context.API_URL;
      let loggedInUser = this.context.userData.id;
      let searchedUser = navigation.state.params.userId;

      axios
        .post(API_URL + "/api/checkIfUsersBelongsToConversation", {
          loggedInUser: loggedInUser,
          searchedUser: searchedUser
        })
        .then(response => {
          if (response.data.status === "OK" && response.data.result === true) {
            /*console.log([
              "checkIfUsersBelongsToConversation",
              response.data.result
            ]);*/

            navigation.navigate("UserList", {});
          }
        });
    });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  sendMessage = (message: string): void => {
    let API_URL = this.context.API_URL;
    let senderId = this.context.userData.id;
    let receiverId = this.props.navigation.state.params.userId;
    let openDetailsId = 0;

    axios
      .post(API_URL + "/api/saveConversation", {
        senderId: senderId,
        receiverId: receiverId,
        message: message
      })
      .then(response => {
        if (response.data.status === "OK") {
          openDetailsId = response.data.result.id;
          this.context.setAlert(true, "success", lang.sendMessageSuccess["en"]);

          //if message send sucessfully then redirect back to user details
          //that.props.navigation.navigate("Messages", {});
        } else if (response.data.status === "ERR") {
          this.context.setAlert(true, "danger", lang.sendMessageError["en"]);
        }
      })
      .then(response =>
        axios.post(API_URL + "/api/addNotification", {
          type: "started_conversation_user",
          message: `${this.context.userData.name} ${lang.sendYouMessage["en"]}`,
          userId: receiverId,
          senderId: this.context.userData.id,
          openDetailsId: openDetailsId
        })
      )
      .then(response => {
        this.props.navigation.push("ConversationDetails", {
          conversationId: openDetailsId,
          receiverId: receiverId
        });
      })
      .catch(error => {
        this.context.setAlert(true, "danger", lang.sendMessageError["en"]);
      });
  };

  setUserMessage = (message: string): void => {
    this.setState({ userMessage: message });
  };

  render() {
    const { userMessage } = this.state;

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
            <View style={styles.relative}>
              <PageHeader
                boldText={lang.sendMessage["en"]}
                normalText={""}
                closeMethod={() => {
                  this.props.navigation.goBack(null);
                }}
                closeMethodParameter={""}
              />

              <View
                style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}
              >
                <TextAreaComponent
                  placeholder={lang.message["en"]}
                  inputOnChange={(message: string) =>
                    this.setUserMessage(message)
                  }
                  value={userMessage}
                  maxLength={500}
                  multiline={true}
                  numberOfLines={10}
                />
              </View>

              <ButtonComponent
                pressButtonComponent={() => this.sendMessage(userMessage)}
                buttonComponentText={lang.sendMessage["en"]}
                fullWidth={true}
                underlayColor="#dd904d"
                whiteBg={false}
                showBackIcon={false}
              />
            </View>
            <BottomPanel
              data-test="BottomPanel"
              navigation={this.props.navigation}
            />
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

UserMessageBox.contextType = GlobalContext;
export default withNavigation(UserMessageBox);
