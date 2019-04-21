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
import styles from "./../style";
import Alert from "./../../../Alert/Alert";
import { v4 as uuid } from "uuid";

interface UserDetailsState {}

interface UserDetailsProps {
  hideShowUserDetails: any;
  API_URL: string;
  user: any;
  usersAreInTheSameConversation: boolean;
  openMessages: any;
  setShowUserMessageBox: any;
  alertMessage: string;
  alertType: string;
}

export default class UserDetails extends Component<
  UserDetailsProps,
  UserDetailsState
> {
  constructor(props: UserDetailsProps) {
    super(props);
    this.state = {};
  }

  componentDidMount = (): void => {
    console.log(this.props);
  };

  render() {
    return (
      <View style={styles.userDetails}>
        <TouchableHighlight style={styles.buttonCloseModal}>
          <Button
            title="<"
            color="#fff"
            onPress={() => this.props.hideShowUserDetails()}
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
          {this.props.user.kids && this.props.user.kids.length > 0 && (
            <Text style={styles.userDetailsContentHeader}>Dzieci: </Text>
          )}
          {this.props.user.kids &&
            this.props.user.kids.length > 0 &&
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
          {this.props.user.hobbies && this.props.user.hobbies.length > 0 && (
            <Text style={styles.userDetailsContentHeader}>Hobby: </Text>
          )}
          {this.props.user.hobbies &&
            this.props.user.hobbies.length > 0 &&
            this.props.user.hobbies.map((hobby: any) => {
              return <Text key={uuid()}>{hobby.name} </Text>;
            })}
        </View>
        {this.props.usersAreInTheSameConversation && (
          <Text style={styles.userDetailsContentHobbyContainer}>
            Jesteś już w trakcie rozmowy z {this.props.user.name}
          </Text>
        )}
        <View style={styles.userDetailsRedirectMessageBtnContainer}>
          <TouchableHighlight style={styles.userDetailsRedirectMessageBtn}>
            {this.props.usersAreInTheSameConversation ? (
              <Button
                title="Przejdź do wiadomości"
                color="#fff"
                onPress={() => this.props.openMessages()}
              />
            ) : (
              <Button
                title="Pomachaj"
                color="#fff"
                onPress={() => this.props.setShowUserMessageBox()}
              />
            )}
          </TouchableHighlight>
        </View>

        {this.props.alertMessage != "" && (
          <Alert
            alertType={this.props.alertType}
            alertMessage={this.props.alertMessage}
          />
        )}
      </View>
    );
  }
}
