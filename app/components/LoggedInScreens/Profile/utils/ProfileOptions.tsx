import React from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./../style";

const woman: any = require("./../../../../assets/images/woman.png");
const edit: any = require("./../../../../assets/images/edit.png");
const highFive: any = require("./../../../../assets/images/highFive.png");
const strollerOrange: any = require("./../../../../assets/images/strollerOrange.png");
const bell: any = require("./../../../../assets/images/bell.png");

const ProfileOptions = (props: any) => (
  <View
    style={{
      flexWrap: "wrap",
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10
    }}
  >
    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.setShowProfilePreview()}
    >
      <View>
        <Image
          style={{
            width: 45,
            height: 45,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 15
          }}
          source={woman}
        />
        <Text style={styles.optionText}>Podgląd</Text>
      </View>
    </TouchableHighlight>

    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => {
        {
          props.navigation &&
            props.navigation.navigate("NotLoggedInMain", {
              user: props.user,
              editProfileData: true
            });
        }
      }}
    >
      <View>
        <Image
          style={{
            width: 45,
            height: 45,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 15
          }}
          source={edit}
        />
        <Text style={styles.optionText}>Edycja danych</Text>
      </View>
    </TouchableHighlight>

    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.loadUserFriendsList()}
    >
      <View>
        <Image
          style={{
            width: 45,
            height: 45,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 15
          }}
          source={highFive}
        />
        <Text style={styles.optionText}>Moje znajome</Text>
      </View>
    </TouchableHighlight>

    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.getUserAuctionList()}
    >
      <View>
        <Image
          style={{
            width: 45,
            height: 45,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 15
          }}
          source={strollerOrange}
        />
        <Text style={styles.optionText}>Wystawione przedmioty</Text>
      </View>
    </TouchableHighlight>

    <TouchableHighlight
      style={styles.buttonOption}
      onPress={() => props.getUserNotificationList()}
    >
      <View>
        <Image
          style={{
            width: 45,
            height: 45,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 15
          }}
          source={bell}
        />
        <Text style={styles.optionText}>Powiadomienia</Text>
      </View>
    </TouchableHighlight>
  </View>
);

export default ProfileOptions;
