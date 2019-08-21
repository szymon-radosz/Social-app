import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./style";

const logout: any = require("./../../assets/images/logout.png");
const bellWhite: any = require("./../../assets/images/bellWhite.png");

const ProfileHeader = (props: any) => {
  return (
    <React.Fragment>
      <View style={styles.topBtnContainer}>
        {props.showLogout ? (
          <TouchableOpacity
            style={styles.logoutContainer}
            onPress={() =>
              props.navigation.navigate("UserNotificationList", {})
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={bellWhite}
                style={styles.logoutImage}
                resizeMode="contain"
              />
              <Text style={styles.logoutText}>Powiadomienia</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {props.showLogout ? (
          <TouchableOpacity
            style={styles.logoutContainer}
            onPress={() => {
              props.navigation.navigate("Welcome");
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={logout}
                style={styles.logoutImage}
                resizeMode="contain"
              />
              <Text style={styles.logoutText}>Wyloguj się</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.profileHeaderContainer}>
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
    </React.Fragment>
  );
};

export default ProfileHeader;
