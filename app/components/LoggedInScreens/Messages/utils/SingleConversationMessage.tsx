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
    //old
    //this.setState({ showMessageDate: !this.state.showMessageDate });
    //setState — it’s actually asynchronous.
    //React batches state changes for performance reasons, so
    //the state may not change immediately after setState is called.
    //That means you should not rely on the current state when calling
    //setState — since you can’t be sure what that state will be!
    this.setState(prevState => ({
      showMessageDate: !prevState.showMessageDate
    }));
  };

  componentDidMount = (): void => {
    if (this.props.currentUser.id === this.props.message.sender_id) {
      console.log("isCurrentUserTheSender");
      this.setState({ isCurrentUserTheSender: true });
    }
  };

  render() {
    const { isCurrentUserTheSender, showMessageDate } = this.state;

    const messageDate = moment(this.props.message.created_at).format("LLL");
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setMessageDate();
          }}
        >
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
