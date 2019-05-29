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
import like from "./../../../../assets/images/like.png";

const SinglePostOnList = (props: { post: any; getPostDetails: any }): any => {
  const postDate = moment(props.post.created_at).format("LLL");
  return (
    <TouchableHighlight onPress={() => props.getPostDetails(props.post.id)}>
      <View style={styles.singlePostContainer}>
        <View>
          <Text style={{ fontSize: 18 }}>{props.post.title}</Text>
          <Text style={{ fontSize: 12 }}>{postDate}</Text>
          <Text style={{ fontSize: 12 }}>
            Komentarze: {props.post.comments.length}
          </Text>
        </View>

        <View
          style={{
            flexWrap: "wrap",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Text style={{ color: "#f7b67e", fontSize: 18 }}>
            {props.post.votes.length}
          </Text>
          <TouchableOpacity>
            <Image style={{ height: 20 }} resizeMode="contain" source={like} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default SinglePostOnList;
