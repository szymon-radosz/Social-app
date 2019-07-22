import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./style";
const logout: any = require("./../../../assets/images/logout.png");
import { GlobalContext } from "./../../Context/GlobalContext";

const ProfileHeader = (props: any) => {
  console.log(props);

  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    setProfileInfo(props);
    console.log(["ProfileHeader", profileInfo]);
  }, [props]);

  const context = useContext(GlobalContext);

  return (
    <View style={styles.profileHeaderContainer}>
      {props.showLogout ? (
        <TouchableOpacity
          style={styles.logoutContainer}
          onPress={() => {
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
          uri: `${props.avatar}`
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
            znajomych
          </Text>
        </View>
        <View style={{ width: "33.3%" }}>
          <Text style={styles.profileHeaderSingleInfoContainerMainText}>
            {props.countKids}
          </Text>
          <Text style={styles.profileHeaderSingleInfoContainerSubText}>
            dzieci
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
