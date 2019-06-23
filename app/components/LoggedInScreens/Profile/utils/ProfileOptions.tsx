import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";

const ProfileOptions = (props: any) => (
  <View>
    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.setShowProfilePreview()}
    >
      <Text style={styles.optionText}>Jak widzą mnie inni?</Text>
    </TouchableHighlight>

    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => {
        {
          props.navigation &&
            props.navigation.navigate("NotLoggedInMain", {
              user: props.user,
              editProfileData: true
            });
        }
      }}
    >
      <Text style={styles.optionText}>Edytuj dane</Text>
    </TouchableHighlight>

    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.loadUserFriendsList()}
    >
      <Text style={styles.optionText}>Moje znajome</Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.getUserAuctionList()}
    >
      <Text style={styles.optionText}>Wystawione przedmioty</Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.getUserNotificationList()}
    >
      <Text style={styles.optionText}>Powiadomienia</Text>
    </TouchableHighlight>
  </View>
);

export default ProfileOptions;
