import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import axios from "axios";
import styles from "./style";
import Alert from "./../../../Alert/Alert";
import { v4 as uuid } from "uuid";

export default class ProductVoteBox extends Component {
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.foundVoteUserList !== props.foundVoteUserList) {
      console.log("derivered ProductVoteBox");
      return {
        foundVoteUserList: props.foundVoteUserList
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      voteValue: 0,
      selectedUser: [],
      alertMessage: "",
      alertType: "",
      foundVoteUserList: [],
      selectedUserData: [],
      showfoundVoteUserList: true,
      userVote: 0,
      voteComment: ""
    };

    this.closeProduct = this.closeProduct.bind(this);
    this.clearFoundVoteUserList = this.clearFoundVoteUserList.bind(this);
    this.setSelectedUserData = this.setSelectedUserData.bind(this);
    this.setUserVote = this.setUserVote.bind(this);
    this.sendVote = this.sendVote.bind(this);
  }

  setSelectedUserData(id, name, age, email) {
    let user = {
      id: id,
      name: name,
      age: age,
      email: email
    };

    this.setState({
      selectedUserData: user,
      showfoundVoteUserList: false
    });

    console.log(this.state.selectedUserData);
  }

  componentDidMount() {
    this.setState({ foundVoteUserList: this.props.foundVoteUserList });
  }

  setUserVote(vote) {
    this.setState({ userVote: vote });

    console.log(["setuservote", this.state.userVote]);
  }

  clearFoundVoteUserList() {
    this.setState({ foundVoteUserList: [] });
  }

  closeProduct(productId) {
    let API_URL = this.props.API_URL;

    console.log(productId);

    let that = this;

    axios
      .post(API_URL + "/api/closeProduct", {
        productId: productId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["zamknąłeś produkt", response.data.result]);
          that.props.changeVoteBox();
          that.props.getProductDetails();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  sendVote() {
    console.log([
      this.state.selectedUserData.id,
      this.state.userVote,
      this.state.voteComment,
      this.props.currentUser.id,
      this.props.product.id
    ]);

    let API_URL = this.props.API_URL;
    let userId = this.state.selectedUserData.id;
    let vote = this.state.userVote;
    let message = this.state.voteComment;
    let authorId = this.props.currentUser.id;
    let productId = this.props.product.id;

    let that = this;

    axios
      .post(API_URL + "/api/saveVote", {
        userId: userId,
        vote: vote,
        message: message,
        authorId: authorId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          console.log(["zapisałeś głos", response.data.result]);
          that.closeProduct(productId);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.mainModalContainer}>
        <View style={styles.userDetailsModalContentContainer}>
          <View style={styles.relative}>
            <TouchableHighlight style={styles.buttonCloseModal}>
              <Button
                title="X"
                color="#000"
                onPress={() => this.props.changeVoteBox()}
              />
            </TouchableHighlight>
            <View style={styles.userDetailsHeader}>
              <Text style={styles.userMessageHeader}>
                Wystaw ocenę kupującemu
              </Text>
            </View>

            <TextInput
              onChangeText={name => {
                this.clearFoundVoteUserList();
                this.setState({
                  showfoundVoteUserList: true
                });
                this.props.searchUsersByName(name);
              }}
              placeholder="Szukaj uzytkownika po imieniu..."
              placeholderTextColor="#333"
              style={styles.userMessageTextArea}
            />

            <View>
              {this.state.showfoundVoteUserList &&
                this.state.foundVoteUserList &&
                this.state.foundVoteUserList.map((user, i) => {
                  if (user.id != this.props.currentUser.id) {
                    return (
                      <Text
                        key={uuid()}
                        onPress={() =>
                          this.setSelectedUserData(
                            user.id,
                            user.name,
                            user.age,
                            user.email
                          )
                        }
                      >
                        {user.name}, {user.age}, {user.email}
                      </Text>
                    );
                  }
                })}
            </View>

            {this.state.selectedUserData.name && (
              <View>
                <Text>
                  Oceń współpracę z {this.state.selectedUserData.name} (
                  {this.state.selectedUserData.email})
                </Text>

                <Text onPress={() => this.setUserVote(1)}>1</Text>
                <Text onPress={() => this.setUserVote(2)}>2</Text>
                <Text onPress={() => this.setUserVote(3)}>3</Text>
                <Text onPress={() => this.setUserVote(4)}>4</Text>
                <Text onPress={() => this.setUserVote(5)}>5</Text>
              </View>
            )}

            {this.state.userVote != 0 && (
              <View>
                <Text>Twoja ocena: {this.state.userVote}</Text>

                <TextInput
                  multiline={true}
                  numberOfLines={10}
                  onChangeText={voteComment => {
                    this.setState({
                      voteComment
                    });
                  }}
                  placeholder="Napisz komentarz do opinii..."
                  placeholderTextColor="#333"
                  style={styles.userMessageTextArea}
                />

                <TouchableHighlight style={styles.userMessageBtn}>
                  <Button
                    title="Wyślij"
                    color="#fff"
                    onPress={() => this.sendVote()}
                  />
                </TouchableHighlight>
              </View>
            )}
            {/*<TouchableHighlight style={styles.userMessageBtn}>
              <Button
                title="Wyślij"
                color="#fff"
                onPress={() =>
                  this.props.sendNewConversationProduct(this.state.message)
                }
              />
            </TouchableHighlight>*/}
          </View>
        </View>
        {this.state.alertMessage != "" && (
          <Alert
            alertType={this.state.alertType}
            alertMessage={this.state.alertMessage}
          />
        )}
      </View>
    );
  }
}
