import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import styles from "./style";
import Alert from "./../../../../Alert/Alert";

export default class UserOnList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserDetails: false,
      showUserMessageBox: false,
      message: "",
      alertMessage: "",
      alertType: ""
    };

    this.setShowUserDetails = this.setShowUserDetails.bind(this);
    this.hideShowUserDetails = this.hideShowUserDetails.bind(this);
    this.setShowUserMessageBox = this.setShowUserMessageBox.bind(this);
    this.hideShowUserMessageBox = this.hideShowUserMessageBox.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    console.log(["send", this.props.user.id]);

    let API_URL = this.props.API_URL;
    let sender_id = this.props.sender_id;
    let receiver_id = this.props.user.id;
    let message = this.state.message;

    //console.log([API_URL, sender_id, receiver_id, message]);

    let that = this;

    axios
      .post(API_URL + "/api/saveConversation", {
        sender_id: sender_id,
        receiver_id: receiver_id,
        message: message
      })
      .then(function(response2) {
        console.log(["details", response2.data]);

        that.setState({
          alertType: "success",
          alertMessage: "Poprawnie wysłano nową wiadomość"
        });
      })
      .catch(function(error) {
        console.log(error);

        that.setState({
          alertType: "danger",
          alertMessage: "Nie udało się wysłać wiadomości"
        });
      });
  }

  setShowUserDetails() {
    this.setState({ showUserDetails: true, showUserMessageBox: false });
  }

  hideShowUserDetails() {
    this.setState({ showUserDetails: false, showUserMessageBox: false });
  }

  setShowUserMessageBox() {
    this.setState({ showUserMessageBox: true, showUserDetails: false });
  }

  hideShowUserMessageBox() {
    this.setState({ showUserMessageBox: false, showUserDetails: true });
  }

  componentDidMount() {
    console.log(this.props.user.id);
  }

  render() {
    {
      /* show user details */
    }
    if (this.state.showUserDetails) {
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
                  this.props.user.kids.map(kid => {
                    return (
                      <Text>
                        {kid.name} - {kid.date_of_birth}
                      </Text>
                    );
                  })}
              </View>
              <View style={styles.userDetailsContentHobbyContainer}>
                {this.props.user.hobbies.length > 0 && (
                  <Text style={styles.userDetailsContentHeader}>Hobby: </Text>
                )}
                {this.props.user.hobbies.length > 0 &&
                  this.props.user.hobbies.map(hobby => {
                    return <Text>{hobby.name} </Text>;
                  })}
              </View>
              <View style={styles.userDetailsRedirectMessageBtnContainer}>
                <TouchableHighlight
                  style={styles.userDetailsRedirectMessageBtn}
                >
                  <Button
                    title="Pomachaj"
                    color="#fff"
                    onPress={() => this.setShowUserMessageBox()}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (this.state.showUserMessageBox) {
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
                value={this.state.message}
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
          {this.state.alertMessage != "" && (
            <Alert
              alertType={this.state.alertType}
              alertMessage={this.state.alertMessage}
            />
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
        </View>
      );
    }
  }
}
