import React from "react";
import { Text } from "react-native";
import ListItem from "./../../Utils/ListItem";
import lang from "./../../../assets/lang/Auctions/utils/AuctionList";

const AuctionList = (props: {
  productList: any;
  API_URL: string;
  navigation: any;
}): any => {
  if (props.productList) {
    return props.productList.length > 0 ? (
      props.productList.map((product: any, i: number) => {
        return (
          <ListItem
            API_URL={props.API_URL}
            key={`ListItem-${i}`}
            image={`${product.product_photos[0].path}`}
            mainText={product.name}
            subText={`${lang.category["en"]} ${product.categoryName[0].name}`}
            subSubText={``}
            onPress={() => {
              props.navigation.push("ProductDetails", {
                productId: product.id,
                authorId: product.user_id
              });
            }}
            userHadUnreadedMessages={false}
          />
        );
      })
    ) : (
      <Text style={{ paddingLeft: 10 }}>{lang.noResults["en"]}</Text>
    );
  }
};

export default React.memo(AuctionList);
