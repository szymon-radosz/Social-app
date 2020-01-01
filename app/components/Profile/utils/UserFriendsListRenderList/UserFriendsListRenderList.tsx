import React, { useContext } from "react";
import { GlobalContext } from "./../../../../Context/GlobalContext";
import ListItem from "./../../../Utils/ListItem";

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
                mainText={`${friendsPair.users_invited_me.name}, ${friendsPair.users_invited_me.age}`}
                subText={`${
                  friendsPair.users_invited_me.location_string
                    ? friendsPair.users_invited_me.location_string
                    : ""
                }`}
                onPress={() => {
                  props.navigation.push("UserDetails", {
                    userId: friendsPair.users_invited_me.id,
                    showBtns: true
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
                mainText={`${friendsPair.users_invited_by_me.name}, ${friendsPair.users_invited_by_me.age}`}
                subText={`${
                  friendsPair.users_invited_by_me.location_string
                    ? friendsPair.users_invited_by_me.location_string
                    : ""
                }`}
                onPress={() => {
                  props.navigation.push("UserDetails", {
                    userId: friendsPair.users_invited_by_me.id,
                    showBtns: true
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
