import React, { Component } from "react";
import {
  Platform,
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import styles from "./../style";
import Alert from "./../../../Alert/Alert";
import { v4 as uuid } from "uuid";

interface UserOnListState {
  showUserDetails: boolean;
  showUserMessageBox: boolean;
  message: string;
  alertMessage: string;
  alertType: string;
  usersAreInTheSameConversation: boolean;
}

interface UserOnListProps {
  user: {
    id: number;
    photo_path: string;
    name: string;
    age: string;
    kids: any;
    hobbies: any;
  };
  API_URL: string;
  senderId: number;
  openMessages: any;
}

export default class UserOnList extends Component<
  UserOnListProps,
  UserOnListState
> {
  constructor(props: UserOnListProps) {
    super(props);
    this.state = {
      showUserDetails: false,
      showUserMessageBox: false,
      message: "",
      alertMessage: "",
      alertType: "",
      usersAreInTheSameConversation: false
    };

    this.setShowUserDetails = this.setShowUserDetails.bind(this);
    this.hideShowUserDetails = this.hideShowUserDetails.bind(this);
    this.setShowUserMessageBox = this.setShowUserMessageBox.bind(this);
    this.hideShowUserMessageBox = this.hideShowUserMessageBox.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage = (): void => {
    console.log(["send", this.props.user.id]);

    let API_URL = this.props.API_URL;
    let senderId = this.props.senderId;
    let receiverId = this.props.user.id;
    let message = this.state.message;

    //console.log([API_URL, sender_id, receiver_id, message]);

    let that = this;

    axios
      .post(API_URL + "/api/saveConversation", {
        senderId: senderId,
        receiverId: receiverId,
        message: message
      })
      .then(function(response2) {
        console.log(response2);
        if (response2.data.status === "OK") {
          console.log(["details", response2.data]);

          that.setState({
            alertType: "success",
            alertMessage: "Poprawnie wysłano nową wiadomość"
          });

          that.setShowUserDetails();
        } else if (response2.data.status === "ERR") {
          that.setState({
            alertType: "warning",
            alertMessage: response2.data.result
          });
        }
      })
      .catch(function(error) {
        console.log(error);

        that.setState({
          alertType: "danger",
          alertMessage: "Nie udało się wysłać wiadomości"
        });
      });
  };

  setShowUserDetails = (): void => {
    //check if users are in the same conversation - start messaging
    let API_URL = this.props.API_URL;
    let searchedUser = this.props.senderId;
    let loggedInUser = this.props.user.id;

    let that = this;

    axios
      .post(API_URL + "/api/checkIfUsersBelongsToConversation", {
        searchedUser: searchedUser,
        loggedInUser: loggedInUser
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log([
            "checkIfUsersBelongsToConversation",
            response.data,
            loggedInUser,
            searchedUser
          ]);

          that.setState({
            usersAreInTheSameConversation: response.data.result
          });
          /*that.setState({
            alertType: "success",
            alertMessage: "Poprawnie wysłano nową wiadomość"
          });*/
        }
      })
      .catch(function(error) {
        console.log(error);

        that.setState({
          alertType: "danger",
          alertMessage: "Nie udało się pobrać danych o uzytkowniku"
        });
      });

    this.setState({ showUserDetails: true, showUserMessageBox: false });
  };

  hideShowUserDetails = (): void => {
    this.setState({ showUserDetails: false, showUserMessageBox: false });
  };

  setShowUserMessageBox = (): void => {
    this.setState({ showUserMessageBox: true, showUserDetails: false });
  };

  hideShowUserMessageBox = (): void => {
    this.setState({ showUserMessageBox: false, showUserDetails: true });
  };

  componentDidMount = (): void => {
    console.log(this.props.user.id);
  };

  render() {
    const {
      showUserDetails,
      message,
      usersAreInTheSameConversation,
      alertMessage,
      showUserMessageBox,
      alertType
    } = this.state;
    {
      /* show user details */
    }
    if (showUserDetails) {
      return (
        <View style={styles.mainModalContainer}>
          <View style={styles.userDetailsModalContentContainer}>
            <View style={styles.relative}>
              <TouchableHighlight style={styles.buttonCloseModal}>
                <Button
                  title="X"
                  color="#000"
                  onPress={() => this.hideShowUserDetails()}
                />
              </TouchableHighlight>
              <View style={styles.userDetailsHeader}>
                <Image
                  style={styles.userDetailsImage}
                  source={{
                    uri: `${this.props.API_URL}userPhotos/${
                      this.props.user.photo_path
                    }`
                  }}
                />
                <Text style={styles.userDetailsHeaderText}>
                  {this.props.user.name}, {this.props.user.age}
                </Text>
              </View>
              <View style={styles.userDetailsContent}>
                {this.props.user.kids.length > 0 && (
                  <Text style={styles.userDetailsContentHeader}>Dzieci: </Text>
                )}
                {this.props.user.kids.length > 0 &&
                  this.props.user.kids.map(
                    (kid: { name: string; date_of_birth: string }) => {
                      return (
                        <Text key={uuid()}>
                          {kid.name} - {kid.date_of_birth}
                        </Text>
                      );
                    }
                  )}
              </View>
              <View style={styles.userDetailsContentHobbyContainer}>
                {this.props.user.hobbies.length > 0 && (
                  <Text style={styles.userDetailsContentHeader}>Hobby: </Text>
                )}
                {this.props.user.hobbies.length > 0 &&
                  this.props.user.hobbies.map((hobby: any) => {
                    return <Text key={uuid()}>{hobby.name} </Text>;
                  })}
              </View>
              {usersAreInTheSameConversation && (
                <Text>
                  Jesteś już w trakcie rozmowy z {this.props.user.name}
                </Text>
              )}
              <View style={styles.userDetailsRedirectMessageBtnContainer}>
                <TouchableHighlight
                  style={styles.userDetailsRedirectMessageBtn}
                >
                  {usersAreInTheSameConversation ? (
                    <Button
                      title="Przejdź do wiadomości"
                      color="#fff"
                      onPress={() => this.props.openMessages()}
                    />
                  ) : (
                    <Button
                      title="Pomachaj"
                      color="#fff"
                      onPress={() => this.setShowUserMessageBox()}
                    />
                  )}
                </TouchableHighlight>
              </View>
            </View>
          </View>
          {alertMessage != "" && (
            <Alert alertType={alertType} alertMessage={alertMessage} />
          )}
        </View>
      );
    } else if (showUserMessageBox) {
      {
        /* show user send message box */
      }
      return (
        <View style={styles.mainModalContainer}>
          <View style={styles.userDetailsModalContentContainer}>
            <View style={styles.relative}>
              <TouchableHighlight style={styles.buttonCloseModal}>
                <Button
                  title="X"
                  color="#000"
                  onPress={() => this.hideShowUserMessageBox()}
                />
              </TouchableHighlight>
              <View style={styles.userDetailsHeader}>
                <Text style={styles.userMessageHeader}>Rozpocznij rozmowę</Text>
              </View>

              <TextInput
                multiline={true}
                numberOfLines={10}
                onChangeText={message => this.setState({ message })}
                value={message}
                placeholder="Napisz wiadomość..."
                placeholderTextColor="#333"
                style={styles.userMessageTextArea}
              />
              <TouchableHighlight style={styles.userMessageBtn}>
                <Button
                  title="Wyślij"
                  color="#fff"
                  onPress={() => this.sendMessage()}
                />
              </TouchableHighlight>
            </View>
          </View>
          {alertMessage != "" && (
            <Alert alertType={alertType} alertMessage={alertMessage} />
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.userListSingleUserContainer}>
          <Image
            style={styles.userListSingleUserImage}
            source={{
              uri: `${this.props.API_URL}userPhotos/${
                this.props.user.photo_path
              }`
            }}
          />
          <Text style={styles.userListText}>
            {this.props.user.name}, {this.props.user.age}
          </Text>
          <TouchableHighlight style={styles.userListSingleUserBtn}>
            <Button
              title="Podgląd"
              color="#fff"
              onPress={() => this.setShowUserDetails()}
            />
          </TouchableHighlight>

          {alertMessage != "" && (
            <Alert alertType={alertType} alertMessage={alertMessage} />
          )}
        </View>
      );
    }
  }
}
