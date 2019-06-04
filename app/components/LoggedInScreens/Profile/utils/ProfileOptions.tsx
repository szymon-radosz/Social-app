import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";

const ProfileOptions = (props: any) => (
  <View>
    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.setShowProfilePreview()}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          lineHeight: 40,
          color: "#fff"
        }}
      >
        Jak widzą mnie inni?
      </Text>
    </TouchableHighlight>

    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => console.log("test")}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          lineHeight: 40,
          color: "#fff"
        }}
      >
        Edytuj dane
      </Text>
    </TouchableHighlight>

    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.loadUserFriendsList()}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          lineHeight: 40,
          color: "#fff"
        }}
      >
        Moje znajome
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.getUserAuctionList()}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          lineHeight: 40,
          color: "#fff"
        }}
      >
        Historia aukcji
      </Text>
    </TouchableHighlight>
  </View>
);

export default ProfileOptions;
