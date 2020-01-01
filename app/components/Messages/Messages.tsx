import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import Alert from "./../Alert/Alert";
import BottomPanel from "./../SharedComponents/BottomPanel";
import axios from "axios";
import styles from "./style";
import { GlobalContext } from "./../../Context/GlobalContext";
import MessageList from "./utils/MessageList";
import { withNavigation } from "react-navigation";
import lang from "./../../assets/lang/Messages/Messages";

const messagesBgMin: any = require("./../../assets/images/messagesBgMin.jpg");
const loaderImage: any = require("./../../assets/images/loader.gif");

interface MessagesState {
  messagesList: any;
  showFilterPanel: boolean;
  displayPrivateMessages: boolean;
}

interface MessagesProps {
  navigation: any;
}

class Messages extends Component<MessagesProps, MessagesState> {
  constructor(props: MessagesProps) {
    super(props);
    this.state = {
      messagesList: [],
      showFilterPanel: false,
      displayPrivateMessages: false
    };
  }

  closeConversationDetails = (): void => {
    this.getMessages();
    this.setState({ showFilterPanel: true });
  };

  //load all conversation with messages for them
  getMessages = (): void => {
    let API_URL = this.context.API_URL;
    let user_id = this.context.userData.id;

    this.context.setShowLoader(true);

    axios
      .post(API_URL + "/api/showUserConversations", {
        user_id: user_id
      })
      .then(async response => {
        if (response.data.status === "OK") {
          //console.log(["messagesList", response.data.result.conversationData]);
          await this.setState({
            messagesList: response.data.result.conversationData,
            displayPrivateMessages: true
          });

          await this.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        await this.context.setAlert(
          true,
          "danger",
          lang.conversationDetailsError["en"]
        );

        await this.context.setShowLoader(false);
      });
  };

  getAuctionMessages = (): void => {
    let API_URL = this.context.API_URL;
    let user_id = this.context.userData.id;

    this.context.setShowLoader(true);

    axios
      .post(API_URL + "/api/showUserConversations", {
        user_id: user_id,
        showProductsConversations: true
      })
      .then(async response => {
        if (response.data.status === "OK") {
          //console.log(response.data.result.conversationData);
          await this.setState({
            messagesList: response.data.result.conversationData,
            displayPrivateMessages: false
          });

          await this.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        await this.context.setAlert(
          true,
          "danger",
          lang.conversationDetailsError["en"]
        );

        await this.context.setShowLoader(false);
      });
  };

  componentDidMount = (): void => {
    /*if (this.context.userData) {
      this.getMessages();
      this.setState({ displayPrivateMessages: true, showFilterPanel: true });
    }*/

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
      //console.log("Focus listener mount messages");

      this.context.setCurrentNavName("WIADOMOŚCI");

      this.getMessages();
      this.setState({ displayPrivateMessages: true, showFilterPanel: true });
    });
  };

  componentWillUnmount() {
    //console.log("Focus listener unmount messages");

    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    const {
      displayPrivateMessages,
      showFilterPanel,
      messagesList
    } = this.state;
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
            data-test="Messages"
          >
            {this.context.showLoader ? (
              <View style={styles.loaderContainer} data-test="loader">
                <Image
                  style={{ width: 100, height: 100 }}
                  source={loaderImage}
                />
              </View>
            ) : (
              <React.Fragment>
                <ScrollView>
                  <ImageBackground
                    source={messagesBgMin}
                    style={{ width: "100%" }}
                    data-test="ImageBackground"
                  >
                    <Text style={styles.pageTitle}>{lang.header["en"]}</Text>
                  </ImageBackground>

                  {showFilterPanel && (
                    <View data-test="showFilterPanel">
                      <View style={styles.filterBtnContainer}>
                        <View style={styles.singleButtonCol2Container}>
                          <TouchableOpacity
                            onPress={this.getMessages}
                            style={
                              displayPrivateMessages
                                ? styles.filterBtnActive
                                : styles.filterBtn
                            }
                          >
                            <Text
                              style={
                                displayPrivateMessages
                                  ? styles.filterBtnTextActive
                                  : styles.filterBtnText
                              }
                            >
                              {lang.privateMessages["en"]}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.singleButtonCol2Container}>
                          <TouchableOpacity
                            onPress={this.getAuctionMessages}
                            style={
                              !displayPrivateMessages
                                ? styles.filterBtnActive
                                : styles.filterBtn
                            }
                          >
                            <Text
                              style={
                                !displayPrivateMessages
                                  ? styles.filterBtnTextActive
                                  : styles.filterBtnText
                              }
                            >
                              {lang.itemsMessages["en"]}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}

                  {messagesList ? (
                    messagesList.length > 0 ? (
                      <MessageList
                        messagesList={messagesList}
                        navigation={this.props.navigation}
                        data-test="MessageList"
                      />
                    ) : displayPrivateMessages ? (
                      <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                        {lang.noResultsUsers["en"]}
                      </Text>
                    ) : (
                      <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                        {lang.noResultsItems["en"]}
                      </Text>
                    )
                  ) : null}
                </ScrollView>
                <BottomPanel
                  data-test="BottomPanel"
                  navigation={this.props.navigation}
                />
              </React.Fragment>
            )}
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
Messages.contextType = GlobalContext;
export default withNavigation(Messages);
