import React, { Component } from "react";
import { View } from "react-native";
import styles from "./../style";
import PageHeader from "./../../SharedComponents/PageHeader";
import ButtonComponent from "./../../Utils/ButtonComponent";
import TextAreaComponent from "./../../Utils/TextAreaComponent";

interface ProductMessageBoxProps {
  sendNewConversationProduct: any;
  changeShowProductMessageBox: any;
}

interface ProductMessageBoxState {
  message: string;
}

class ProductMessageBox extends Component<
  ProductMessageBoxProps,
  ProductMessageBoxState
> {
  constructor(props: ProductMessageBoxProps) {
    super(props);
    this.state = {
      message: ""
    };

    this.setMessage = this.setMessage.bind(this);
  }

  setMessage = (message: string) => {
    this.setState({ message: message });
  };

  render() {
    const { message } = this.state;

    return (
      <React.Fragment>
        <View style={styles.relative}>
          <PageHeader
            boldText={"Pytanie do sprzedającego"}
            normalText={""}
            closeMethod={this.props.changeShowProductMessageBox}
            closeMethodParameter={""}
          />

          <View style={styles.sellerVoteBoxContainer}>
            <TextAreaComponent
              placeholder="Napisz wiadomość..."
              inputOnChange={(message: string) => this.setMessage(message)}
              value={message}
              maxLength={500}
              multiline={true}
              numberOfLines={10}
            />
          </View>
          <ButtonComponent
            pressButtonComponent={() =>
              this.props.sendNewConversationProduct(message)
            }
            buttonComponentText="Wyślij"
            fullWidth={true}
            underlayColor="#dd904d"
            whiteBg={false}
            showBackIcon={false}
          />
        </View>
      </React.Fragment>
    );
  }
}
export default ProductMessageBox;
