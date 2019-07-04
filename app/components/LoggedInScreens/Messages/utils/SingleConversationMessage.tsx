import React, { Component } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./../style";
import moment from "moment";
import "moment/locale/pl";

interface SingleConversationMessageState {
  isCurrentUserTheSender: boolean;
  showMessageDate: boolean;
}

interface SingleConversationMessageProps {
  currentUser: {
    id: number;
  };
  message: {
    sender_id: number;
    message: string;
    created_at: string;
  };
}

export default class SingleConversationMessage extends Component<
  SingleConversationMessageProps,
  SingleConversationMessageState
> {
  constructor(props: SingleConversationMessageProps) {
    super(props);
    this.state = {
      isCurrentUserTheSender: false,
      showMessageDate: false
    };

    this.setMessageDate = this.setMessageDate.bind(this);
  }

  setMessageDate = (): void => {
    this.setState({
      showMessageDate: !this.state.showMessageDate
    });
  };

  componentDidMount = (): void => {
    if (this.props.currentUser.id === this.props.message.sender_id) {
      this.setState({ isCurrentUserTheSender: true });
    }
  };

  render() {
    const { isCurrentUserTheSender, showMessageDate } = this.state;

    const messageDate = moment(this.props.message.created_at).format("LLL");
    return (
      <View>
        <TouchableOpacity onPress={this.setMessageDate}>
          <Text
            style={
              isCurrentUserTheSender ? styles.senderBox : styles.receiverBox
            }
          >
            {this.props.message.message}
          </Text>
        </TouchableOpacity>
        {showMessageDate && (
          <Text
            style={
              isCurrentUserTheSender
                ? styles.messageDateSender
                : styles.messageDateReceiver
            }
          >
            Data dodania: {messageDate}
          </Text>
        )}
        {/*<View style={{ borderBottomWidth: 1 }} />*/}
      </View>
    );
  }
}
