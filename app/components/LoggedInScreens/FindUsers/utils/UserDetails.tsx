import React from "react";
import { Text, View, ScrollView } from "react-native";
import styles from "./../style";
import ProfileHeader from "./../../SharedComponents/ProfileHeader";
import UserPreview from "./../../SharedComponents/UserPreview";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../../Utils/ButtonComponent";

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
            <ButtonComponent
              pressButtonComponent={props.openMessages}
              buttonComponentText="Przejdź do wiadomości"
              fullWidth={true}
              underlayColor="#dd904d"
            />
          ) : (
            <ButtonComponent
              pressButtonComponent={props.setShowUserMessageBox}
              buttonComponentText="Pomachaj"
              fullWidth={true}
              underlayColor="#dd904d"
            />
          )}
        </View>
        <View style={styles.userDetailsRedirectMessageBtnContainer}>
          <View style={{ marginBottom: 20, width: "100%" }}>
            {props.usersFriendshipStatus === "friendship doesnt exist" && (
              <ButtonComponent
                pressButtonComponent={() =>
                  props.inviteFriend(props.loggedInUserId, props.user.id)
                }
                buttonComponentText="Zaproś do znajomych"
                fullWidth={true}
                underlayColor="#dd904d"
              />
            )}

            {props.usersFriendshipStatus ===
              "not confirmed by first person" && (
              <ButtonComponent
                pressButtonComponent={() =>
                  props.confirmFriend(props.loggedInUserId, props.user.id)
                }
                buttonComponentText="Zaakceptuj zaproszenie do znajomych"
                fullWidth={true}
                underlayColor="#dd904d"
              />
            )}

            {props.usersFriendshipStatus ===
              "not confirmed by second person" && (
              <ButtonComponent
                pressButtonComponent={() => {
                  console.log("Wysłano zaproszenie do znajomych");
                }}
                buttonComponentText="Wysłano zaproszenie do znajomych"
                fullWidth={true}
                underlayColor="#dd904d"
              />
            )}
            {props.usersFriendshipStatus === "confirmed" && (
              <ButtonComponent
                pressButtonComponent={props.setOpenProfile}
                buttonComponentText="Jesteście znajomymi"
                fullWidth={true}
                underlayColor="#dd904d"
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default UserDetails;
