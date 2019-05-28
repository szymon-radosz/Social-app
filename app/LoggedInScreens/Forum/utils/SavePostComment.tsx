import React from "react";
import { TextInput, Button, View, TouchableHighlight } from "react-native";
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
        onChangeText={message => props.setCommentMessage(message)}
        value={props.commentMessage}
        placeholder="Napisz komentarz ..."
        placeholderTextColor="#333"
      />

      <TouchableHighlight style={styles.addCommentBtn}>
        <Button
          title="Wyślij"
          onPress={(): void => {
            props.saveComment(
              props.postId,
              props.user.id,
              props.commentMessage
            );
            props.clearCommentMessage();
          }}
          color="#fff"
        />
      </TouchableHighlight>
    </View>
  );
};
export default SavePostComment;
