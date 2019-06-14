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
      <View
        style={{
          flexWrap: "wrap",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: `${props.API_URL}userPhotos/${
                props.comment.users.photo_path
              }`
            }}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Text>{props.comment.users.name}</Text>
          <Text>{props.comment.users.email}</Text>
          <Text>{props.comment.created_at}</Text>
        </View>
      </View>
      <Text style={{ marginTop: 10, marginBottom: 10 }}>
        {props.comment.body}
      </Text>

      <View
        style={{
          flexWrap: "wrap",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 5,
          marginTop: 5
        }}
      >
        <View
          style={{
            flexWrap: "wrap",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 5
          }}
        >
          <Text style={{ color: "#f7b67e", fontSize: 18 }}>
            {props.comment.votes.length}
          </Text>
          <TouchableOpacity
            onPress={() => props.saveCommentVote(props.comment.id)}
          >
            <Image style={{ height: 20 }} resizeMode="contain" source={like} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default SinglePostDetailsComment;
