import React from "react";
import { Text, View, Image } from "react-native";
import bike from "./../../../assets/images/bike.png";
import maternity from "./../../../assets/images/maternity.png";
import dotEmpty from "./../../../assets/images/dotEmpty.png";
import {
  userPreviewSectionContainer,
  userPreviewSectionHeaderContainer,
  userPreviewSectionHeaderImage,
  userPreviewSectionHeaderText,
  userPreviewListItemContainer,
  userPreviewListItemImage,
  userPreviewSectionListText,
  userPreviewDescription
} from "./../../../assets/global/globalStyles";

const UserPreview = (props: any) => (
  <View>
    {props.description && (
      <Text style={userPreviewDescription}>{props.description}</Text>
    )}
    <View style={userPreviewSectionContainer}>
      <View style={userPreviewSectionHeaderContainer}>
        <Image style={userPreviewSectionHeaderImage} source={bike} />
        <Text style={userPreviewSectionHeaderText}>Hobby</Text>
      </View>
      {props.hobbies &&
        props.hobbies.map((hobby: any, i: number) => {
          return (
            <View style={userPreviewListItemContainer}>
              <Image style={userPreviewListItemImage} source={dotEmpty} />
              <Text style={userPreviewSectionListText}>{hobby.name}</Text>
            </View>
          );
        })}
    </View>

    <View style={userPreviewSectionContainer}>
      <View style={userPreviewSectionHeaderContainer}>
        <Image style={userPreviewSectionHeaderImage} source={maternity} />
        <Text style={userPreviewSectionHeaderText}>Dzieci</Text>
      </View>
      {props.kids &&
        props.kids.map((kid: any, i: number) => {
          if (kid.child_gender === "male") {
            return (
              <View style={userPreviewListItemContainer}>
                <Image style={userPreviewListItemImage} source={dotEmpty} />
                <Text style={userPreviewSectionListText}>
                  {kid.name} - chłopiec - {kid.date_of_birth}
                </Text>
              </View>
            );
          } else if (kid.child_gender === "female") {
            return (
              <View style={userPreviewListItemContainer}>
                <Image style={userPreviewListItemImage} source={dotEmpty} />
                <Text style={userPreviewSectionListText}>
                  {kid.name} - dziewczynka - {kid.date_of_birth}
                </Text>
              </View>
            );
          }
        })}
    </View>
  </View>
);

export default UserPreview;
