import React, { Component } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "./../style";
import moment from "moment";
import lang from "./../../../assets/lang/Messages/utils/SingleConversationMessage";
import { GlobalContext } from "./../../../Context/GlobalContext";

interface SingleConversationMessageState {
  isCurrentUserTheSender: boolean;
  showMessageDate: boolean;
}

interface SingleConversationMessageProps {
  message: {
    sender_id: number;
    message: string;
    created_at: string;
  };
}

class SingleConversationMessage extends Component<
  SingleConversationMessageProps,
  SingleConversationMessageState
> {
  constructor(props: SingleConversationMessageProps) {
    super(props);
    this.state = {
      isCurrentUserTheSender: false,
      showMessageDate: false
    };
  }

  setMessageDate = (): void => {
    this.setState({
      showMessageDate: !this.state.showMessageDate
    });
  };

  componentDidMount = (): void => {
    if (
      this.context.userData &&
      this.context.userData.id === this.props.message.sender_id
    ) {
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
            {lang.createdAt["en"]} {messageDate}
          </Text>
        )}
      </View>
    );
  }
}
SingleConversationMessage.contextType = GlobalContext;
export default SingleConversationMessage;
