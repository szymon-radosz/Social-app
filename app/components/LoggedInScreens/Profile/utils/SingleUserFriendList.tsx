import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./../style";

const SingleUserFriendList = (props: any) => (
  <TouchableHighlight
    onPress={() => {
      console.log(`${props.API_URL}userPhotos/${props.user.photo_path}`);
    }}
  >
    <View style={styles.userListContainer}>
      <View style={styles.userListSingleUserContainer}>
        <Image
          style={styles.userListSingleUserImage}
          source={{
            uri: `${props.API_URL}userPhotos/${props.user.photo_path}`
          }}
        />
        <View style={styles.userListTextContainer}>
          <View>
            <Text style={styles.userListText}>
              {props.user.name}, {props.user.age}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

export default SingleUserFriendList;
