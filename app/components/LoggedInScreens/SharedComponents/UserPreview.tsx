import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./style";
const bike: any = require("./../../../assets/images/bike.png");
const maternity: any = require("./../../../assets/images/maternity.png");
const dotEmpty: any = require("./../../../assets/images/dotEmpty.png");

const UserPreview = (props: any) => (
  <View>
    {props.description && (
      <Text style={styles.userPreviewDescription}>{props.description}</Text>
    )}
    <View style={styles.userPreviewSectionContainer}>
      <View style={styles.userPreviewSectionHeaderContainer}>
        <Image style={styles.userPreviewSectionHeaderImage} source={bike} />
        <Text style={styles.userPreviewSectionHeaderText}>Hobby</Text>
      </View>
      {props.hobbies &&
        props.hobbies.map((hobby: any, i: number) => {
          return (
            <View style={styles.userPreviewListItemContainer}>
              <Image
                style={styles.userPreviewListItemImage}
                source={dotEmpty}
              />
              <Text style={styles.userPreviewSectionListText}>
                {hobby.name}
              </Text>
            </View>
          );
        })}
    </View>

    <View style={styles.userPreviewSectionContainer}>
      <View style={styles.userPreviewSectionHeaderContainer}>
        <Image
          style={styles.userPreviewSectionHeaderImage}
          source={maternity}
        />
        <Text style={styles.userPreviewSectionHeaderText}>Dzieci</Text>
      </View>
      {props.kids &&
        props.kids.map((kid: any, i: number) => {
          if (kid.child_gender === "male") {
            return (
              <View style={styles.userPreviewListItemContainer}>
                <Image
                  style={styles.userPreviewListItemImage}
                  source={dotEmpty}
                />
                <Text style={styles.userPreviewSectionListText}>
                  {kid.name} - chłopiec - {kid.date_of_birth}
                </Text>
              </View>
            );
          } else if (kid.child_gender === "female") {
            return (
              <View style={styles.userPreviewListItemContainer}>
                <Image
                  style={styles.userPreviewListItemImage}
                  source={dotEmpty}
                />
                <Text style={styles.userPreviewSectionListText}>
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
