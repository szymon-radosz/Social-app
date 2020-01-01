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

const SingleConversationBox = (props: {
  conversation: any;
  openConversationDetails: any;
  API_URL: string;
}): any => {
  //console.log(["SingleConversationBox", props]);
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
              uri: `${props.conversation.receiverPhotoPath}`
            }}
          />
        </TouchableOpacity>

        <View style={styles.productListSingleProductTextContainer}>
          <Text style={styles.conversationReceiverName}>
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
          <Text style={styles.lastMessageDate}>{lastMessageDate}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default SingleConversationBox;
