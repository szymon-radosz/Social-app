import React from "react";
import SingleUserAuctionList from "./SingleUserAuctionList";
import { v4 as uuid } from "uuid";

const UserAuctionsList = (props: any) =>
  props.userAuctionList.map((product: any, i: number) => {
    return (
      <SingleUserAuctionList
        product={product}
        API_URL={props.API_URL}
        key={uuid()}
        setOpenAuctions={props.setOpenAuctions}
      />
    );
  });

export default UserAuctionsList;
