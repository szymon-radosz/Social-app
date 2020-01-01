import React from "react";
import { View } from "react-native";
import styles from "./../style";
import ButtonComponent from "./../../Utils/ButtonComponent";
import TextAreaComponent from "./../../Utils/TextAreaComponent";
import lang from "./../../../assets/lang/Forum/utils/SavePostComment";

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
      <View style={styles.savePostCommentInputContainer}>
        <TextAreaComponent
          placeholder={lang.comment["en"]}
          inputOnChange={(message: string) => props.setCommentMessage(message)}
          value={props.commentMessage}
          maxLength={500}
          multiline={true}
          numberOfLines={10}
        />
      </View>

      <ButtonComponent
        pressButtonComponent={(): void => {
          props.saveComment(props.postId, props.user.id, props.commentMessage);
          props.clearCommentMessage();
        }}
        buttonComponentText={lang.addComment["en"]}
        fullWidth={true}
        underlayColor="#dd904d"
        whiteBg={false}
        showBackIcon={false}
      />
    </View>
  );
};
export default SavePostComment;
