import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import SendMessageBox from "./SendMessageBox";
import SingleConversationMessage from "./SingleConversationMessage";
import styles from "./../style";
import { v4 as uuid } from "uuid";

interface ConversationDetailsState {
  messages: any;
}

interface ConversationDetailsProps {
  messages: any;
  clearUserUnreadedMessages: any;
  currentUser: {
    id: number;
  };
  API_URL: string;
  receiverPhotoPath: string;
  receiverName: string;
  senderId: number;
  receiverEmail: string;
  receiverId: number;
  sendMessage: void;
}

export default class ConversationDetails extends Component<
  ConversationDetailsProps,
  ConversationDetailsState
> {
  constructor(props: ConversationDetailsProps) {
    super(props);
    this.state = {
      messages: this.props.messages
    };

    console.log(["det", this.props]);
  }

  static getDerivedStateFromProps = (props: any, state: any) => {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.

    console.log(["getDerivedStateFromProps", props.messages]);
    if (props.messages !== state.messages) {
      return {
        messages: props.messages
      };
    }
    return null;
  };

  componentDidMount = (): void => {
    //console.log(["ConversationDetails", this.props]);

    this.props.clearUserUnreadedMessages(
      this.props.currentUser.id,
      this.state.messages[0].conversation_id
    );
  };

  /*componentDidUpdate() {
    this.setState({ messages: this.props.messages });
    console.log("Conversation details update", this.props);
  }*/

  render() {
    const { messages } = this.state;
    return (
      <View style={styles.viewContainer}>
        <View style={styles.filterBtnContainer}>
          <TouchableOpacity>
            <Image
              style={{
                width: 50,
                height: 50,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 6
              }}
              source={{
                uri: `${this.props.API_URL}userPhotos/${
                  this.props.receiverPhotoPath
                }`
              }}
            />
          </TouchableOpacity>
          <Text style={{ marginTop: 15 }}>
            Rozmowa z {this.props.receiverName}
            {"\n"}
            {this.props.receiverEmail}
          </Text>
        </View>
        {/* <Text>Sender: {this.props.senderId}</Text>*/}
        <View style={{ marginTop: 30 }}>
          {messages &&
            messages.map((message: any, i: number) => {
              return (
                <SingleConversationMessage
                  message={message}
                  currentUser={this.props.currentUser}
                  key={uuid()}
                />
              );
            })}
        </View>
        {messages && messages[0].conversation_id && (
          <SendMessageBox
            senderId={this.props.currentUser.id}
            receiverId={this.props.receiverId}
            conversationId={messages[0].conversation_id}
            sendMessage={this.props.sendMessage}
            receiverName={this.props.receiverName}
            receiverEmail={this.props.receiverEmail}
            receiverPhotoPath={this.props.receiverPhotoPath}
          />
        )}
      </View>
    );
  }
}
