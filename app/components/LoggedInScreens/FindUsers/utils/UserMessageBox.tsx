import React, { Component } from "react";
import { View, SafeAreaView } from "react-native";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import Alert from "./../../../../Alert/Alert";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../../Utils/ButtonComponent";
import TextAreaComponent from "./../../../Utils/TextAreaComponent";
import { GlobalContext } from "./../../../Context/GlobalContext";
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
    console.log([
      "this.props.navigation.state.params.userId",
      this.props.navigation.state.params.userId
    ]);
  };

  sendMessage = (message: string): void => {
    let API_URL = this.context.API_URL;
    let senderId = this.context.userData.id;
    let receiverId = this.props.navigation.state.params.userId;

    console.log(["sendMessage", senderId, receiverId]);

    let that = this;

    axios
      .post(API_URL + "/api/saveConversation", {
        senderId: senderId,
        receiverId: receiverId,
        message: message
      })
      .then(function(response2) {
        if (response2.data.status === "OK") {
          that.context.setAlert(
            true,
            "success",
            "Poprawnie wysłano nową wiadomość."
          );

          //if message send sucessfully then redirect back to user details
          that.props.navigation.navigate("Messages", {});
        } else if (response2.data.status === "ERR") {
          that.context.setAlert(
            true,
            "danger",
            "Problem z wysłaniem wiadomości."
          );
        }
      })
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Problem z wysłaniem wiadomości."
        );
      });

    axios.post(API_URL + "/api/addNotification", {
      type: "started_conversation_user",
      message: `Użytkowniczka ${
        this.context.userData.name
      } odezwała się do Ciebie w wiadomości prywatnej`,
      userId: receiverId
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
                boldText={"Rozpocznij rozmowę"}
                normalText={""}
                closeMethod={() => {
                  this.props.navigation.navigate("UserDetails", {});
                }}
                closeMethodParameter={""}
              />

              <View
                style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}
              >
                <TextAreaComponent
                  placeholder="Napisz wiadomość..."
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
                buttonComponentText="Wyślij"
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
export default UserMessageBox;
