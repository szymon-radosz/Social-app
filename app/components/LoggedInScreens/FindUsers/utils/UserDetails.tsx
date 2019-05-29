import React from "react";
import { Button, Image, Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";
import Alert from "./../../../../Alert/Alert";
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
}): any => {
  return (
    <View style={styles.userDetails}>
      <TouchableHighlight
        style={styles.buttonCloseModal}
        onPress={() => props.hideShowUserDetails()}
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
            uri: `${props.API_URL}userPhotos/${props.user.photo_path}`
          }}
        />
        <Text style={styles.userDetailsHeaderText}>
          {props.user.name}, {props.user.age}
        </Text>
      </View>
      <View style={styles.userDetailsContent}>
        {props.user.kids && props.user.kids.length > 0 && (
          <Text style={styles.userDetailsContentHeader}>Dzieci: </Text>
        )}
        {props.user.kids &&
          props.user.kids.length > 0 &&
          props.user.kids.map(
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
        {props.user.hobbies && props.user.hobbies.length > 0 && (
          <Text style={styles.userDetailsContentHeader}>Hobby: </Text>
        )}
        {props.user.hobbies &&
          props.user.hobbies.length > 0 &&
          props.user.hobbies.map((hobby: any) => {
            return <Text key={uuid()}>{hobby.name} </Text>;
          })}
      </View>
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
                  console.log("Jesteście znajomymi");
                }}
              />
            )}
          </View>
        </TouchableHighlight>
      </View>

      {props.alertMessage != "" && (
        <Alert alertType={props.alertType} alertMessage={props.alertMessage} />
      )}
    </View>
  );
};
export default UserDetails;
