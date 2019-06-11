import React from "react";
import {
  Button,
  Image,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from "react-native";
import styles from "./../style";
import Alert from "./../../../../Alert/Alert";
import ProfileHeader from "./../../SharedComponents/ProfileHeader";
import UserPreview from "./../../SharedComponents/UserPreview";
import { v4 as uuid } from "uuid";
import moment from "moment";
import "moment/locale/pl";

const leftArrow: any = require("./../../../../assets/images/leftArrow.png");

const UserDetails = (props: {
  hideShowUserDetails: any;
  API_URL: string;
  user: {
    id: number;
    photo_path: string;
    name: string;
    age: number;
    kids: any;
    hobbies: any;
    description: string;
  };
  usersFriendshipStatus: string;
  usersAreInTheSameConversation: boolean;
  openMessages: any;
  setShowUserMessageBox: any;
  inviteFriend: any;
  loggedInUserId: number;
  confirmFriend: any;
  alertMessage: string;
  alertType: string;
  setOpenProfile: any;
  locationDetails: any;
}): any => {
  return (
    <ScrollView style={styles.userDetails}>
      <ProfileHeader
        API_URL={props.API_URL}
        avatar={props.user.photo_path}
        name={props.user.name}
        cityDistrict={props.locationDetails.cityDistrict}
        city={props.locationDetails.city}
        age={props.user.age}
        countFriends={2}
        countKids={
          props.user.kids && props.user.kids.length > 0
            ? props.user.kids.length
            : 0
        }
      />

      <UserPreview
        hobbies={
          props.user.hobbies && props.user.hobbies.length > 0
            ? props.user.hobbies
            : null
        }
        kids={
          props.user.kids && props.user.kids.length > 0 ? props.user.kids : null
        }
        description={props.user.description}
      />

      {props.usersAreInTheSameConversation && (
        <Text style={styles.userDetailsContentHobbyContainer}>
          Jesteś już w trakcie rozmowy z {props.user.name}
        </Text>
      )}
      <View style={styles.userDetailsRedirectMessageBtnContainer}>
        <TouchableHighlight style={styles.userDetailsRedirectMessageBtn}>
          {props.usersAreInTheSameConversation ? (
            <Button
              title="Przejdź do wiadomości"
              color="#fff"
              onPress={() => props.openMessages()}
            />
          ) : (
            <Button
              title="Pomachaj"
              color="#fff"
              onPress={() => props.setShowUserMessageBox()}
            />
          )}
        </TouchableHighlight>
      </View>
      <View style={styles.userDetailsRedirectMessageBtnContainer}>
        <TouchableHighlight style={styles.userDetailsRedirectMessageBtn}>
          <View>
            {props.usersFriendshipStatus === "friendship doesnt exist" && (
              <Button
                title="Zaproś do znajomych"
                color="#fff"
                onPress={() =>
                  props.inviteFriend(props.loggedInUserId, props.user.id)
                }
              />
            )}

            {props.usersFriendshipStatus ===
              "not confirmed by first person" && (
              <Button
                title="Zaakceptuj zaproszenie do znajomych"
                color="#fff"
                onPress={() =>
                  props.confirmFriend(props.loggedInUserId, props.user.id)
                }
              />
            )}

            {props.usersFriendshipStatus ===
              "not confirmed by second person" && (
              <Button
                title="Wysłano zaproszenie do znajomych"
                color="#fff"
                onPress={() => {
                  console.log("Wysłano zaproszenie do znajomych");
                }}
              />
            )}
            {props.usersFriendshipStatus === "confirmed" && (
              <Button
                title="Jesteście znajomymi"
                color="#fff"
                onPress={() => {
                  props.setOpenProfile();
                }}
              />
            )}
          </View>
        </TouchableHighlight>
      </View>

      {props.alertMessage != "" && (
        <Alert alertType={props.alertType} alertMessage={props.alertMessage} />
      )}
    </ScrollView>
  );
};
export default UserDetails;
