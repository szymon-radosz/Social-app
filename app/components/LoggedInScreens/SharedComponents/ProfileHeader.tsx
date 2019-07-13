import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./style";
const logout: any = require("./../../../assets/images/logout.png");
import { GlobalContext } from "./../../Context/GlobalContext";

const ProfileHeader = (props: any) => {
  const context = useContext(GlobalContext);
  console.log(`${context.photoServerPath}/${props.avatar}`);
  return (
    <View style={styles.profileHeaderContainer}>
      {props.showLogout ? (
        <TouchableOpacity
          style={styles.logoutContainer}
          onPress={(): void => {
            props.clearUserData();
            props.navigation.navigate("Welcome");
          }}
        >
          <Image source={logout} style={styles.logoutImage} />
          <Text style={styles.logoutText}>Wyloguj się</Text>
        </TouchableOpacity>
      ) : null}
      <Image
        style={styles.profileHeaderImage}
        source={{
          uri: `${context.photoServerPath}/${props.avatar}`
        }}
      />
      <Text style={styles.profileHeaderName}>{props.name}</Text>
      <Text style={styles.profileHeaderLocation}>{props.locationString}</Text>
      <View style={styles.profileHeaderInfoContainer}>
        <View style={{ width: "33.3%" }}>
          <Text style={styles.profileHeaderSingleInfoContainerMainText}>
            {props.age}
          </Text>
          <Text style={styles.profileHeaderSingleInfoContainerSubText}>
            lat
          </Text>
        </View>
        <View style={{ width: "33.3%" }}>
          <Text style={styles.profileHeaderSingleInfoContainerMainText}>
            {props.countFriends}
          </Text>
          <Text style={styles.profileHeaderSingleInfoContainerSubText}>
            Znajomych
          </Text>
        </View>
        <View style={{ width: "33.3%" }}>
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
};

export default ProfileHeader;
