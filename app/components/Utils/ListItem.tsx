import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import styles from "./style";

const ListItem = (props: {
  onPress: () => void;
  API_URL: string;
  image: string;
  mainText: string;
  subText: string;
  subSubText: string;
  key: string;
  userHadUnreadedMessages: boolean;
}) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor={"#fff"}>
      <View style={styles.listItemContainer}>
        <View
          style={
            props.userHadUnreadedMessages
              ? styles.listItemSingleContainerActive
              : styles.listItemSingleContainer
          }
        >
          <Image
            style={styles.listItemImage}
            source={{
              uri: `${props.image}`
            }}
          />
          <View style={styles.listItemTextContainer}>
            <View>
              <Text style={styles.listItemMainText}>{props.mainText}</Text>
              <View>
                <Text style={styles.listItemSubText}>{props.subText}</Text>
              </View>
              <View>
                <Text style={styles.listItemSubText}>{props.subSubText}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default ListItem;
