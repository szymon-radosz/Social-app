import React from "react";
import {
  Button,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from "react-native";
import styles from "./../style";
import Alert from "./../../../../Alert/Alert";
import ProfileHeader from "./../../SharedComponents/ProfileHeader";
import UserPreview from "./../../SharedComponents/UserPreview";
import PageHeader from "./../../SharedComponents/PageHeader";

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
    location_string: string;
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
    <View style={{ position: "relative" }}>
      <PageHeader
        boldText={props.user.name}
        normalText={""}
        closeMethod={props.hideShowUserDetails}
        closeMethodParameter={""}
      />
      <ScrollView>
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
          locationString={props.user.location_string}
        />

        <UserPreview
          hobbies={
            props.user.hobbies && props.user.hobbies.length > 0
              ? props.user.hobbies
              : null
          }
          kids={
            props.user.kids && props.user.kids.length > 0
              ? props.user.kids
              : null
          }
          description={props.user.description}
        />

        {props.usersAreInTheSameConversation && (
          <Text style={styles.userDetailsContentHobbyContainer}>
            Jesteś już w trakcie rozmowy z {props.user.name}
          </Text>
        )}
        <View style={styles.userDetailsRedirectMessageBtnContainer}>
          {props.usersAreInTheSameConversation ? (
            <TouchableHighlight
              style={styles.userDetailsRedirectMessageBtn}
              onPress={props.openMessages}
            >
              <Text style={styles.peachBtnText}>Przejdź do wiadomości</Text>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              style={styles.userDetailsRedirectMessageBtn}
              onPress={props.setShowUserMessageBox}
            >
              <Text style={styles.peachBtnText}>Pomachaj</Text>
            </TouchableHighlight>
          )}
        </View>
        <View style={styles.userDetailsRedirectMessageBtnContainer}>
          <View style={{ marginBottom: 20, width: "100%" }}>
            {props.usersFriendshipStatus === "friendship doesnt exist" && (
              <TouchableHighlight
                style={styles.userDetailsRedirectMessageBtn}
                onPress={() =>
                  props.inviteFriend(props.loggedInUserId, props.user.id)
                }
              >
                <Text style={styles.peachBtnText}>Zaproś do znajomych</Text>
              </TouchableHighlight>
            )}

            {props.usersFriendshipStatus ===
              "not confirmed by first person" && (
              <TouchableHighlight
                style={styles.userDetailsRedirectMessageBtn}
                onPress={() =>
                  props.confirmFriend(props.loggedInUserId, props.user.id)
                }
              >
                <Text style={styles.peachBtnText}>
                  Zaakceptuj zaproszenie do znajomych
                </Text>
              </TouchableHighlight>
            )}

            {props.usersFriendshipStatus ===
              "not confirmed by second person" && (
              <TouchableHighlight
                style={styles.userDetailsRedirectMessageBtn}
                onPress={() => {
                  console.log("Wysłano zaproszenie do znajomych");
                }}
              >
                <Text style={styles.peachBtnText}>
                  Wysłano zaproszenie do znajomych
                </Text>
              </TouchableHighlight>
            )}
            {props.usersFriendshipStatus === "confirmed" && (
              <TouchableHighlight
                style={styles.userDetailsRedirectMessageBtn}
                onPress={props.setOpenProfile}
              >
                <Text style={styles.peachBtnText}>Jesteście znajomymi</Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default UserDetails;
