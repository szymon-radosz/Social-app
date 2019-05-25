import React, { Component } from "react";
import {
  Platform,
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import Alert from "./../../../Alert/Alert";
import { v4 as uuid } from "uuid";
import styles from "./../style";
import moment from "moment";
import "moment/locale/pl";
import comment from "./../../../assets/images/comment.png";
import like from "./../../../assets/images/like.png";

interface SinglePostOnListState {}

interface SinglePostOnListProps {
  showPosts: boolean;
  post: {
    title: string;
    comments: any;
    created_at: string;
    votes: any;
    id: number;
  };
  getPostDetails: any;
}

export default class SinglePostOnList extends Component<
  SinglePostOnListProps,
  SinglePostOnListState
> {
  constructor(props: SinglePostOnListProps) {
    super(props);
    this.state = {};
  }

  componentDidMount = (): void => {
    console.log(this.props.post);
  };

  render() {
    const postDate = moment(this.props.post.created_at).format("LLL");
    return (
      <TouchableHighlight
        onPress={() => this.props.getPostDetails(this.props.post.id)}
      >
        <View style={styles.singlePostContainer}>
          <View>
            <Text style={{ fontSize: 18 }}>{this.props.post.title}</Text>
            <Text style={{ fontSize: 12 }}>{postDate}</Text>
            <Text style={{ fontSize: 12 }}>
              Komentarze: {this.props.post.comments.length}
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
              {this.props.post.votes.length}
            </Text>
            <TouchableOpacity>
              <Image
                style={{ height: 20 }}
                resizeMode="contain"
                source={like}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
