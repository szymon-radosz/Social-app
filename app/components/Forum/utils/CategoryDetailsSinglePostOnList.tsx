import React from "react";
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import styles from "./../style";
import moment from "moment";
import "moment/locale/pl";
import lang from "./../../../assets/lang/Forum/utils/CategoryDetailsSinglePostOnList";

const like: any = require("./../../../assets/images/like.png");

const CategoryDetailsSinglePostOnList = (props: {
  post: any;
  getPostDetails: any;
  showPosts: boolean;
  navigation: any;
}): any => {
  const postDate = moment(props.post.created_at).format("LLL");
  return (
    <TouchableHighlight
      onPress={() =>
        props.navigation.navigate("PostDetails", { postId: props.post.id })
      }
      underlayColor={"#fff"}
    >
      <View style={styles.singlePostContainer}>
        <View style={{ width: "80%" }}>
          <Text style={styles.singlePostTitle}>{props.post.title}</Text>
          <Text style={styles.singlePostDate}>{postDate}</Text>
          <Text style={styles.singlePostCommentLength}>
            {lang.comments["en"]} {props.post.comments.length}
          </Text>
        </View>

        <View style={styles.singlePostLikeContainer}>
          <Text style={styles.singlePostLikeContainerVoteLength}>
            {props.post.votes.length}
          </Text>
          <TouchableOpacity>
            <Image
              style={styles.singlePostLikeContainerLikeIcon}
              resizeMode="contain"
              source={like}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default CategoryDetailsSinglePostOnList;
