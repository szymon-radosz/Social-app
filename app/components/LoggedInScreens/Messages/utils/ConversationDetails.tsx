import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import SendMessageBox from "./SendMessageBox";
import SingleConversationMessage from "./SingleConversationMessage";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";
import { GlobalContext } from "./../../../Context/GlobalContext";

interface ConversationDetailsState {
  messages: any;
}

interface ConversationDetailsProps {
  messages: any;
  receiverPhotoPath: string;
  receiverName: string;
  receiverEmail: string;
  receiverId: number;
  sendMessage: any;
  setUserMessage: any;
  userMessage: string;
  closeConversationDetails: any;
}

class ConversationDetails extends Component<
  ConversationDetailsProps,
  ConversationDetailsState
> {
  constructor(props: ConversationDetailsProps) {
    super(props);
    this.state = {
      messages: this.props.messages
    };
  }

  static getDerivedStateFromProps = (props: any, state: any) => {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.

    if (props.messages !== state.messages) {
      return {
        messages: props.messages
      };
    }
    return null;
  };

  componentDidMount = (): void => {
    if (this.context.userData.id)
      this.context.clearUserUnreadedMessages(
        this.context.userData.id,
        this.state.messages[0].conversation_id
      );
  };

  render() {
    const { messages } = this.state;
    return (
      <View style={styles.viewContainer} data-test="ConversationDetails">
        <PageHeader
          boldText={this.props.receiverName}
          normalText={""}
          closeMethod={this.props.closeConversationDetails}
          closeMethodParameter={""}
          data-test="PageHeader"
        />

        <View style={styles.messageDetailsContainer}>
          <TouchableOpacity>
            <Image
              style={styles.conversationDetailsReceiverImage}
              source={{
                uri: `${this.props.receiverPhotoPath}`
              }}
            />
          </TouchableOpacity>
          <Text style={styles.conversationDetailsReceiverName}>
            Rozmowa z {this.props.receiverName}
            {"\n"}
            {this.props.receiverEmail}
          </Text>
        </View>
        {/* <Text>Sender: {this.props.senderId}</Text>*/}
        <View>
          {messages &&
            messages.map((message: any, i: number) => {
              return (
                <SingleConversationMessage
                  message={message}
                  key={`SingleConversationMessage-${i}`}
                />
              );
            })}
        </View>
        {messages && messages[0].conversation_id && (
          <SendMessageBox
            receiverId={this.props.receiverId}
            conversationId={messages[0].conversation_id}
            sendMessage={this.props.sendMessage}
            receiverName={this.props.receiverName}
            receiverEmail={this.props.receiverEmail}
            receiverPhotoPath={this.props.receiverPhotoPath}
            setUserMessage={this.props.setUserMessage}
            userMessage={this.props.userMessage}
          />
        )}
      </View>
    );
  }
}

ConversationDetails.contextType = GlobalContext;
export default ConversationDetails;
