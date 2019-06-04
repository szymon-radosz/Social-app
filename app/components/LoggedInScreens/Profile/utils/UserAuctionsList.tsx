import React from "react";
import SingleUserAuctionList from "./SingleUserAuctionList";

const UserAuctionsList = (props: any) =>
  props.userAuctionList.map((product: any, i: number) => {
    console.log(product);
    return (
      <SingleUserAuctionList
        product={product}
        API_URL={props.API_URL}
        setOpenAuctions={props.setOpenAuctions}
      />
    );
  });

export default UserAuctionsList;
