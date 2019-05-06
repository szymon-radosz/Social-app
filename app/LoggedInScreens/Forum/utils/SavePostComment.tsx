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
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 6,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            padding: 10
          }}
          multiline={false}
          onChangeText={message => this.setState({ message })}
          value={this.state.message}
          placeholder="Napisz komentarz ..."
          placeholderTextColor="#333"
        />

        <TouchableHighlight style={styles.addCommentBtn}>
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
            color="#fff"
          />
        </TouchableHighlight>
      </View>
    );
  }
}
