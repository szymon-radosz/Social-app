import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./../style";
const like: any = require("./../../../../assets/images/like.png");

const SinglePostDetailsComment = (props: {
  API_URL: string;
  comment: {
    id: number;
    created_at: string;
    body: string;
    votes: any;
    users: {
      name: string;
      photo_path: string;
      email: string;
    };
  };
  saveCommentVote: any;
}): any => {
  return (
    <View style={styles.postDetailsComment}>
      <View style={styles.singlePostDetailsCommentUserSectionContainer}>
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: `${props.comment.users.photo_path}`
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 10
          }}
        >
          <Text style={styles.postDetailsAuthorContainerName}>
            {props.comment.users.name}
          </Text>
          <Text style={styles.postDetailsAuthorContainerEmail}>
            {props.comment.users.email}
          </Text>
          <Text style={styles.postDetailsPostDate}>
            {props.comment.created_at}
          </Text>
        </View>
      </View>
      <Text style={styles.singlePostDetailsCommentBody}>
        {props.comment.body}
      </Text>

      <View style={styles.singlePostDetailsCommentVoteContainer}>
        <View style={styles.singlePostDetailsCommentVoteWrapper}>
          <Text style={styles.postDetailsPostVoteCount}>
            {props.comment.votes && props.comment.votes.length}
          </Text>
          <TouchableOpacity
            onPress={() => props.saveCommentVote(props.comment.id)}
          >
            <Image
              style={styles.postDetailsPostVoteImage}
              resizeMode="contain"
              source={like}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SinglePostDetailsComment;
