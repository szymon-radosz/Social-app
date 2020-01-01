import React, { useContext } from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import styles from "./style";
import lang from "./../../assets/lang/SharedComponents/BottomPanel";
import { GlobalContext } from "./../../Context/GlobalContext";

const network: any = require("./../../assets/images/network.png");
const sell: any = require("./../../assets/images/sell.png");
const message: any = require("./../../assets/images/message.png");
const forum: any = require("./../../assets/images/forum.png");
const profile: any = require("./../../assets/images/profile.png");
const dot: any = require("./../../assets/images/dot.png");
const feedback: any = require("./../../assets/images/feedback.png");

const BottomPanel = (props: any) => {
  const context = useContext(GlobalContext);
  return (
    <React.Fragment>
      <View style={styles.bottomPanel}>
        <TouchableOpacity
          onPress={() => context.NavigationService.navigate("UserList", {})}
        >
          <View
            style={
              context.currentNavName === lang.people["en"]
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
              context.currentNavName === lang.people["en"]
                ? styles.buttonTextActive
                : styles.buttonText
            }
          >
            {lang.people["en"]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => context.NavigationService.navigate("Auctions", {})}
        >
          <View
            style={
              context.currentNavName === lang.auctions["en"]
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
              context.currentNavName === lang.auctions["en"]
                ? styles.buttonTextActive
                : styles.buttonText
            }
          >
            {lang.auctions["en"]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => context.NavigationService.navigate("Messages", {})}
        >
          <View
            style={
              context.currentNavName === lang.messages["en"]
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
              context.currentNavName === lang.messages["en"]
                ? styles.buttonTextActive
                : styles.buttonText
            }
          >
            {lang.messages["en"]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => context.NavigationService.navigate("Forum", {})}
        >
          <View
            style={
              context.currentNavName === lang.forum["en"]
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
              context.currentNavName === lang.forum["en"]
                ? styles.buttonTextActive
                : styles.buttonText
            }
          >
            {lang.forum["en"]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => context.NavigationService.navigate("Profile", {})}
        >
          <View
            style={
              context.currentNavName === lang.profile["en"]
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
              context.currentNavName === lang.profile["en"]
                ? styles.buttonTextActive
                : styles.buttonText
            }
          >
            {lang.profile["en"]}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ position: "absolute", right: 10, bottom: 75, zIndex: 1 }}
        onPress={() => context.NavigationService.navigate("FeedbackModal", {})}
        data-test="feedbackIcon"
      >
        <Image source={feedback} style={{ width: 50, height: 50 }} />
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default BottomPanel;
