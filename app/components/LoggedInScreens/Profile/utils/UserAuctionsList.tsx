import React from "react";
import ListItem from "./../../../Utils/ListItem";

const UserAuctionsList = (props: any): any => {
  return props.userAuctionList.map((product: any, i: number) => {
    return (
      <ListItem
        API_URL={props.API_URL}
        key={`UserAuctionsList-${i}`}
        image={`${product.product_photos[0].path}`}
        mainText={product.name}
        subText={`Kategoria: ${product.categoryName[0].name}`}
        subSubText={`Cena: ${product.price} zł`}
        onPress={() => {
          props.setOpenAuctions(product.id, product.user_id);
        }}
        userHadUnreadedMessages={false}
      />
    );
  });
};
export default UserAuctionsList;
