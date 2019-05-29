import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from "react-native";
import styles from "./../style";
import moment from "moment";
import "moment/locale/pl";

const SingleConversationBox = (props: {
  conversation: any;
  openConversationDetails: any;
  API_URL: string;
}): any => {
  const lastMessageDate = moment(
    props.conversation.messages[props.conversation.messages.length - 1]
      .updated_at
  ).format("LLL");
  return (
    <TouchableHighlight
      onPress={(): void => {
        props.openConversationDetails(
          props.conversation.id,
          props.conversation.receiverId,
          props.conversation.receiverName,
          props.conversation.receiverEmail,
          props.conversation.receiverPhotoPath
        );
      }}
    >
      <View style={styles.productListSingleProductContainer}>
        <TouchableOpacity
          onPress={(): void => {
            props.openConversationDetails(
              props.conversation.id,
              props.conversation.receiverId,
              props.conversation.receiverName,
              props.conversation.receiverEmail,
              props.conversation.receiverPhotoPath
            );
          }}
        >
          <Image
            style={styles.productListSingleProductImage}
            source={{
              uri: `${props.API_URL}userPhotos/${
                props.conversation.receiverPhotoPath
              }`
            }}
          />
        </TouchableOpacity>

        <View style={styles.productListSingleProductTextContainer}>
          <Text
            style={{ fontWeight: "bold", textAlign: "left", color: "#333" }}
          >
            {props.conversation.receiverName}
          </Text>

          <Text
            style={
              props.conversation.userHadUnreadedMessages
                ? styles.unreadedConversation
                : styles.readedConversation
            }
          >
            {props.conversation.messages[
              props.conversation.messages.length - 1
            ].message.substring(0, 20)}
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "#333",
              fontSize: 10,
              marginTop: 5
            }}
          >
            {lastMessageDate}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default SingleConversationBox;
