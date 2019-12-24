import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";
import Alert from "./../Alert/Alert";
import BottomPanel from "./../SharedComponents/BottomPanel";
import styles from "./style";
import ButtonComponent from "./../Utils/ButtonComponent";
import TextAreaComponent from "./../Utils/TextAreaComponent";
import { GlobalContext } from "./../../Context/GlobalContext";
import axios from "axios";
import { withNavigation } from "react-navigation";
import lang from "./../../assets/lang/FeedbackModal/FeedbackModal";

const loaderImage: any = require("./../../assets/images/loader.gif");

interface FeedbackModalState {
  feedbackMessage: string;
  feedbackTopic: any;
  activeTopic: string;
}

interface FeedbackModalProps {
  navigation: any;
}

class FeedbackModal extends Component<FeedbackModalProps, FeedbackModalState> {
  constructor(props: FeedbackModalProps) {
    super(props);
    this.state = {
      feedbackMessage: "",
      feedbackTopic: [
        { index: 0, text: "App troubles" },
        { index: 1, text: "Rebuild a feature" },
        { index: 2, text: "New feature" },
        { index: 3, text: "Other" }
      ],
      activeTopic: ""
    };
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

  sendFeedback = async () => {
    let topic = this.state.activeTopic;
    let message = this.state.feedbackMessage;
    let userId = this.context.userData.id;
    let API_URL = this.context.API_URL;

    if (!topic || !message) {
      this.context.setAlert(true, "danger", lang.allDataError["en"]);
    }

    if (topic && message && userId && API_URL) {
      await this.context.setShowLoader(true);

      axios
        .post(API_URL + "/api/saveUserFeedback", {
          topic: topic,
          message: message,
          userId: userId
        })
        .then(response => {
          if (response.data.status === "OK") {
            this.setState({
              activeTopic: "",
              feedbackMessage: ""
            });

            this.context.setAlert(true, "success", lang.messageSuccess["en"]);

            this.context.setShowLoader(false);

            this.props.navigation.goBack(null);
          }
        })
        .catch(error => {
          //console.log(error);
          this.context.setAlert(true, "danger", lang.messageError["en"]);

          this.context.setShowLoader(false);

          this.props.navigation.goBack(null);
        });
    }
  };

  componentDidMount = (): void => {
    //console.log("FindUsers did mount");
    /*let user = this.context.userData;
    if (user && user.lattitude && user.longitude) {
      this.loadUsersNearCoords();
    }*/

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
      this.context.setCurrentNavName("");
    });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    const { feedbackTopic, activeTopic, feedbackMessage } = this.state;
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
            {this.context.showLoader ? (
              <View style={styles.loaderContainer} data-test="loader">
                <Image
                  style={{ width: 100, height: 100 }}
                  source={loaderImage}
                />
              </View>
            ) : (
              <React.Fragment>
                <ScrollView keyboardShouldPersistTaps={"always"}>
                  <Text style={styles.feedbackHeaderText}>
                    {lang.header["en"]}
                  </Text>
                  <Text style={styles.feedbackSubHeaderText}>
                    {lang.feedbackText["en"]}
                  </Text>

                  <Text style={styles.feedbackTopic}>
                    {lang.messageSubject["en"]}
                  </Text>

                  {feedbackTopic.map((topic: any, index: number) => {
                    return (
                      <View
                        style={styles.checkboxWrapper}
                        key={`FeedbackModal-${index}`}
                      >
                        <TouchableOpacity
                          onPress={() => this.setFeedbackTopic(index)}
                          style={
                            activeTopic == topic.text
                              ? styles.activeCheckbox
                              : styles.inActiveCheckbox
                          }
                        />
                        <Text
                          onPress={() => this.setFeedbackTopic(index)}
                          style={
                            activeTopic == topic.text
                              ? styles.checkboxTextActive
                              : styles.checkboxText
                          }
                        >
                          {topic.text}
                        </Text>
                      </View>
                    );
                  })}

                  <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <TextAreaComponent
                      placeholder={lang.writeMessage["en"]}
                      inputOnChange={(feedbackMessage: string) =>
                        this.setFeedbackMessage(feedbackMessage)
                      }
                      value={feedbackMessage}
                      maxLength={800}
                      multiline={true}
                      numberOfLines={10}
                    />
                  </View>

                  <ButtonComponent
                    pressButtonComponent={this.sendFeedback}
                    buttonComponentText={lang.send["en"]}
                    fullWidth={true}
                    underlayColor="#dd904d"
                    whiteBg={false}
                    showBackIcon={false}
                  />
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
FeedbackModal.contextType = GlobalContext;
export default withNavigation(FeedbackModal);
