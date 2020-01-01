import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./style";
import lang from "./../../assets/lang/SharedComponents/UserPreview";

const bike: any = require("./../../assets/images/bike.png");
const dotEmpty: any = require("./../../assets/images/dotEmpty.png");

const UserPreview = (props: any) => (
  <View>
    {props.description && (
      <Text style={styles.userPreviewSectionDescContainer}>
        {props.description}
      </Text>
    )}
    {props.hobbies && props.hobbies.length > 0 && (
      <View style={styles.userPreviewSectionHobbyContainer}>
        <View style={styles.userPreviewSectionHeaderContainer}>
          <Image style={styles.userPreviewSectionHeaderImage} source={bike} />
          <Text style={styles.userPreviewSectionHeaderText}>
            {lang.hobby["en"]}
          </Text>
        </View>
        {props.hobbies &&
          props.hobbies.map((hobby: any, i: number) => {
            return (
              <View
                style={styles.userPreviewListItemContainer}
                key={`hobbies-${i}`}
              >
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
    )}
  </View>
);

export default UserPreview;
