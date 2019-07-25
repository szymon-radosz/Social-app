import React, { useState } from "react";
import { View } from "react-native";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../../Utils/ButtonComponent";
import TextAreaComponent from "./../../../Utils/TextAreaComponent";

const ProductMessageBox = (props: any) => {
  const [message, setMessage] = useState("");
  return (
    <React.Fragment>
      <View style={styles.relative}>
        <PageHeader
          boldText={"Pytanie do sprzedającego"}
          normalText={""}
          closeMethod={props.changeShowProductMessageBox}
          closeMethodParameter={""}
        />

        <View style={styles.sellerVoteBoxContainer}>
          <TextAreaComponent
            placeholder="Napisz wiadomość..."
            inputOnChange={(message: string) => setMessage(message)}
            value={message}
            maxLength={500}
            multiline={true}
            numberOfLines={10}
          />
        </View>
        <ButtonComponent
          pressButtonComponent={() => props.sendNewConversationProduct(message)}
          buttonComponentText="Wyślij"
          fullWidth={true}
          underlayColor="#dd904d"
        />
      </View>
    </React.Fragment>
  );
};
export default ProductMessageBox;
