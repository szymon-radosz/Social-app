import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./style";

const network: any = require("./../../assets/images/network.png");
const sell: any = require("./../../assets/images/sell.png");
const message: any = require("./../../assets/images/message.png");
const forum: any = require("./../../assets/images/forum.png");
const profile: any = require("./../../assets/images/profile.png");
const dot: any = require("./../../assets/images/dot.png");

const BottomPanel = (props: {
  openFindUsers: any;
  openAuctions: any;
  openMessages: any;
  user: {
    unreadedConversationMessage: boolean;
    unreadedConversationMessageAmount: boolean;
  };
  openForum: any;
  openProfile: any;
}): any => {
  return (
    <View style={styles.bottomPanel}>
      <TouchableOpacity onPress={() => props.openFindUsers()}>
        <Image
          style={styles.buttonImage}
          source={network}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>POZNAJ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.openAuctions()}>
        <Image style={styles.buttonImage} source={sell} resizeMode="contain" />
        <Text style={styles.buttonText}>TARG</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.openMessages()}>
        <Image
          style={styles.buttonImage}
          source={message}
          resizeMode="contain"
        />
        {props.user.unreadedConversationMessage &&
          props.user.unreadedConversationMessageAmount && (
            <TouchableOpacity
              style={styles.unreadedMessagesNotificationContainer}
            >
              <Image
                source={dot}
                style={styles.unreadedMessagesNotificationDot}
                //resizeMode="contain"
              />
              <Text style={styles.unreadedMessagesNotificationDotText}>
                {props.user.unreadedConversationMessageAmount}
              </Text>
            </TouchableOpacity>
          )}
        <Text style={styles.buttonText}>WIADOMOŚCI</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.openForum()}>
        <Image style={styles.buttonImage} source={forum} resizeMode="contain" />
        <Text style={styles.buttonText}>FORUM</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.openProfile()}>
        <Image
          style={styles.buttonImage}
          source={profile}
          resizeMode="contain"
        />
        <Text style={styles.buttonText}>PROFIL</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomPanel;
