import React from "react";
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from "react-native";
import styles from "./../style";

const UserOnList = (props: {
  API_URL: string;
  setShowUserDetails: any;
  setUserDetailsId: any;
  user: {
    id: number;
    photo_path: string;
    name: string;
    age: number;
    location_string: string;
    kids: any;
  };
}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        props.setShowUserDetails(props.user.id);
        props.setUserDetailsId(props.user.id);
      }}
    >
      <ScrollView style={styles.userListContainer}>
        <View style={styles.userListSingleUserContainer}>
          <Image
            style={styles.userListSingleUserImage}
            source={{
              uri: `${props.API_URL}userPhotos/${props.user.photo_path}`
            }}
          />
          <Image
            source={{
              uri: `${props.API_URL}userPhotos/${props.user.photo_path}`
            }}
          />
          <View style={styles.userListTextContainer}>
            <View>
              <Text style={styles.userListText}>
                {props.user.name}, {props.user.age}
              </Text>
              <View>
                <Text style={styles.userTextLocation}>
                  {props.user.location_string ? props.user.location_string : ""}
                </Text>
              </View>
              <View>
                <Text style={styles.userTextLocation}>
                  {props.user.kids.length > 0
                    ? props.user.kids.length === 1
                      ? "1 dziecko"
                      : `${props.user.kids.length} dzieci`
                    : null}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableHighlight>
  );
};
export default UserOnList;
