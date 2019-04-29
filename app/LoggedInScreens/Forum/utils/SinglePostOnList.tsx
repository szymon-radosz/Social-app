import React, { Component } from "react";
import {
  Platform,
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import Alert from "./../../../Alert/Alert";
import { v4 as uuid } from "uuid";
import styles from "./../style";

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
    return (
      <TouchableHighlight
        onPress={() => this.props.getPostDetails(this.props.post.id)}
      >
        <View style={styles.singlePostContainer}>
          <Text>{this.props.post.title}</Text>
          <Text>{this.props.post.created_at}</Text>
          <Text>Komentarze: {this.props.post.comments.length}</Text>
          <Text>Głosy: {this.props.post.votes.length}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
