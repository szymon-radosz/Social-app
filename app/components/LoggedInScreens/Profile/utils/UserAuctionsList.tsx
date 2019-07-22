import React from "react";
import { v4 as uuid } from "uuid";
import ListItem from "./../../../Utils/ListItem";

const UserAuctionsList = (props: any): any => {
  props.userAuctionList &&
    props.userAuctionList.map((product: any, i: number) => {
      return (
        <ListItem
          API_URL={props.API_URL}
          key={uuid()}
          image={`${product.product_photos[0].path}`}
          mainText={product.name}
          subText={`Kategoria: ${product.categoryName[0].name}`}
          subSubText={`Cena: ${product.price} zł`}
          onPress={() => {
            props.setOpenAuctions(props.product.id, props.product.user_id);
          }}
        />
      );
    });
};
export default UserAuctionsList;
