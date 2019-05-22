import React, { Component } from "react";
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

interface SingleConversationMessageState {
  isCurrentUserTheSender: boolean;
  showMessageDate: boolean;
}

interface SingleConversationBoxProps {
  openConversationDetails: any;
  conversation: {
    id: number;
    receiverId: number;
    receiverName: string;
    receiverEmail: string;
    receiverPhotoPath: string;
    messages: any;
    userHadUnreadedMessages: boolean;
  };
  API_URL: string;
}

export default class SingleConversationBox extends Component<
  SingleConversationBoxProps,
  SingleConversationMessageState
> {
  constructor(props: SingleConversationBoxProps) {
    super(props);

    console.log(this.props.conversation);
    this.state = {
      isCurrentUserTheSender: false,
      showMessageDate: false
    };
  }
  render() {
    const lastMessageDate = moment(
      this.props.conversation.messages[
        this.props.conversation.messages.length - 1
      ].updated_at
    ).format("LLL");
    return (
      <TouchableHighlight
        onPress={(): void => {
          this.props.openConversationDetails(
            this.props.conversation.id,
            this.props.conversation.receiverId,
            this.props.conversation.receiverName,
            this.props.conversation.receiverEmail,
            this.props.conversation.receiverPhotoPath
          );
        }}
      >
        <View style={styles.productListSingleProductContainer}>
          <TouchableOpacity
            onPress={(): void => {
              this.props.openConversationDetails(
                this.props.conversation.id,
                this.props.conversation.receiverId,
                this.props.conversation.receiverName,
                this.props.conversation.receiverEmail,
                this.props.conversation.receiverPhotoPath
              );
            }}
          >
            <Image
              style={styles.productListSingleProductImage}
              source={{
                uri: `${this.props.API_URL}userPhotos/${
                  this.props.conversation.receiverPhotoPath
                }`
              }}
            />
          </TouchableOpacity>

          <View style={styles.productListSingleProductTextContainer}>
            <Text
              style={{ fontWeight: "bold", textAlign: "left", color: "#333" }}
            >
              {this.props.conversation.receiverName}
            </Text>

            <Text
              style={
                this.props.conversation.userHadUnreadedMessages
                  ? styles.unreadedConversation
                  : styles.readedConversation
              }
            >
              {this.props.conversation.messages[
                this.props.conversation.messages.length - 1
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
  }
}
