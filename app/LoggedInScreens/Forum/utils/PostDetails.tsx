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
import axios from "axios";

interface PostDetailsState {
  postDetails: any;
}

interface PostDetailsProps {
  postDetailsId: number;
  API_URL: string;
  setShowPostDetails: any;
  user: any;
}

export default class PostDetails extends Component<
  PostDetailsProps,
  PostDetailsState
> {
  constructor(props: PostDetailsProps) {
    super(props);
    this.state = {
      postDetails: []
    };

    this.getPostById = this.getPostById.bind(this);
  }

  getPostById = (): void => {
    try {
      let API_URL = this.props.API_URL;
      let postId = this.props.postDetailsId;

      let that = this;

      axios
        .post(API_URL + "/api/getPostById", {
          postId: postId
        })
        .then(function(response) {
          console.log(response);
          if (response.data.status === "OK") {
            console.log(response.data);

            that.setState({ postDetails: response.data.result[0] });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount = (): void => {
    console.log(this.props.postDetailsId);
    this.getPostById();
  };

  render() {
    const { postDetails } = this.state;
    return (
      <View style={styles.mainModalContainer}>
        <View style={styles.userDetailsModalContentContainer}>
          <View style={styles.relative}>
            <TouchableHighlight style={styles.buttonCloseModal}>
              <Button
                title="X"
                color="#000"
                onPress={() => this.props.setShowPostDetails()}
              />
            </TouchableHighlight>
            <Text>{postDetails.title}</Text>
            <Text>{postDetails.description}</Text>
          </View>
        </View>
      </View>
    );
  }
}
