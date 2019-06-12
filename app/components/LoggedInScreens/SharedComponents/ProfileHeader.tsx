import React from "react";
import { Text, View, Image } from "react-native";
import {
  profileHeaderContainer,
  profileHeaderImage,
  profileHeaderName,
  profileHeaderLocation,
  profileHeaderInfoContainer,
  profileHeaderSingleInfoContainerMainText,
  profileHeaderSingleInfoContainerSubText
} from "./../../../assets/global/globalStyles";

const ProfileHeader = (props: any) => (
  <View style={profileHeaderContainer}>
    <Image
      style={profileHeaderImage}
      source={{
        uri: `${props.API_URL}userPhotos/${props.avatar}`
      }}
    />
    <Text style={profileHeaderName}>{props.name}</Text>
    <Text style={profileHeaderLocation}>{props.locationString}</Text>
    <View style={profileHeaderInfoContainer}>
      <View>
        <Text style={profileHeaderSingleInfoContainerMainText}>
          {props.age}
        </Text>
        <Text style={profileHeaderSingleInfoContainerSubText}>lat</Text>
      </View>
      <View>
        <Text style={profileHeaderSingleInfoContainerMainText}>
          {props.countFriends}
        </Text>
        <Text style={profileHeaderSingleInfoContainerSubText}>Znajomych</Text>
      </View>
      <View>
        <Text style={profileHeaderSingleInfoContainerMainText}>
          {props.countKids}
        </Text>
        <Text style={profileHeaderSingleInfoContainerSubText}>Dzieci</Text>
      </View>
    </View>
  </View>
);

export default ProfileHeader;
