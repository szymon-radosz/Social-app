import React from "react";
import { Platform, Text, View, Image } from "react-native";
import styles from "./../style";

const ProfileHeader = (props: any) => (
  <View style={styles.profileHeaderContainer}>
    <Image
      style={styles.profileHeaderImage}
      source={{
        uri: `${props.API_URL}userPhotos/${props.avatar}`
      }}
    />
    <Text style={styles.profileHeaderName}>{props.name}</Text>
    <Text style={styles.profileHeaderLocation}>
      {props.cityDistrict}, {props.city}
    </Text>
    <View style={styles.profileHeaderInfoContainer}>
      <View>
        <Text style={styles.profileHeaderSingleInfoContainerMainText}>
          {props.age}
        </Text>
        <Text style={styles.profileHeaderSingleInfoContainerSubText}>lat</Text>
      </View>
      <View>
        <Text style={styles.profileHeaderSingleInfoContainerMainText}>
          {props.countFriends}
        </Text>
        <Text style={styles.profileHeaderSingleInfoContainerSubText}>
          Znajomych
        </Text>
      </View>
      <View>
        <Text style={styles.profileHeaderSingleInfoContainerMainText}>
          {props.countKids}
        </Text>
        <Text style={styles.profileHeaderSingleInfoContainerSubText}>
          Dzieci
        </Text>
      </View>
    </View>
  </View>
);

export default ProfileHeader;
