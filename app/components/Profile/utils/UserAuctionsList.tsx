import React, { Component } from "react";
import ListItem from "./../../Utils/ListItem";
import { GlobalContext } from "./../../../Context/GlobalContext";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import Alert from "./../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import PageHeader from "./../../SharedComponents/PageHeader";

interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}

interface UserFriendsListState {
  userAuctionList: any;
}

interface UserFriendsListProps {
  navigation: any;
}

class UserFriendsList extends Component<
  UserFriendsListProps,
  UserFriendsListState,
  NavigationScreenInterface
> {
  constructor(props: UserFriendsListProps) {
    super(props);
    this.state = {
      userAuctionList: []
    };

    this.getUserAuctionList = this.getUserAuctionList.bind(this);
  }

  componentDidMount = () => {
    this.getUserAuctionList();
  };

  getUserAuctionList = (): void => {
    let that = this;

    axios
      .post(this.context.API_URL + "/api/loadUserProductList", {
        userId: this.context.userData.id
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({
            userAuctionList: response.data.result
          });
        }
      })
      .catch(function(error) {
        that.context.setAlert(
          true,
          "danger",
          "Wystąpił błąd z wyświetleniem listy przedmiotów."
        );
      });
  };

  render() {
    const { userAuctionList } = this.state;
    return (
      <React.Fragment>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff"
          }}
        >
          {this.context.showAlert && (
            <Alert
              alertType={this.context.alertType}
              alertMessage={this.context.alertMessage}
              closeAlert={this.context.closeAlert}
            />
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
            data-test="ProfileContainer"
          >
            <ScrollView>
              <PageHeader
                boldText={"Wystawione przedmioty"}
                normalText={""}
                closeMethod={() => this.props.navigation.goBack(null)}
                closeMethodParameter={""}
              />

              {userAuctionList.map((product: any, i: number) => {
                return (
                  <ListItem
                    API_URL={this.context.API_URL}
                    key={`UserAuctionsList-${i}`}
                    image={`${product.product_photos[0].path}`}
                    mainText={product.name}
                    subText={`Kategoria: ${product.categoryName[0].name}`}
                    subSubText={`Cena: ${product.price} zł`}
                    onPress={() => {
                      this.props.navigation.navigate("ProductDetails", {
                        productId: product.id,
                        authorId: product.user_id
                      });
                    }}
                    userHadUnreadedMessages={false}
                  />
                );
              })}
            </ScrollView>
            <BottomPanel
              data-test="BottomPanel"
              navigation={this.props.navigation}
            />
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
UserFriendsList.contextType = GlobalContext;
export default UserFriendsList;
