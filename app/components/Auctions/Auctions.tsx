import React, { Component, Suspense } from "react";
import {
  TouchableHighlight,
  ImageBackground,
  Image,
  Text,
  View,
  SafeAreaView
} from "react-native";
//@ts-ignore
import Carousel from "react-native-snap-carousel";
import { btnFullWidthFilledContainer } from "./../../assets/global/globalStyles";
import axios from "axios";
import styles from "./style";
import AuctionList from "./utils/AuctionList";
import { GlobalContext } from "./../../Context/GlobalContext";
import ButtonComponent from "./../Utils/ButtonComponent";
import Alert from "./../Alert/Alert";
import BottomPanel from "./../SharedComponents/BottomPanel";
import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import lang from "./../../assets/lang/Auctions/Auctions";

const loaderImage: any = require("./../../assets/images/loader.gif");
const auctionsBg: any = require("./../../assets/images/auctionsBgMin.jpg");

const FilterModal = React.lazy(() =>
  import("./../SharedComponents/FilterModal")
);
const ActiveFilters = React.lazy(() =>
  import("./../SharedComponents/ActiveFilters")
);

interface AuctionsProps {
  openAuctionId: number;
  openAuctionUserId: number;
  navigation: any;
}

interface AuctionsState {
  productList: any;
  showFilterAuctionActivityPanel: boolean;
  displayActiveAuction: boolean;
  displayProductDetails: boolean;
  selectedProductId: number;
  selectedProductUserId: number;
  filterDistance: string;
  filterStatus: string;
  showFilterModal: boolean;
  filterOptions: any;
  filterModalName: string;
  filterData: any;
}

class Auctions extends Component<AuctionsProps, AuctionsState> {
  constructor(props: AuctionsProps) {
    super(props);
    this.state = {
      productList: [],
      showFilterAuctionActivityPanel: false,
      displayActiveAuction: false,
      displayProductDetails: false,
      selectedProductId: 0,
      selectedProductUserId: 0,
      filterDistance: "",
      filterStatus: "",
      showFilterModal: false,
      filterModalName: "",
      filterData: {
        distance: [
          { text: "1km" },
          { text: "2km" },
          { text: "5km" },
          { text: "10km" },
          { text: "50km" },
          { text: "100km" }
        ],
        status: [{ text: "Nowe" }, { text: "Używane" }]
      },
      filterOptions: [
        {
          title: "Odległość",
          index: 0
        },
        {
          title: "Status",
          index: 2
        }
      ]
    };
  }

  removeFilter = (filterName: string): void => {
    const { filterDistance, filterStatus } = this.state;

    if (filterName === "Odległość") {
      this.getFilteredAuctionsList("", filterStatus, false);
    } else if (filterName === "Cena") {
      this.getFilteredAuctionsList(filterDistance, filterStatus, false);
    } else if (filterName === "Status") {
      this.getFilteredAuctionsList(filterDistance, "", false);
    }
  };

  filterResults = (filterName: string, filterValue: string): void => {
    const { filterDistance, filterStatus } = this.state;
    if (filterName === "Odległość") {
      this.getFilteredAuctionsList(filterValue, filterStatus, true);
    } else if (filterName === "Status") {
      this.getFilteredAuctionsList(filterDistance, filterValue, true);
    }
  };

  setShowFilterModal = (selectedName = ""): void => {
    if (selectedName !== "") {
      this.setState({
        showFilterModal: !this.state.showFilterModal,
        filterModalName: selectedName
      });
    } else {
      this.setState({ showFilterModal: !this.state.showFilterModal });
    }
  };

