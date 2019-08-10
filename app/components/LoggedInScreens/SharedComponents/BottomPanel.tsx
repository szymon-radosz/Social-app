import React, { useContext } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TouchableHighlight
} from "react-native";
import styles from "./style";
import { GlobalContext } from "./../../Context/GlobalContext";

const network: any = require("./../../../assets/images/network.png");
const sell: any = require("./../../../assets/images/sell.png");
const message: any = require("./../../../assets/images/message.png");
const forum: any = require("./../../../assets/images/forum.png");
const profile: any = require("./../../../assets/images/profile.png");
const dot: any = require("./../../../assets/images/dot.png");
const feedback: any = require("./../../../assets/images/feedback.png");

const BottomPanel = (props: any) => {
  const context = useContext(GlobalContext);
  return (
    <View style={styles.bottomPanel}>
      <TouchableHighlight
        style={{ position: "absolute", right: 10, top: -60 }}
        onPress={() => context.NavigationService.navigate("FeedbackModal", {})}
        underlayColor={"#fff"}
        data-test="feedbackIcon"
      >
        <Image source={feedback} style={{ width: 50, height: 50 }} />
      </TouchableHighlight>

      <TouchableOpacity
        onPress={() => context.NavigationService.navigate("UserList", {})}
      >
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
      <TouchableOpacity
        onPress={() => context.NavigationService.navigate("Auctions", {})}
      >
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
      <TouchableOpacity
        onPress={() => context.NavigationService.navigate("Messages", {})}
      >
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
        {context.userData &&
          //@ts-ignore
          context.userData.unreadedConversationMessage &&
          //@ts-ignore
          context.userData.unreadedConversationMessageAmount && (
            <TouchableOpacity
              style={styles.unreadedMessagesNotificationContainer}
            >
              <Image
                source={dot}
                style={styles.unreadedMessagesNotificationDot}
              />

              {context.userData &&
              //@ts-ignore
              context.userData.unreadedConversationMessageAmount < 10 ? (
                <Text style={styles.unreadedMessagesNotificationDotText}>
                  {context.userData &&
                    //@ts-ignore
                    context.userData.unreadedConversationMessageAmount}
                </Text>
              ) : (
                <Text style={styles.unreadedMessagesNotificationLongDotText}>
                  {context.userData &&
                    //@ts-ignore
                    context.userData.unreadedConversationMessageAmount}
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
      <TouchableOpacity
        onPress={() => context.NavigationService.navigate("Forum", {})}
      >
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
      <TouchableOpacity
        onPress={() => context.NavigationService.navigate("Profile", {})}
      >
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
        {context.userData &&
          //@ts-ignore
          context.userData.unreadedNotifications &&
          //@ts-ignore
          context.userData.unreadedNotificationsAmount && (
            <TouchableOpacity
              style={styles.unreadedMessagesNotificationContainer}
            >
              <Image
                source={dot}
                style={styles.unreadedMessagesNotificationDot}
              />
              {context.userData &&
              //@ts-ignore
              context.userData.unreadedNotificationsAmount < 10 ? (
                <Text style={styles.unreadedMessagesNotificationDotText}>
                  {context.userData &&
                    //@ts-ignore
                    context.userData.unreadedNotificationsAmount}
                </Text>
              ) : (
                <Text style={styles.unreadedMessagesNotificationLongDotText}>
                  {context.userData &&
                    //@ts-ignore
                    context.userData.unreadedNotificationsAmount}
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
