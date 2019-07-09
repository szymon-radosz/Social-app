import React, { useState } from "react";
import { TextInput, Text, View, TouchableHighlight } from "react-native";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";

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
          <TextInput
            multiline={true}
            numberOfLines={10}
            maxLength={500}
            onChangeText={message => setMessage(message)}
            value={message}
            placeholder="Napisz wiadomość..."
            placeholderTextColor="#333"
            style={styles.userProductMessageTextArea}
          />
          <TouchableHighlight
            style={styles.productDetailsBtn}
            onPress={() => props.sendNewConversationProduct(message)}
            underlayColor={"#dd904d"}
          >
            <Text style={styles.peachBtnText}>Wyślij</Text>
          </TouchableHighlight>
        </View>
      </View>
    </React.Fragment>
  );
};
export default ProductMessageBox;
