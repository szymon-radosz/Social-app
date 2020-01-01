import React, { Component } from "react";
import ListItem from "./../../Utils/ListItem";
import { GlobalContext } from "./../../../Context/GlobalContext";
import axios from "axios";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import Alert from "./../../Alert/Alert";
import BottomPanel from "./../../SharedComponents/BottomPanel";
import PageHeader from "./../../SharedComponents/PageHeader";
import styles from "./../style";
import lang from "./../../../assets/lang/Profile/utils/UserAuctionsList";

const loaderImage: any = require("./../../../assets/images/loader.gif");

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
  }

  componentDidMount = () => {
    this.getUserAuctionList();
  };

  getUserAuctionList = (): void => {
    this.context.setShowLoader(true);

    axios
      .post(this.context.API_URL + "/api/loadUserProductList", {
        userId: this.context.userData.id
      })
      .then(async response => {
        if (response.data.status === "OK") {
          await this.setState({
            userAuctionList: response.data.result
          });

          await this.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        await this.context.setAlert(true, "danger", lang.itemsListError["en"]);

        await this.context.setShowLoader(false);
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
            {this.context.showLoader ? (
              <View style={styles.loaderContainer} data-test="loader">
                <Image
                  style={{ width: 100, height: 100 }}
                  source={loaderImage}
                />
              </View>
            ) : (
              <React.Fragment>
                <ScrollView>
                  <PageHeader
                    boldText={"Wystawione przedmioty"}
                    normalText={""}
                    closeMethod={() => this.props.navigation.goBack(null)}
                    closeMethodParameter={""}
                  />
                  <View style={{ marginTop: 15, marginBottom: 15 }}>
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
                            this.props.navigation.push("ProductDetails", {
                              productId: product.id,
                              authorId: product.user_id
                            });
                          }}
                          userHadUnreadedMessages={false}
                        />
                      );
                    })}
                  </View>
                </ScrollView>
                <BottomPanel
                  data-test="BottomPanel"
                  navigation={this.props.navigation}
                />
              </React.Fragment>
            )}
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
UserFriendsList.contextType = GlobalContext;
export default UserFriendsList;