  renderItem(item: any, index: any) {
    return (
      <TouchableHighlight
        style={btnFullWidthFilledContainer}
        onPress={() => this.setShowFilterModal(item.item.title)}
        underlayColor={"#dd904d"}
      >
        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            lineHeight: 30,
            color: "#fff"
          }}
        >
          {item.item.title}
        </Text>
      </TouchableHighlight>
    );
  }

  getFilteredAuctionsList = (
    distance: string,
    status: string,
    showFilterModal: boolean
  ): void => {
    //console.log(["getFilteredAuctionsList", this.state.displayActiveAuction]);
    let API_URL = this.context.API_URL;
    let userLat = this.context.userData.lattitude;
    let userLng = this.context.userData.longitude;

    this.context.setShowLoader(true);

    if (distance || status) {
      axios
        .post(API_URL + "/api/loadProductsFilter", {
          distance: distance,
          status: status,
          currentUserLat: userLat,
          currentUserLng: userLng,
          active: this.state.displayActiveAuction
        })
        .then(async response => {
          if (response.data.status === "OK") {
            let newDistance = "";
            let newStatus = "";

            response.data.resultParameters.map(
              (resultParameter: any, i: number) => {
                //resultParameter.default means we get that parameter to loadUsersFilter
                if (
                  resultParameter.name === "distance" &&
                  resultParameter.default === false
                ) {
                  newDistance = resultParameter.value;
                } else if (
                  resultParameter.name === "status" &&
                  resultParameter.default === false
                ) {
                  newStatus = resultParameter.value;
                }
              }
            );

            if (showFilterModal) {
              await this.setState({
                productList: response.data.result,
                filterDistance: newDistance,
                filterStatus: newStatus,
                showFilterModal: !this.state.showFilterModal
              });

              await this.context.setShowLoader(false);
            } else {
              await this.setState({
                productList: response.data.result,
                filterDistance: newDistance,
                filterStatus: newStatus
              });

              await this.context.setShowLoader(false);
            }
          }
        })
        .catch(async error => {
          //console.log(error);
          await this.context.setShowLoader(false);
        });
    } else {
      this.getActiveProducts();
    }
  };

  getActiveProducts = (): void => {
    let API_URL = this.context.API_URL;
    let userLat = this.context.userData.lattitude;
    let userLng = this.context.userData.longitude;

    this.context.setShowLoader(true);

    axios
      .post(API_URL + "/api/loadActiveProductBasedOnCoords", {
        lat: userLat,
        lng: userLng
      })
      .then(async response => {
        if (response.data.status === "OK") {
          await this.setState({
            productList: response.data.result,
            displayActiveAuction: true,
            filterDistance: "",
            filterStatus: ""
          });

          await this.context.setShowLoader(false);
        }
      })
      .catch(async error => {
        //console.log(error);

        await this.context.setShowLoader(false);
      });
  };

  componentDidMount = (): void => {
    /*if (this.context.userData) {
      //load all products based on user coords
      this.getActiveProducts();
    }*/

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
      //console.log("Focus listener mount auctions");

      this.context.setCurrentNavName("TARG");

      this.getActiveProducts();
    });
  };

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    const {
      displayProductDetails,
      productList,
      showFilterModal,
      filterOptions,
      filterData,
      filterModalName,
      filterDistance,
      filterStatus
    } = this.state;
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
            data-test="Auctions"
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
                  {this.context.showLoader ? (
                    <View style={styles.loaderContainer} data-test="loader">
                      <Image
                        style={{ width: 100, height: 100 }}
                        source={loaderImage}
                      />
                    </View>
                  ) : (
                    <View data-test="Auctions">
                      {!displayProductDetails && !showFilterModal && (
                        <ImageBackground
                          source={auctionsBg}
                          style={{ width: "100%" }}
                        >
                          <Text style={styles.pageTitle}>
                            {lang.header["en"]}
                          </Text>
                        </ImageBackground>
                      )}

                      {!displayProductDetails &&
                        productList &&
                        showFilterModal && (
                          <Suspense
                            fallback={<Text>{lang.loading["en"]}</Text>}
                          >
                            <FilterModal
                              filterOptions={filterData}
                              closeFilter={this.setShowFilterModal}
                              filterModalName={filterModalName}
                              filterResults={this.filterResults}
                              data-test="FilterModal"
                            />
                          </Suspense>
                        )}

                      {!displayProductDetails &&
                        productList &&
                        !showFilterModal && (
                          <View data-test="Carousel">
                            <Text style={styles.filterResultsHeaderText}>
                              {lang.filterHeader["en"]}
                            </Text>
                            <View style={styles.filterResultsCarousel}>
                              <Carousel
                                layout={"default"}
                                activeSlideAlignment={"start"}
                                data={filterOptions}
                                renderItem={this.renderItem}
                                itemWidth={100}
                                sliderWidth={styles.fullWidth}
                                removeClippedSubviews={false}
                              />
                            </View>
                          </View>
                        )}

                      {!displayProductDetails && (
                        <Suspense fallback={<Text>{lang.loading["en"]}</Text>}>
                          <ActiveFilters
                            filterDistance={filterDistance}
                            filterStatus={filterStatus}
                            showFilterModal={showFilterModal}
                            removeFilter={this.removeFilter}
                            data-test="ActiveFilters"
                          />
                        </Suspense>
                      )}

                      {!displayProductDetails && !showFilterModal && (
                        <View>
                          <AuctionList
                            API_URL={this.context.API_URL}
                            productList={productList}
                            navigation={this.props.navigation}
                            data-test="AuctionList"
                          />

                          <View style={{ marginBottom: 10 }}>
                            <ButtonComponent
                              pressButtonComponent={() =>
                                this.props.navigation.navigate(
                                  "AddNewProduct",
                                  {}
                                )
                              }
                              buttonComponentText={lang.addNewProduct["en"]}
                              fullWidth={true}
                              underlayColor="#dd904d"
                              data-test="ButtonComponent"
                              whiteBg={false}
                              showBackIcon={false}
                            />
                          </View>
                        </View>
                      )}
                    </View>
                  )}
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
Auctions.contextType = GlobalContext;
export default withNavigation(Auctions);
