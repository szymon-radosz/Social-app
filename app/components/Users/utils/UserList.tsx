import React from "react";
import { Text } from "react-native";
import ListItem from "./../../Utils/ListItem";
import lang from "./../../../assets/lang/Users/utils/UserList";

const UserList = (props: {
  userList: any;
  API_URL: string;
  navigation: any;
  loggedInUserId: number;
}): any => {
  if (props.userList) {
    return props.userList && props.userList.length > 0 ? (
      props.userList.map((user: any, i: number) => {
        if (user.id != props.loggedInUserId) {
          return (
            <ListItem
              API_URL={props.API_URL}
              key={`UserList-${i}`}
              image={`${user.photo_path}`}
              mainText={`${user.name}, ${user.age}`}
              subText={`${user.location_string ? user.location_string : ""}`}
              subSubText=""
              onPress={() => {
                props.navigation.push("UserDetails", {
                  userId: user.id,
                  showBtns: true
                });
              }}
              userHadUnreadedMessages={false}
            />
          );
        }
      })
    ) : (
      <Text style={{ paddingLeft: 10 }}>{lang.noResults["en"]}</Text>
    );
  }
};

export default React.memo(UserList);
