import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import ListItem from "./../../../Utils/ListItem";
import { GlobalContext } from "./../../../Context/GlobalContext";

const UserFriendsList = (props: any): any => {
  const context = useContext(GlobalContext);
  props.userFriendsList.map((friendsPair: any, i: number) => {
    if (friendsPair.users_invited_by_me.id === props.loggedInUser) {
      return (
        <ListItem
          API_URL={props.API_URL}
          key={uuid()}
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
            props.setOpenFindUsers(friendsPair.users_invited_me.id);
          }}
        />
      );
    } else if (friendsPair.users_invited_by_me.id !== props.loggedInUser) {
      return (
        <ListItem
          API_URL={props.API_URL}
          key={uuid()}
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
            props.setOpenFindUsers(friendsPair.users_invited_by_me.id);
          }}
        />
      );
    }
  });
};
export default UserFriendsList;
