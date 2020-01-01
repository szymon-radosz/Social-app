import React, { useContext } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import styles from "./../style";
import moment from "moment";
import "moment/locale/pl";
import { GlobalContext } from "./../../../Context/GlobalContext";
import lang from "./../../../assets/lang/Forum/utils/SinglePostDetailsComment";

const like: any = require("./../../../assets/images/like.png");

const SinglePostDetailsComment = (props: {
  API_URL: string;
  comment: {
    id: number;
    created_at: string;
    body: string;
    votes: any;
    user_id: number;
    users: {
      id: number;
      name: string;
      photo_path: string;
      email: string;
    };
  };
  navigation: any;
  saveCommentVote: any;
}): any => {
  const context = useContext(GlobalContext);
  const commentDate = moment(props.comment.created_at).format("LLL");
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
          <Text style={styles.postDetailsPostDate}>{commentDate}</Text>
          {props.comment.users.id !== context.userData.id && (
            <TouchableHighlight
              onPress={() => {
                props.navigation.navigate("UserDetails", {
                  userId: props.comment.users.id,
                  showBtns: true
                });
              }}
              underlayColor={"#fff"}
            >
              <Text style={styles.conversationDetailsSeeMore}>
                {lang.seeProfile["en"]}
              </Text>
            </TouchableHighlight>
          )}
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
            onPress={() =>
              props.saveCommentVote(
                props.comment.id,
                props.comment.user_id,
                props.comment.votes
              )
            }
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
