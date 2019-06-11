import React, { Component, useState, useEffect, useCallback } from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  Button
} from "react-native";
import styles from "./style";

const FilterModal = (props: {
  filterModalName: string;
  filterOptions: any;
  closeFilter: any;
  filterResults: any;
}) => {
  const [selectedResultName, setSelectedResultName] = useState("");
  const [selectedResultValue, setSelectedResultValue] = useState("");
  const [selectedResultId, setSelectedResultId] = useState(0);
  const [selectedData, setSelectedData] = useState([]);

  //like ComponentDidMount(), without parameters
  useEffect(() => {
    let filterModalName = props.filterModalName;

    console.log(props.filterOptions);

    if (filterModalName === "Odległość") {
      setSelectedData(props.filterOptions.distance);
      setSelectedResultName("Odległość");
    } else if (filterModalName === "Wiek dziecka") {
      setSelectedData(props.filterOptions.childAge);
      setSelectedResultName("Wiek dziecka");
    } else if (filterModalName === "Płeć dziecka") {
      setSelectedData(props.filterOptions.childGender);
      setSelectedResultName("Płeć dziecka");
    } else if (filterModalName === "Hobby") {
      setSelectedData(props.filterOptions.hobby);
      setSelectedResultName("Hobby");
    }
  }, []);

  const setSelectedResult = useCallback(
    (selectedResultValue: string, index: number) => {
      setSelectedResultValue(selectedResultValue);
      setSelectedResultId(index);
    },
    [selectedResultValue, selectedResultId]
  );

  return (
    <View>
      <TouchableHighlight style={styles.buttonCloseModal}>
        <Button title="<" color="#fff" onPress={() => props.closeFilter()} />
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
          {props.filterModalName}
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
                  onPress={() => setSelectedResult(option.text, i)}
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
            props.filterResults(selectedResultName, selectedResultValue)
          }
          color="#fff"
        />
      </TouchableHighlight>
    </View>
  );
};
export default FilterModal;
