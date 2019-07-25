import React, { useContext } from "react";
import { Text } from "react-native";
import ListItem from "./../../../Utils/ListItem";
import { GlobalContext } from "./../../../Context/GlobalContext";

const UserList = (props: {
  userList: any;
  API_URL: string;
  setShowUserDetails: any;
  setUserDetailsId: any;
  loggedInUserId: number;
}): any => {
  const context = useContext(GlobalContext);
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
              userHadUnreadedMessages={false}
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
