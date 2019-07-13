import React from "react";
import { Text } from "react-native";
import { v4 as uuid } from "uuid";
import ListItem from "./../../../Utils/ListItem";

const UserList = (props: {
  userList: any;
  API_URL: string;
  setShowUserDetails: any;
  setUserDetailsId: any;
  loggedInUserId: number;
}): any => {
  if (props.userList) {
    return props.userList && props.userList.length > 0 ? (
      props.userList.map((user: any, i: number) => {
        if (user.id != props.loggedInUserId) {
          return (
            <ListItem
              API_URL={props.API_URL}
              key={uuid()}
              image={`${props.API_URL}userPhotos/${user.photo_path}`}
              mainText={`${user.name}, ${user.age}`}
              subText={`${user.location_string ? user.location_string : ""}`}
              subSubText={`${
                user.kids.length > 0
                  ? user.kids.length === 1
                    ? "1 dziecko"
                    : `${user.kids.length} dzieci`
                  : ""
              }`}
              onPress={() => {
                props.setShowUserDetails(user.id);
                props.setUserDetailsId(user.id);
              }}
            />
          );
        }
      })
    ) : (
      <Text style={{ paddingLeft: 10 }}>Brak wyników</Text>
    );
  }
};

export default React.memo(UserList);
