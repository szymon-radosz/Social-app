import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./style";

const network: any = require("./../../../assets/images/network.png");
const sell: any = require("./../../../assets/images/sell.png");
const message: any = require("./../../../assets/images/message.png");
const forum: any = require("./../../../assets/images/forum.png");
const profile: any = require("./../../../assets/images/profile.png");
const dot: any = require("./../../../assets/images/dot.png");

const BottomPanel = (props: {
  openFindUsers: any;
  openAuctions: any;
  openMessages: any;
  user: {
    unreadedConversationMessage: boolean;
    unreadedConversationMessageAmount: number;
    unreadedNotifications: boolean;
    unreadedNotificationsAmount: number;
  };
  openForum: any;
  openProfile: any;
  openFindUsersStatus: boolean;
  openAuctionsStatus: boolean;
  openMessagesStatus: boolean;
  openForumStatus: boolean;
  openProfileStatus: boolean;
}): any => {
  return (
    <View style={styles.bottomPanel}>
      <TouchableOpacity onPress={props.openFindUsers}>
        <View
          style={
            props.openFindUsersStatus
              ? styles.bottomPanelImageActive
              : styles.bottomPanelImage
          }
        >
          <Image
            style={styles.buttonImage}
            source={network}
            resizeMode="contain"
          />
        </View>
        <Text
          style={
            props.openFindUsersStatus
              ? styles.buttonTextActive
              : styles.buttonText
          }
        >
          POZNAJ
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.openAuctions}>
        <View
          style={
            props.openAuctionsStatus
              ? styles.bottomPanelImageActive
              : styles.bottomPanelImage
          }
        >
          <Image
            style={styles.buttonImage}
            source={sell}
            resizeMode="contain"
          />
        </View>
        <Text
          style={
            props.openAuctionsStatus
              ? styles.buttonTextActive
              : styles.buttonText
          }
        >
          TARG
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.openMessages}>
        <View
          style={
            props.openMessagesStatus
              ? styles.bottomPanelImageActive
              : styles.bottomPanelImage
          }
        >
          <Image
            style={styles.buttonImage}
            source={message}
            resizeMode="contain"
          />
        </View>
        {props.user.unreadedConversationMessage &&
          props.user.unreadedConversationMessageAmount && (
            <TouchableOpacity
              style={styles.unreadedMessagesNotificationContainer}
            >
              <Image
                source={dot}
                style={styles.unreadedMessagesNotificationDot}
              />

              {props.user.unreadedConversationMessageAmount < 10 ? (
                <Text style={styles.unreadedMessagesNotificationDotText}>
                  {props.user.unreadedConversationMessageAmount}
                </Text>
              ) : (
                <Text style={styles.unreadedMessagesNotificationLongDotText}>
                  {props.user.unreadedConversationMessageAmount}
                </Text>
              )}
            </TouchableOpacity>
          )}
        <Text
          style={
            props.openMessagesStatus
              ? styles.buttonTextActive
              : styles.buttonText
          }
        >
          WIADOMOŚCI
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.openForum}>
        <View
          style={
            props.openForumStatus
              ? styles.bottomPanelImageActive
              : styles.bottomPanelImage
          }
        >
          <Image
            style={styles.buttonImage}
            source={forum}
            resizeMode="contain"
          />
        </View>
        <Text
          style={
            props.openForumStatus ? styles.buttonTextActive : styles.buttonText
          }
        >
          FORUM
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.openProfile}>
        <View
          style={
            props.openProfileStatus
              ? styles.bottomPanelImageActive
              : styles.bottomPanelImage
          }
        >
          <Image
            style={styles.buttonImage}
            source={profile}
            resizeMode="contain"
          />
        </View>
        {props.user.unreadedNotifications &&
          props.user.unreadedNotificationsAmount && (
            <TouchableOpacity
              style={styles.unreadedMessagesNotificationContainer}
            >
              <Image
                source={dot}
                style={styles.unreadedMessagesNotificationDot}
              />
              {props.user.unreadedNotificationsAmount < 10 ? (
                <Text style={styles.unreadedMessagesNotificationDotText}>
                  {props.user.unreadedNotificationsAmount}
                </Text>
              ) : (
                <Text style={styles.unreadedMessagesNotificationLongDotText}>
                  {props.user.unreadedNotificationsAmount}
                </Text>
              )}
            </TouchableOpacity>
          )}
        <Text
          style={
            props.openProfileStatus
              ? styles.buttonTextActive
              : styles.buttonText
          }
        >
          PROFIL
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomPanel;
