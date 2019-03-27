import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  View
} from "react-native";

export default class SingleConversationMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrentUserTheSender: false,
      showMessageDate: false
    };

    this.setMessageDate = this.setMessageDate.bind(this);

    console.log(["single message", this.props]);
  }

  setMessageDate() {
    console.log("setMessageDate");
    this.setState({ showMessageDate: !this.state.showMessageDate });
  }

  componentDidMount() {
    if (this.props.currentUser.id === this.props.message.sender_id) {
      console.log("isCurrentUserTheSender");
      this.setState({ isCurrentUserTheSender: true });
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setMessageDate();
          }}
        >
          <Text
            style={
              this.state.isCurrentUserTheSender
                ? {
                    width: "80%",
                    textAlign: "right",
                    alignSelf: "flex-end",
                    backgroundColor: "#ccc",
                    fontSize: 12
                  }
                : {
                    width: "80%",
                    marginLeft: 0,
                    backgroundColor: "green",
                    fontSize: 12
                  }
            }
          >
            {this.props.message.message}
          </Text>
        </TouchableOpacity>
        {this.state.showMessageDate && (
          <Text
            style={{
              width: "80%",
              textAlign: "right",
              alignSelf: "flex-end",
              fontSize: 12
            }}
          >
            {this.props.message.created_at}
          </Text>
        )}
        <View style={{ borderBottomWidth: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  pageTitle: {
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10
  },
  pageSubTitle: {
    textAlign: "center",
    color: "#333",
    fontWeight: "400",
    fontSize: 14,
    paddingBottom: 20
  }
});
