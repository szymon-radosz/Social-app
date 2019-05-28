import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  Button,
  Image
} from "react-native";
import styles from "./style";

interface FilterModalProps {
  filterOptions: any;
  closeFilter: any;
  filterModalName: string;
  filterResults: any;
}

interface FilterModalState {
  selectedResultName: string;
  selectedResultValue: string;
  selectedData: any;
  selectedResultId: any;
}

export default class FilterModal extends Component<
  FilterModalProps,
  FilterModalState
> {
  constructor(props: FilterModalProps) {
    super(props);
    this.state = {
      selectedResultName: "",
      selectedResultValue: "",
      selectedResultId: null,
      selectedData: []
    };

    this.setSelectedResult = this.setSelectedResult.bind(this);
  }

  setSelectedResult = (selectedResultValue: string, index: number): void => {
    this.setState({
      selectedResultValue: selectedResultValue,
      selectedResultId: index
    });
  };

  componentDidMount() {
    let filterModalName = this.props.filterModalName;

    console.log(this.props.filterOptions);

    if (filterModalName === "Odległość") {
      this.setState({
        selectedData: this.props.filterOptions.distance,
        selectedResultName: "Odległość"
      });
    } else if (filterModalName === "Wiek dziecka") {
      this.setState({
        selectedData: this.props.filterOptions.childAge,
        selectedResultName: "Wiek dziecka"
      });
    } else if (filterModalName === "Płeć dziecka") {
      this.setState({
        selectedData: this.props.filterOptions.childGender,
        selectedResultName: "Płeć dziecka"
      });
    } else if (filterModalName === "Hobby") {
      this.setState({
        selectedData: this.props.filterOptions.hobby,
        selectedResultName: "Hobby"
      });
    }
  }

  render() {
    const {
      selectedResultValue,
      selectedData,
      selectedResultId,
      selectedResultName
    } = this.state;
    return (
      <View>
        <TouchableHighlight style={styles.buttonCloseModal}>
          <Button
            title="<"
            color="#fff"
            onPress={() => this.props.closeFilter()}
          />
        </TouchableHighlight>

        <View style={{ padding: 10 }}>
          <Text
            style={{
              paddingLeft: 40,
              paddingRight: 40,
              fontSize: 16
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Filtruj:</Text>{" "}
            {this.props.filterModalName}
            {selectedResultValue && " - "}
            {selectedResultValue}
          </Text>
          <View style={{ paddingTop: 30 }}>
            {selectedData &&
              selectedData.map((option: any, i: number) => {
                return (
                  <TouchableOpacity
                    style={
                      selectedResultId === i
                        ? {
                            borderRadius: 6,
                            borderWidth: 1,
                            marginBottom: 5,
                            padding: 10,
                            borderColor: "orange"
                          }
                        : {
                            borderRadius: 6,
                            borderWidth: 1,
                            marginBottom: 5,
                            padding: 10
                          }
                    }
                    onPress={() => this.setSelectedResult(option.text, i)}
                  >
                    <Text>{option.text}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>

        <TouchableHighlight style={styles.productDetailsBtn}>
          <Button
            title="Filtruj"
            onPress={() =>
              this.props.filterResults(selectedResultName, selectedResultValue)
            }
            color="#fff"
          />
        </TouchableHighlight>
      </View>
    );
  }
}
