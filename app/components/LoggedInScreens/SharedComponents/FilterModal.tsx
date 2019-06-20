import React, { useState, useEffect, useCallback } from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  Button,
  Image,
  ScrollView
} from "react-native";
import styles from "./style";
import { v4 as uuid } from "uuid";
import PageHeader from "./PageHeader";

const FilterModal = (props: {
  filterModalName: string;
  filterOptions: any;
  closeFilter: any;
  filterResults: any;
}) => {
  const [userSelectData, setUserSelectData] = useState(false);
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
      setUserSelectData(true);
    },
    [selectedResultValue, selectedResultId]
  );

  return (
    <ScrollView>
      <PageHeader
        boldText={"Filtruj: "}
        normalText={`${props.filterModalName} - ${selectedResultValue}`}
        closeMethod={props.closeFilter}
      />

      <View style={styles.filterModalContainer}>
        <View style={styles.filterModalOptionContainer}>
          {selectedData &&
            selectedData.map((option: any, i: number) => {
              return (
                <TouchableOpacity
                  style={
                    selectedResultId === i && userSelectData
                      ? styles.filterModalOptionActive
                      : styles.filterModalOptionInactive
                  }
                  key={uuid()}
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
    </ScrollView>
  );
};
export default FilterModal;
