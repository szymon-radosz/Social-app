import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../../Utils/ButtonComponent";
import InputComponent from "./../../../Utils/InputComponent";
import TextAreaComponent from "./../../../Utils/TextAreaComponent";
import ListItem from "./../../../Utils/ListItem";

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
  searchEmail: string;
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
      voteComment: "",
      searchEmail: ""
    };

    this.clearFoundVoteUserList = this.clearFoundVoteUserList.bind(this);
    this.setSelectedUserData = this.setSelectedUserData.bind(this);
    this.setUserVote = this.setUserVote.bind(this);
    this.setSearchedUserEmail = this.setSearchedUserEmail.bind(this);
  }

  setSearchedUserEmail = (name: string) => {
    this.setState({ searchEmail: name });
  };

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
      voteComment,
      searchEmail
    } = this.state;
    return (
      <View>
        <PageHeader
          boldText={"Wystaw ocenę"}
          normalText={""}
          closeMethod={this.props.changeVoteBox}
          closeMethodParameter={""}
        />
        <View style={styles.sellerVoteBoxUserListContainer}>
          <InputComponent
            placeholder="Szukaj użytkowniczki po adresie email..."
            inputOnChange={(email: string) => {
              this.setSearchedUserEmail(email);
              this.clearFoundVoteUserList();
              this.setState({
                showfoundVoteUserList: true
              });
              this.props.searchUsersByEmail(email);
            }}
            value={searchEmail}
            secureTextEntry={false}
            maxLength={100}
          />
        </View>

        {showfoundVoteUserList && foundVoteUserList.length > 0 && (
          <View style={styles.sellerVoteBoxUserListContainer}>
            <Text
              style={{ paddingTop: 10, paddingBottom: 10, fontWeight: "600" }}
            >
              Znalezione użytkowniczki
            </Text>
          </View>
        )}
        {showfoundVoteUserList &&
          foundVoteUserList &&
          foundVoteUserList.map((user: any, i: number) => {
            if (user.id != this.props.currentUser.id) {
              return (
                <ListItem
                  API_URL={this.props.API_URL}
                  key={`SellerVoteBox-${i}`}
                  image={user.photo_path}
                  mainText={`${user.name}, ${user.age}`}
                  subText={`${user.email}`}
                  subSubText=""
                  onPress={() =>
                    this.setSelectedUserData(
                      user.id,
                      user.name,
                      user.age,
                      user.email
                    )
                  }
                  userHadUnreadedMessages={false}
                />
              );
            }
          })}

        {selectedUserData.name && (
          <View style={styles.sellerVoteBoxUserListContainer}>
            <Text style={styles.sellerVoteBoxText}>
              Oceń współpracę z{" "}
              <Text style={{ fontWeight: "600" }}>{selectedUserData.name}</Text>{" "}
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

            <TextAreaComponent
              placeholder="Napisz komentarz do opinii..."
              inputOnChange={(voteComment: string) => {
                this.setState({
                  voteComment
                });
              }}
              value={voteComment}
              maxLength={500}
              multiline={true}
              numberOfLines={10}
            />
          </View>
        )}

        {userVote != 0 && (
          <ButtonComponent
            pressButtonComponent={() =>
              this.props.sendVote(
                selectedUserData,
                userVote,
                voteComment,
                this.props.product
              )
            }
            buttonComponentText="Wyślij"
            fullWidth={true}
            underlayColor="#dd904d"
          />
        )}
      </View>
    );
  }
}
