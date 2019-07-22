import React, { useContext } from "react";
import { Text } from "react-native";
import { v4 as uuid } from "uuid";
import ListItem from "./../../../Utils/ListItem";
import { GlobalContext } from "./../../../Context/GlobalContext";

const AuctionList = (props: {
  productList: any;
  API_URL: string;
  setSelectedProduct: any;
}): any => {
  const context = useContext(GlobalContext);

  if (props.productList) {
    return props.productList.length > 0 ? (
      props.productList.map((product: any, i: number) => {
        return (
          <ListItem
            API_URL={props.API_URL}
            key={uuid()}
            image={`${product.product_photos[0].path}`}
            mainText={product.name}
            subText={`Kategoria: ${product.categoryName[0].name}`}
            subSubText={`Cena: ${product.price} zł`}
            onPress={() => {
              props.setSelectedProduct(product.id, product.user_id);
            }}
          />
        );
      })
    ) : (
      <Text style={{ paddingLeft: 10 }}>Brak wyników</Text>
    );
  }
};

export default React.memo(AuctionList);
