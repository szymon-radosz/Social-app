import React, { Component } from "react";
import {
  TextInput,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import styles from "./../style";
import { v4 as uuid } from "uuid";
import PageHeader from "./../../SharedComponents/PageHeader";

interface SellerVoteBoxProps {
  foundVoteUserList: any;
  API_URL: string;
  changeVoteBox: any;
  getProductDetails: any;
  searchUsersByEmail: any;
  currentUser: {
    id: number;
  };
  product: {
    id: number;
  };
}

interface SellerVoteBoxState {
  message: string;
  voteValue: number;
  selectedUser: any;
  alertMessage: string;
  alertType: string;
  foundVoteUserList: any;
  selectedUserData: any;
  showfoundVoteUserList: boolean;
  userVote: number;
  voteComment: string;
}

export default class SellerVoteBox extends Component<
  SellerVoteBoxProps,
  SellerVoteBoxState
> {
  static getDerivedStateFromProps = (props: any, current_state: any) => {
    if (current_state.foundVoteUserList !== props.foundVoteUserList) {
      return {
        foundVoteUserList: props.foundVoteUserList
      };
    }
    return null;
  };

  constructor(props: SellerVoteBoxProps) {
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

  setSelectedUserData = (
    id: number,
    name: string,
    age: number,
    email: string
  ) => {
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
  };

  componentDidMount = () => {
    //this.setState({ foundVoteUserList: this.props.foundVoteUserList });
  };

  setUserVote = (vote: number) => {
    this.setState({ userVote: vote });
  };

  clearFoundVoteUserList = () => {
    this.setState({ foundVoteUserList: [] });
  };

  closeProduct = (productId: number) => {
    let API_URL = this.props.API_URL;

    let that = this;

    axios
      .post(API_URL + "/api/closeProduct", {
        productId: productId
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.props.changeVoteBox();
          that.props.getProductDetails();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  sendVote = () => {
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
          that.closeProduct(productId);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    const {
      showfoundVoteUserList,
      foundVoteUserList,
      selectedUserData,
      userVote
    } = this.state;
    return (
      <View style={styles.relative}>
        <PageHeader
          boldText={"Wystaw ocenę"}
          normalText={""}
          closeMethod={this.props.changeVoteBox}
          closeMethodParameter={""}
        />

        <View style={styles.sellerVoteBoxContainer}>
          <TextInput
            onChangeText={email => {
              this.clearFoundVoteUserList();
              this.setState({
                showfoundVoteUserList: true
              });
              this.props.searchUsersByEmail(email);
            }}
            placeholder="Szukaj użytkowniki po adresie email..."
            placeholderTextColor="#333"
            style={styles.userMessageTextArea}
          />

          <View style={styles.sellerVoteBoxUserListContainer}>
            {showfoundVoteUserList && foundVoteUserList.length > 0 && (
              <Text
                style={{ paddingTop: 10, paddingBottom: 10, fontWeight: "600" }}
              >
                Znalezione użytkowniczki
              </Text>
            )}
            {showfoundVoteUserList &&
              foundVoteUserList &&
              foundVoteUserList.map((user: any, i: number) => {
                if (user.id != this.props.currentUser.id) {
                  return (
                    <TouchableOpacity
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
                      <View
                        style={styles.sellerVoteBoxUserListSingleUserContainer}
                      >
                        <Image
                          style={styles.sellerVoteBoxUserListSingleUserImage}
                          source={{
                            uri: `${this.props.API_URL}userPhotos/${
                              user.photo_path
                            }`
                          }}
                        />
                        <View
                          style={
                            styles.sellerVoteBoxUserListSingleUserTextContainer
                          }
                        >
                          <Text>
                            {user.name}, {user.age}
                          </Text>
                          <Text>{user.email}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
          </View>

          {selectedUserData.name && (
            <View>
              <Text>
                Oceń współpracę z{" "}
                <Text style={{ fontWeight: "600" }}>
                  {selectedUserData.name}
                </Text>{" "}
                ({selectedUserData.email})
              </Text>

              <View style={styles.sellerVoteBoxVoteContainer}>
                <Text
                  style={
                    userVote === 1
                      ? styles.sellerVoteBoxVoteActive
                      : styles.sellerVoteBoxVote
                  }
                  onPress={() => this.setUserVote(1)}
                >
                  1
                </Text>
                <Text
                  style={
                    userVote === 2
                      ? styles.sellerVoteBoxVoteActive
                      : styles.sellerVoteBoxVote
                  }
                  onPress={() => this.setUserVote(2)}
                >
                  2
                </Text>
                <Text
                  style={
                    userVote === 3
                      ? styles.sellerVoteBoxVoteActive
                      : styles.sellerVoteBoxVote
                  }
                  onPress={() => this.setUserVote(3)}
                >
                  3
                </Text>
                <Text
                  style={
                    userVote === 4
                      ? styles.sellerVoteBoxVoteActive
                      : styles.sellerVoteBoxVote
                  }
                  onPress={() => this.setUserVote(4)}
                >
                  4
                </Text>
                <Text
                  style={
                    userVote === 5
                      ? styles.sellerVoteBoxVoteActive
                      : styles.sellerVoteBoxVote
                  }
                  onPress={() => this.setUserVote(5)}
                >
                  5
                </Text>
              </View>
            </View>
          )}

          {userVote != 0 && (
            <View>
              <Text style={styles.sellerVoteBoxVotePreview}>
                Ocena: <Text style={styles.bold}>{userVote}</Text>
              </Text>

              {userVote === 1 && (
                <Text style={{ paddingBottom: 10 }}>
                  Oceniłaś bardzo źle użytkowniczkę, napisz poniżej czym jest to
                  spowodowane
                </Text>
              )}
              {userVote > 1 && userVote <= 3 && (
                <Text style={{ paddingBottom: 10 }}>
                  Oceniłaś nie najlepiej użytkowniczkę, napisz poniżej czym jest
                  to spowodowane
                </Text>
              )}
              {userVote > 3 && userVote < 5 && (
                <Text style={{ paddingBottom: 10 }}>
                  Oceniłaś dobrze użytkowniczkę, napisz poniżej kilka słów o
                  współpracy przy sprzedaży
                </Text>
              )}
              {userVote === 5 && (
                <Text style={{ paddingBottom: 10 }}>
                  Oceniłaś świetnie użytkowniczkę, napisz poniżej kilka słów o
                  współpracy przy sprzedaży
                </Text>
              )}

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
                style={styles.sellerVoteBoxTextArea}
              />
            </View>
          )}
        </View>
        {userVote != 0 && (
          <TouchableHighlight style={styles.productDetailsBtn}>
            <Button
              title="Wyślij"
              color="#fff"
              onPress={() => this.sendVote()}
            />
          </TouchableHighlight>
        )}
      </View>
    );
  }
}
