import React, { Component } from "react";
import { TouchableOpacity, View, Text, Button, Image } from "react-native";
import styles from "./style";

interface FilterModalProps {
  filterOptions: any;
}

interface FilterModalState {
  selectedResult: string;
}

export default class FilterModal extends Component<
  FilterModalProps,
  FilterModalState
> {
  constructor(props: FilterModalProps) {
    super(props);
    this.state = {
      selectedResult: ""
    };
  }

  render() {
    return (
      <View>
        {this.props.filterOptions &&
          this.props.filterOptions.map((option: any, i: number) => {
            return (
              <TouchableOpacity>
                <Text>{option.text}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  }
}
