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
import moment from "moment";
import "moment/locale/pl";

const leftArrow: any = require("./../../../assets/images/leftArrow.png");

interface UserDetailsState {}

interface UserDetailsProps {
  loggedInUserId: number;
  hideShowUserDetails: any;
  API_URL: string;
  user: any;
  usersAreInTheSameConversation: boolean;
  usersFriendshipStatus: string;
  openMessages: any;
  setShowUserMessageBox: any;
  alertMessage: string;
  alertType: string;
  inviteFriend: any;
  confirmFriend: any;
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
        <TouchableHighlight
          style={styles.buttonCloseModal}
          onPress={() => this.props.hideShowUserDetails()}
        >
          <Image
            style={{ width: 30, resizeMode: "contain" }}
            source={leftArrow}
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
              (kid: {
                name: string;
                date_of_birth: string;
                child_gender: string;
              }) => {
                if (kid.child_gender === "male") {
                  return (
                    <Text key={uuid()}>
                      {kid.name} - chłopiec - ur.{" "}
                      {moment(kid.date_of_birth).format("LL")}
                    </Text>
                  );
                } else {
                  return (
                    <Text key={uuid()}>
                      {kid.name} - dziewczynka - ur.{" "}
                      {moment(kid.date_of_birth).format("LL")}
                    </Text>
                  );
                }
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
        <View style={styles.userDetailsRedirectMessageBtnContainer}>
          <TouchableHighlight style={styles.userDetailsRedirectMessageBtn}>
            <View>
              {this.props.usersFriendshipStatus ===
                "friendship doesnt exist" && (
                <Button
                  title="Zaproś do znajomych"
                  color="#fff"
                  onPress={() =>
                    this.props.inviteFriend(
                      this.props.loggedInUserId,
                      this.props.user.id
                    )
                  }
                />
              )}

              {this.props.usersFriendshipStatus ===
                "not confirmed by first person" && (
                <Button
                  title="Zaakceptuj zaproszenie do znajomych"
                  color="#fff"
                  onPress={() =>
                    this.props.confirmFriend(
                      this.props.loggedInUserId,
                      this.props.user.id
                    )
                  }
                />
              )}

              {this.props.usersFriendshipStatus ===
                "not confirmed by second person" && (
                <Button
                  title="Wysłano zaproszenie do znajomych"
                  color="#fff"
                  onPress={() => {
                    console.log("Wysłano zaproszenie do znajomych");
                  }}
                />
              )}
              {this.props.usersFriendshipStatus === "confirmed" && (
                <Button
                  title="Jesteście znajomymi"
                  color="#fff"
                  onPress={() => {
                    console.log("Jesteście znajomymi");
                  }}
                />
              )}
            </View>
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
