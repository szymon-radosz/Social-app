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
  sendVote: any;
}

interface SellerVoteBoxState {
  message: string;
  voteValue: number;
  selectedUser: any;
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
      foundVoteUserList: [],
      selectedUserData: [],
      showfoundVoteUserList: true,
      userVote: 0,
      voteComment: ""
    };

    this.clearFoundVoteUserList = this.clearFoundVoteUserList.bind(this);
    this.setSelectedUserData = this.setSelectedUserData.bind(this);
    this.setUserVote = this.setUserVote.bind(this);
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

  setUserVote = (vote: number) => {
    this.setState({ userVote: vote });
  };

  clearFoundVoteUserList = () => {
    this.setState({ foundVoteUserList: [] });
  };

  render() {
    const {
      showfoundVoteUserList,
      foundVoteUserList,
      selectedUserData,
      userVote,
      voteComment
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
            multiline={true}
            maxLength={100}
            placeholder="Szukaj użytkowniczki po adresie email..."
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
            <View style={styles.sellerVoteBoxUserListContainer}>
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
            <View style={styles.sellerVoteBoxUserListContainer}>
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
                maxLength={500}
                placeholder="Napisz komentarz do opinii..."
                placeholderTextColor="#333"
                style={styles.sellerVoteBoxTextArea}
              />
            </View>
          )}
        </View>
        {userVote != 0 && (
          <TouchableHighlight
            style={styles.productDetailsBtn}
            onPress={() =>
              this.props.sendVote(
                selectedUserData,
                userVote,
                voteComment,
                this.props.product
              )
            }
            underlayColor={"#dd904d"}
          >
            <Text style={styles.peachBtnText}>Wyślij</Text>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}
