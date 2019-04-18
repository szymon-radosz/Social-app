import React, { Component } from "react";
import {
  Platform,
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Alert from "./../../../Alert/Alert";
import { v4 as uuid } from "uuid";
import styles from "./../style";
import axios from "axios";

interface SavePostCommentState {
  message: string;
}

interface SavePostCommentProps {
  postId: number;
  user: any;
  saveComment: any;
}

export default class SavePostComment extends Component<
  SavePostCommentProps,
  SavePostCommentState
> {
  constructor(props: SavePostCommentProps) {
    super(props);
    this.state = {
      message: ""
    };

    this.clearMessageText = this.clearMessageText.bind(this);
  }

  clearMessageText = (): void => {
    this.setState({ message: "" });
  };

  render() {
    return (
      <View>
        <Text>Napisz komentarz:</Text>
        <TextInput
          multiline={false}
          onChangeText={message => this.setState({ message })}
          value={this.state.message}
          placeholder="..."
          placeholderTextColor="#333"
        />

        <TouchableHighlight>
          <Button
            title="Wyślij"
            onPress={(): void => {
              this.props.saveComment(
                this.props.postId,
                this.props.user.id,
                this.state.message
              );
              this.clearMessageText();
            }}
            color="#000"
          />
        </TouchableHighlight>
      </View>
    );
  }
}
