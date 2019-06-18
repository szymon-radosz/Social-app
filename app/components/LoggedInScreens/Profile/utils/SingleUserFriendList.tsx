import React from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./../style";

const SingleUserFriendList = (props: any) => (
  <TouchableHighlight
    onPress={() => {
      props.setOpenFindUsers(props.user.id);
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
            <View>
              <Text style={styles.userTextLocation}>
                {props.user.location_string ? props.user.location_string : ""}
              </Text>
            </View>
            <View>
              {
                <Text style={styles.userTextLocation}>
                  {props.user.kids && props.user.kids.length > 0
                    ? props.user.kids.length === 1
                      ? "1 dziecko"
                      : `${props.user.kids.length} dzieci`
                    : null}
                </Text>
              }
            </View>
          </View>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

export default SingleUserFriendList;
