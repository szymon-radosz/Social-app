import React, { useContext } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import { GlobalContext } from "./../../../../Context/GlobalContext";
import ListItem from "./../../../../Utils/ListItem";

const UserFriendsListRenderList = (props: any) => {
  const context = useContext(GlobalContext);

  return (
    <React.Fragment>
      {props.userFriendsList &&
        props.userFriendsList.map((friendsPair: any, i: number) => {
          if (friendsPair.users_invited_by_me.id === context.userData.id) {
            return (
              <ListItem
                API_URL={context.API_URL}
                key={`users_invited_me-${i}`}
                image={`${friendsPair.users_invited_me.photo_path}`}
                mainText={`${friendsPair.users_invited_me.name}, ${
                  friendsPair.users_invited_me.age
                }`}
                subText={`${
                  friendsPair.users_invited_me.location_string
                    ? friendsPair.users_invited_me.location_string
                    : ""
                }`}
                subSubText={`${
                  friendsPair.users_invited_me.kids &&
                  friendsPair.users_invited_me.kids.length > 0
                    ? friendsPair.users_invited_me.kids.length === 1
                      ? "1 dziecko"
                      : `${friendsPair.users_invited_me.kids.length} dzieci`
                    : ""
                }`}
                onPress={() => {
                  props.navigation.navigate("UserDetails", {
                    userId: friendsPair.users_invited_me.id
                  });
                }}
                userHadUnreadedMessages={false}
              />
            );
          } else if (
            friendsPair.users_invited_by_me.id !== context.userData.id
          ) {
            return (
              <ListItem
                API_URL={context.API_URL}
                key={`users_invited_by_me-${i}`}
                image={`${friendsPair.users_invited_by_me.photo_path}`}
                mainText={`${friendsPair.users_invited_by_me.name}, ${
                  friendsPair.users_invited_by_me.age
                }`}
                subText={`${
                  friendsPair.users_invited_by_me.location_string
                    ? friendsPair.users_invited_by_me.location_string
                    : ""
                }`}
                subSubText={`${
                  friendsPair.users_invited_by_me.kids &&
                  friendsPair.users_invited_by_me.kids.length > 0
                    ? friendsPair.users_invited_by_me.kids.length === 1
                      ? "1 dziecko"
                      : `${friendsPair.users_invited_by_me.kids.length} dzieci`
                    : ""
                }`}
                onPress={() => {
                  props.navigation.navigate("UserDetails", {
                    userId: friendsPair.users_invited_by_me.id
                  });
                }}
                userHadUnreadedMessages={false}
              />
            );
          }
        })}
    </React.Fragment>
  );
};

export default UserFriendsListRenderList;
