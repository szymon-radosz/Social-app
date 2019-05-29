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
import Alert from "./../../../../Alert/Alert";
import { v4 as uuid } from "uuid";

interface ProductVoteBoxProps {
  foundVoteUserList: any;
  API_URL: string;
  changeVoteBox: any;
  getProductDetails: any;
  searchUsersByName: any;
  currentUser: {
    id: number;
  };
  product: {
    id: number;
  };
}

interface ProductVoteBoxState {
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

export default class ProductVoteBox extends Component<
  ProductVoteBoxProps,
  ProductVoteBoxState
> {
  static getDerivedStateFromProps = (props: any, current_state: any) => {
    if (current_state.foundVoteUserList !== props.foundVoteUserList) {
      console.log("derivered ProductVoteBox");
      return {
        foundVoteUserList: props.foundVoteUserList
      };
    }
    return null;
  };

  constructor(props: ProductVoteBoxProps) {
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

    console.log(this.state.selectedUserData);
  };

  componentDidMount = () => {
    this.setState({ foundVoteUserList: this.props.foundVoteUserList });
  };

  setUserVote = (vote: number) => {
    this.setState({ userVote: vote });

    console.log(["setuservote", this.state.userVote]);
  };

  clearFoundVoteUserList = () => {
    this.setState({ foundVoteUserList: [] });
  };

  closeProduct = (productId: number) => {
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
  };

  sendVote = () => {
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
  };
  render() {
    const {
      showfoundVoteUserList,
      alertType,
      alertMessage,
      foundVoteUserList,
      selectedUserData,
      userVote
    } = this.state;
    return (
      <View style={styles.relative}>
        <TouchableHighlight style={styles.buttonCloseModal}>
          <Button
            title="<"
            color="#fff"
            onPress={() => this.props.changeVoteBox()}
          />
        </TouchableHighlight>
        <View style={styles.userDetailsHeader}>
          <Text style={styles.userMessageHeader}>Wystaw ocenę kupującemu</Text>
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

        <View style={{ padding: 10 }}>
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
                      style={{
                        width: "100%",
                        borderWidth: 1,
                        borderRadius: 6,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        padding: 10,
                        marginBottom: 5
                      }}
                    >
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={{
                          uri: `${this.props.API_URL}userPhotos/${
                            user.photo_path
                          }`
                        }}
                      />
                      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
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
          <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
            <Text>
              Oceń współpracę z {selectedUserData.name} (
              {selectedUserData.email})
            </Text>

            <View
              style={{
                width: "100%",
                marginTop: 10,
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  marginRight: 5,
                  borderWidth: 1,
                  borderRadius: 6
                }}
                onPress={() => this.setUserVote(1)}
              >
                1
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  marginRight: 5,
                  borderWidth: 1,
                  borderRadius: 6
                }}
                onPress={() => this.setUserVote(2)}
              >
                2
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  marginRight: 5,
                  borderWidth: 1,
                  borderRadius: 6
                }}
                onPress={() => this.setUserVote(3)}
              >
                3
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  marginRight: 5,
                  borderWidth: 1,
                  borderRadius: 6
                }}
                onPress={() => this.setUserVote(4)}
              >
                4
              </Text>
              <Text
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 15,
                  paddingRight: 15,
                  marginRight: 5,
                  borderWidth: 1,
                  borderRadius: 6
                }}
                onPress={() => this.setUserVote(5)}
              >
                5
              </Text>
            </View>
          </View>
        )}

        {userVote != 0 && (
          <View>
            <Text
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 20,
                paddingBottom: 10
              }}
            >
              Twoja ocena: {userVote}
            </Text>

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

            <TouchableHighlight style={styles.productDetailsBtn}>
              <Button
                title="Wyślij"
                color="#fff"
                onPress={() => this.sendVote()}
              />
            </TouchableHighlight>
          </View>
        )}
        {alertMessage != "" && (
          <Alert alertType={alertType} alertMessage={alertMessage} />
        )}
      </View>
    );
  }
}
