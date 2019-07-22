import React, { Component, Suspense } from "react";
import {
  TouchableHighlight,
  ImageBackground,
  Image,
  Text,
  View
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { btnFullWidthFilledContainer } from "./../../../assets/global/globalStyles";
import axios from "axios";
import styles from "./style";
import AuctionList from "./utils/AuctionList";
import { GlobalContext } from "./../../Context/GlobalContext";
import ButtonComponent from "./../../Utils/ButtonComponent";
const loaderImage: any = require("./../../../assets/images/loader.gif");

const auctionsBg: any = require("./../../../assets/images/auctionsBgMin.jpg");

const ProductDetails = React.lazy(() => import("./utils/ProductDetails"));
const AddNewProductBox = React.lazy(() => import("./utils/AddNewProductBox"));
const FilterModal = React.lazy(() =>
  import("./../SharedComponents/FilterModal")
);
const ActiveFilters = React.lazy(() =>
  import("./../SharedComponents/ActiveFilters")
);

interface AuctionsProps {
  openMessages: any;
  openAuctionId: number;
  openAuctionUserId: number;
}

interface AuctionsState {
  productList: any;
  displayProductDetails: boolean;
  displayNewProductBox: boolean;
  selectedProductId: number;
  selectedProductUserId: number;
  filterDistance: string;
  filterPrice: string;
  filterStatus: string;
  showFilterModal: boolean;
  filterOptions: any;
  filterModalName: string;
  filterData: any;
  loader: boolean;
}

class Auctions extends Component<AuctionsProps, AuctionsState> {
  constructor(props: AuctionsProps) {
    super(props);
    this.state = {
      productList: [],
      displayProductDetails: false,
      displayNewProductBox: false,
      selectedProductId: 0,
      selectedProductUserId: 0,
      filterDistance: "",
      filterPrice: "",
      filterStatus: "",
      showFilterModal: false,
      filterModalName: "",
      loader: false,
      filterData: {
        distance: [
          { text: "1km" },
          { text: "2km" },
          { text: "5km" },
          { text: "10km" },
          { text: "50km" },
          { text: "100km" }
        ],
        price: [
          { text: "0-20zł" },
          { text: "21zł-50zł" },
          { text: "51zł-100zł" },
          { text: "100zł-200zł" },
          { text: "201zł +" }
        ],
        status: [{ text: "Nowe" }, { text: "Używane" }]
      },
      filterOptions: [
        {
          title: "Odległość",
          index: 0
        },
        {
          title: "Cena",
          index: 1
        },
        {
          title: "Status",
          index: 2
        }
      ]
    };

    this.getProducts = this.getProducts.bind(this);
    this.setSelectedProduct = this.setSelectedProduct.bind(this);
    this.changeDisplayNewProductBox = this.changeDisplayNewProductBox.bind(
      this
    );
    this.setDisplayProductDetails = this.setDisplayProductDetails.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.addNewProduct = this.addNewProduct.bind(this);
    this.setLoader = this.setLoader.bind(this);
  }

  setLoader = (param: boolean) => {
    this.setState({ loader: param });
  };

  addNewProduct = async (
    photos: any,
    maleGender: boolean,
    femaleGender: boolean,
    newProduct: boolean,
    secondHandProduct: boolean,
    currentUser: any,
    name: string,
    description: string,
    selectedCategoryId: any,
    price: number
  ) => {
    console.log([
      photos,
      maleGender,
      femaleGender,
      newProduct,
      secondHandProduct,
      currentUser,
      name,
      description,
      selectedCategoryId,
      price
    ]);
    let childGender;
    let productState;
    let API_URL = this.context.API_URL;

    let photosArray = "[" + '"' + photos.join('","') + '"' + "]";

    if (maleGender) {
      childGender = "boy";
    } else if (femaleGender) {
      childGender = "girl";
    }

    if (newProduct) {
      productState = 0;
    } else if (secondHandProduct) {
      productState = 1;
    }

    if (
      !photos ||
      !maleGender ||
      !femaleGender ||
      !newProduct ||
      !secondHandProduct ||
      !currentUser ||
      !name ||
      !description ||
      !selectedCategoryId ||
      !price
    ) {
      this.context.setAlert(
        true,
        "danger",
        "Upewnij się, że wprowadziłaś wszystkie dane i dodałaś co najmniej 1 zdjęcie."
      );
    }

    if (
      currentUser.id &&
      name &&
      description &&
      selectedCategoryId &&
      price &&
      currentUser.lattitude &&
      currentUser.longitude &&
      photosArray
    ) {
      let that = this;

      console.log(["photosArray", photosArray]);

      that.setLoader(true);

      let json = await axios
        .post(API_URL + "/api/saveProduct", {
          userId: currentUser.id,
          name: name,
          description: description,
          categoryId: selectedCategoryId,
          childGender: childGender,
          price: price,
          lat: currentUser.lattitude,
          lng: currentUser.longitude,
          status: 0,
          state: productState,
          photos: photosArray
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            that.changeDisplayNewProductBox();

            that.context.setAlert(
              true,
              "success",
              "Dziękujemy za dodanie nowego produktu."
            );

            that.setLoader(false);
          }
        })
        .catch(function(error) {
          console.log(error);

          that.context.setAlert(
            true,
            "danger",
            "Problem z dodaniem nowego produktu."
          );

          that.setLoader(false);
        });

      return json;
    }
  };

  removeFilter = (filterName: string): void => {
    const { filterDistance, filterPrice, filterStatus } = this.state;

    if (filterName === "Odległość") {
      this.getFilteredAuctionsList("", filterPrice, filterStatus, false);
    } else if (filterName === "Cena") {
      this.getFilteredAuctionsList(filterDistance, "", filterStatus, false);
    } else if (filterName === "Status") {
      this.getFilteredAuctionsList(filterDistance, filterPrice, "", false);
    }
  };

  filterResults = (filterName: string, filterValue: string): void => {
    const { filterDistance, filterPrice, filterStatus } = this.state;
    if (filterName === "Odległość") {
      this.getFilteredAuctionsList(
        filterValue,
        filterPrice,
        filterStatus,
        true
      );
    } else if (filterName === "Cena") {
      this.getFilteredAuctionsList(
        filterDistance,
        filterValue,
        filterStatus,
        true
      );
    } else if (filterName === "Status") {
      this.getFilteredAuctionsList(
        filterDistance,
        filterPrice,
        filterValue,
        true
      );
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
    price: string,
    status: string,
    showFilterModal: boolean
  ): void => {
    let API_URL = this.context.API_URL;
    let userLat = this.context.userData.lattitude;
    let userLng = this.context.userData.longitude;

    let that = this;

    if (distance || price || status) {
      axios
        .post(API_URL + "/api/loadProductsFilter", {
          distance: distance,
          price: price,
          status: status,
          currentUserLat: userLat,
          currentUserLng: userLng
        })
        .then(function(response) {
          if (response.data.status === "OK") {
            let newDistance = "";
            let newPrice = "";
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
                  resultParameter.name === "price" &&
                  resultParameter.default === false
                ) {
                  newPrice = resultParameter.value;
                } else if (
                  resultParameter.name === "status" &&
                  resultParameter.default === false
                ) {
                  newStatus = resultParameter.value;
                }
              }
            );

            if (showFilterModal) {
              that.setState({
                productList: response.data.result,
                filterDistance: newDistance,
                filterPrice: newPrice,
                filterStatus: newStatus,
                showFilterModal: !that.state.showFilterModal
              });
            } else {
              that.setState({
                productList: response.data.result,
                filterDistance: newDistance,
                filterPrice: newPrice,
                filterStatus: newStatus
              });
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      this.getProducts();
    }
  };

  changeDisplayNewProductBox = (): void => {
    this.setState({ displayNewProductBox: !this.state.displayNewProductBox });
    this.getProducts();
  };

  getProducts = (): void => {
    let API_URL = this.context.API_URL;
    let userLat = this.context.userData.lattitude;
    let userLng = this.context.userData.longitude;

    let that = this;

    axios
      .post(API_URL + "/api/loadProductBasedOnCoords", {
        lat: userLat,
        lng: userLng
      })
      .then(function(response) {
        if (response.data.status === "OK") {
          that.setState({
            productList: response.data.result,
            filterDistance: "",
            filterPrice: "",
            filterStatus: ""
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  setDisplayProductDetails = (): void => {
    this.setState(prevState => ({
      displayProductDetails: !prevState.displayProductDetails
    }));
  };

  setSelectedProduct = (id: number, productUserId: number) => {
    this.setState({
      selectedProductId: id,
      displayProductDetails: true,
      selectedProductUserId: productUserId
    });
  };

  componentDidMount = (): void => {
    if (this.context.userData) {
      //load all products based on user coords
      this.getProducts();

      if (
        this.props.openAuctionId &&
        this.props.openAuctionId !== 0 &&
        this.props.openAuctionUserId &&
        this.props.openAuctionUserId !== 0
      ) {
        this.setSelectedProduct(
          this.props.openAuctionId,
          this.props.openAuctionUserId
        );
      }
    }
  };

  render() {
    const {
      displayProductDetails,
      selectedProductUserId,
      displayNewProductBox,
      productList,
      selectedProductId,
      showFilterModal,
      filterOptions,
      filterData,
      filterModalName,
      filterDistance,
      filterPrice,
      filterStatus,
      loader
    } = this.state;
    return (
      <React.Fragment>
        {loader ? (
          <View style={styles.loaderContainer}>
            <Image style={{ width: 100, height: 100 }} source={loaderImage} />
          </View>
        ) : (
          <View>
            {!displayProductDetails &&
              !displayNewProductBox &&
              !showFilterModal && (
                <ImageBackground source={auctionsBg} style={{ width: "100%" }}>
                  <Text style={styles.pageTitle}>Sprzedawaj i{"\n"}kupuj</Text>
                </ImageBackground>
              )}

            {!displayProductDetails &&
              !displayNewProductBox &&
              productList &&
              showFilterModal && (
                <Suspense fallback={<Text>Wczytywanie...</Text>}>
                  <FilterModal
                    filterOptions={filterData}
                    closeFilter={this.setShowFilterModal}
                    filterModalName={filterModalName}
                    filterResults={this.filterResults}
                  />
                </Suspense>
              )}

            {!displayProductDetails &&
              !displayNewProductBox &&
              productList &&
              !showFilterModal && (
                <View>
                  <Text style={styles.filterResultsHeaderText}>
                    Filtruj wyniki
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

            {!displayProductDetails && !displayNewProductBox && (
              <Suspense fallback={<Text>Wczytywanie...</Text>}>
                <ActiveFilters
                  filterDistance={filterDistance}
                  filterPrice={filterPrice}
                  filterStatus={filterStatus}
                  showFilterModal={showFilterModal}
                  removeFilter={this.removeFilter}
                />
              </Suspense>
            )}

            {!displayProductDetails &&
              !displayNewProductBox &&
              !showFilterModal && (
                <View>
                  <AuctionList
                    API_URL={this.context.API_URL}
                    productList={productList}
                    setSelectedProduct={this.setSelectedProduct}
                  />

                  <View style={{ marginBottom: 10 }}>
                    <ButtonComponent
                      pressButtonComponent={this.changeDisplayNewProductBox}
                      buttonComponentText="Dodaj produkt"
                      fullWidth={true}
                      underlayColor="#dd904d"
                    />
                  </View>
                </View>
              )}

            {displayProductDetails && !showFilterModal && (
              <Suspense fallback={<Text>Wczytywanie...</Text>}>
                <ProductDetails
                  currentUser={this.context.userData}
                  API_URL={this.context.API_URL}
                  openMessages={this.props.openMessages}
                  productId={selectedProductId}
                  productUserId={selectedProductUserId}
                  setDisplayProductDetails={this.setDisplayProductDetails}
                />
              </Suspense>
            )}

            {displayNewProductBox && !showFilterModal && (
              <Suspense fallback={<Text>Wczytywanie...</Text>}>
                <AddNewProductBox
                  currentUser={this.context.userData}
                  API_URL={this.context.API_URL}
                  changeDisplayNewProductBox={this.changeDisplayNewProductBox}
                  addNewProduct={this.addNewProduct}
                />
              </Suspense>
            )}
          </View>
        )}
      </React.Fragment>
    );
  }
}
Auctions.contextType = GlobalContext;
export default Auctions;
