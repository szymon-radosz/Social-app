import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from "react-native";
import styles from "./../style";

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
    this.state = {
      isCurrentUserTheSender: false,
      showMessageDate: false
    };
  }
  render() {
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
        style={styles.productListSingleProductContainer}
      >
        <View>
          <TouchableOpacity>
            <Image
              style={styles.productListSingleProductImage}
              source={{
                uri: `${this.props.API_URL}userPhotos/${
                  this.props.conversation.receiverPhotoPath
                }`
              }}
            />
          </TouchableOpacity>
          <Text
            style={{ fontWeight: "bold", textAlign: "center", color: "#333" }}
          >
            {this.props.conversation.receiverName}
          </Text>
          <Text style={{ textAlign: "center", color: "#333" }}>
            {this.props.conversation.messages[0].updated_at}
          </Text>
          <Text
            style={
              this.props.conversation.userHadUnreadedMessages
                ? styles.unreadedConversation
                : styles.readedConversation
            }
          >
            {
              this.props.conversation.messages[
                this.props.conversation.messages.length - 1
              ].message
            }
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}
