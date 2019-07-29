import React, { Component } from "react";
import {
  StatusBar,
  View,
  TouchableHighlight,
  Image,
  SafeAreaView
} from "react-native";
import styles from "./style";
import LoggedInScreens from "./utils/LoggedInScreens";
import BottomPanel from "./SharedComponents/BottomPanel";
import axios from "axios";
import { GlobalContext } from "./../Context/GlobalContext";
import Alert from "./../../Alert/Alert";
const feedback: any = require("./../../assets/images/feedback.png");

interface NavigationScreenInterface {
  navigation: any;
}

interface LoggedInMainState {
  openFindUsers: boolean;
  openAuctions: boolean;
  openMessages: boolean;
  openProfile: boolean;
  openForum: boolean;
  openFindUserId: number;
  openAuctionId: number;
  openAuctionUserId: number;
  showFeedbackModal: boolean;
  feedbackMessage: string;
  feedbackTopic: any;
  activeTopic: string;
}

class LoggedInMain extends Component<
  NavigationScreenInterface,
  LoggedInMainState
> {
  constructor(props: NavigationScreenInterface) {
    super(props);
    this.state = {
      openFindUsers: true,
      openAuctions: false,
      openMessages: false,
      openProfile: false,
      openForum: false,
      openFindUserId: 0,
      openAuctionId: 0,
      openAuctionUserId: 0,
      showFeedbackModal: false,
      feedbackMessage: "",
      feedbackTopic: [
        { index: 0, text: "Zgłoszenie błędu w aplikacji" },
        { index: 1, text: "Rozbudowanie funkcjonalności" },
        { index: 2, text: "Dodanie nowej funkcjonalności" },
        { index: 3, text: "Inne" }
      ],
      activeTopic: ""
    };

    this.setOpenFindUsers = this.setOpenFindUsers.bind(this);
    this.setOpenAuctions = this.setOpenAuctions.bind(this);
    this.setOpenMessages = this.setOpenMessages.bind(this);
    this.setOpenForum = this.setOpenForum.bind(this);
    this.setOpenProfile = this.setOpenProfile.bind(this);
    this.setShowFeedbackModal = this.setShowFeedbackModal.bind(this);
    this.setFeedbackMessage = this.setFeedbackMessage.bind(this);
    this.sendFeedback = this.sendFeedback.bind(this);
    this.setFeedbackTopic = this.setFeedbackTopic.bind(this);
  }

  componentDidMount() {
    StatusBar.setHidden(true, "none");
  }

  setFeedbackTopic = (index: number) => {
    let activeTopic = this.state.feedbackTopic.find((obj: any) => {
      return obj.index === index;
    });

    this.setState({ activeTopic: activeTopic.text });
  };

  setFeedbackMessage = (message: string) => {
    this.setState({ feedbackMessage: message });
  };

  sendFeedback = (): void => {
    let topic = this.state.activeTopic;
    let message = this.state.feedbackMessage;
    let userId = this.context.userData.id;
    let API_URL = this.context.API_URL;

    let that = this;

    if (!topic || !message) {
      this.context.setAlert(
        true,
        "danger",
        "Prosimy o uzupełnienie wszystkich danych."
      );
    }

    axios
      .post(API_URL + "/api/saveUserFeedback", {
        topic: topic,
        message: message,
        userId: userId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({
            showFeedbackModal: false,
            activeTopic: "",
            feedbackMessage: ""
          });

          that.context.setAlert(true, "success", "Dziękujemy za wiadomość.");
        }
      })
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Problem z wysłaniem wiadomości."
        );
      });
  };

  setShowFeedbackModal = (): void => {
    this.setState({
      showFeedbackModal: !this.state.showFeedbackModal
    });
  };

  setOpenFindUsers = (id: number): void => {
    this.setState({
      openFindUsers: true,
      openAuctions: false,
      openMessages: false,
      openForum: false,
      openProfile: false,
      openFindUserId: id,
      showFeedbackModal: false
    });
  };

  setOpenAuctions = (auctionId: number, auctionUserId: number): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: true,
      openMessages: false,
      openForum: false,
      openProfile: false,
      openAuctionId: auctionId,
      openAuctionUserId: auctionUserId,
      showFeedbackModal: false
    });
  };

  setOpenMessages = (): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: true,
      openForum: false,
      openProfile: false,
      showFeedbackModal: false
    });
  };

  setOpenForum = (): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: false,
      openForum: true,
      openProfile: false,
      showFeedbackModal: false
    });
  };

  setOpenProfile = (): void => {
    this.setState({
      openFindUsers: false,
      openAuctions: false,
      openMessages: false,
      openForum: false,
      openProfile: true,
      showFeedbackModal: false
    });
  };

  render() {
    const navigation = this.props.navigation;
    const {
      openFindUsers,
      openAuctions,
      openMessages,
      openProfile,
      openForum,
      openFindUserId,
      openAuctionId,
      openAuctionUserId,
      showFeedbackModal,
      feedbackMessage,
      feedbackTopic,
      activeTopic
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
          <View style={styles.container} data-test="LoggedInMain">
            <LoggedInScreens
              openFindUsers={openFindUsers}
              openAuctions={openAuctions}
              openMessages={openMessages}
              openProfile={openProfile}
              openForum={openForum}
              openFindUserId={openFindUserId}
              openAuctionId={openAuctionId}
              openAuctionUserId={openAuctionUserId}
              navigation={navigation}
              clearUserData={this.context.clearUserData}
              setOpenMessages={this.setOpenMessages}
              setOpenProfile={this.setOpenProfile}
              setOpenFindUsers={this.setOpenFindUsers}
              setOpenAuctions={this.setOpenAuctions}
              setOpenForum={this.setOpenForum}
              showFeedbackModal={showFeedbackModal}
              setFeedbackMessage={this.setFeedbackMessage}
              feedbackMessage={feedbackMessage}
              sendFeedback={this.sendFeedback}
              feedbackTopic={feedbackTopic}
              setFeedbackTopic={this.setFeedbackTopic}
              activeTopic={activeTopic}
              setShowFeedbackModal={this.setShowFeedbackModal}
              data-test="LoggedInScreens"
            />
            {!showFeedbackModal && (
              <TouchableHighlight
                style={{ position: "absolute", right: 10, bottom: 80 }}
                onPress={this.setShowFeedbackModal}
                underlayColor={"#dd904d"}
                data-test="feedbackIcon"
              >
                <Image source={feedback} style={{ width: 50, height: 50 }} />
              </TouchableHighlight>
            )}
            <BottomPanel
              openFindUsers={this.setOpenFindUsers}
              openAuctions={this.setOpenAuctions}
              openMessages={this.setOpenMessages}
              openProfile={this.setOpenProfile}
              openForum={this.setOpenForum}
              openFindUsersStatus={openFindUsers}
              openAuctionsStatus={openAuctions}
              openMessagesStatus={openMessages}
              openProfileStatus={openProfile}
              openForumStatus={openForum}
              data-test="BottomPanel"
            />
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}

LoggedInMain.contextType = GlobalContext;
export default LoggedInMain;
