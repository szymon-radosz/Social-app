import React from "react";
import { TextInput, Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";

const SavePostComment = (props: {
  setCommentMessage: any;
  commentMessage: string;
  postId: number;
  user: {
    id: number;
  };
  saveComment: any;
  clearCommentMessage: any;
}): any => {
  return (
    <View style={styles.savePostCommentContainer}>
      <TextInput
        style={styles.savePostCommentInput}
        multiline={false}
        maxLength={500}
        onChangeText={message => props.setCommentMessage(message)}
        value={props.commentMessage}
        placeholder="Napisz komentarz ..."
        placeholderTextColor="#333"
      />

      <TouchableHighlight
        style={styles.addCommentBtn}
        onPress={(): void => {
          props.saveComment(props.postId, props.user.id, props.commentMessage);
          props.clearCommentMessage();
        }}
      >
        <Text style={styles.peachBtnText}>Wyślij</Text>
      </TouchableHighlight>
    </View>
  );
};
export default SavePostComment;
