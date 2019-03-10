import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Button,
  Image,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import axios from "axios";

export default class UserOnList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserDetails: false
    };

    this.changeShowUserDetails = this.changeShowUserDetails.bind(this);
  }

  changeShowUserDetails() {
    this.setState({ showUserDetails: !this.state.showUserDetails });
  }

  render() {
    if (this.state.showUserDetails) {
      return (
        <View>
          <Button title="X" onPress={() => this.changeShowUserDetails()} />
          <View>
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri: `${this.props.API_URL}userPhotos/${
                  this.props.user.photo_path
                }`
              }}
            />
            <Text>
              {this.props.user.name}, {this.props.user.age}
            </Text>
            {this.props.user.kids.length > 0 && <Text>Dziecko/Dzieci: </Text>}
            {this.props.user.kids.length > 0 &&
              this.props.user.kids.map(kid => {
                return (
                  <Text>
                    {kid.name} - {kid.date_of_birth}
                  </Text>
                );
              })}
            {this.props.user.hobbies.length > 0 && <Text>Hobby: </Text>}
            {this.props.user.hobbies.length > 0 &&
              this.props.user.hobbies.map(hobby => {
                return <Text>{hobby.name} </Text>;
              })}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.userContainer}>
          <Image
            style={styles.userListImage}
            source={{
              uri: `${this.props.API_URL}userPhotos/${
                this.props.user.photo_path
              }`
            }}
          />
          <Text style={styles.userListText}>
            {this.props.user.name}, {this.props.user.age}
          </Text>
          <TouchableHighlight style={styles.showUserDetails}>
            <Button
              title="Podgląd"
              color="#fff"
              onPress={() => this.changeShowUserDetails()}
            />
          </TouchableHighlight>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  userListImage: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  userListText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    fontWeight: "400"
  },
  userContainer: {
    borderRadius: 5,
    borderColor: "#e07b8d",
    borderWidth: 1,
    padding: 5
  },
  showUserDetails: {
    height: 35,
    width: 100,
    marginTop: 10,
    borderRadius: 30,
    borderColor: "#e07b8d",
    borderWidth: 2,
    backgroundColor: "#e07b8d",
    marginBottom: 10
  }
});
