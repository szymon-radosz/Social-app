import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import styles from "./style";
import { v4 as uuid } from "uuid";
import PageHeader from "./PageHeader";
import ButtonComponent from "./../../Utils/ButtonComponent";

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
    } else if (filterModalName === "Cena") {
      setSelectedData(props.filterOptions.price);
      setSelectedResultName("Cena");
    } else if (filterModalName === "Status") {
      setSelectedData(props.filterOptions.status);
      setSelectedResultName("Status");
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
        closeMethodParameter={""}
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

      <ButtonComponent
        pressButtonComponent={() =>
          props.filterResults(selectedResultName, selectedResultValue)
        }
        buttonComponentText="Filtruj"
        fullWidth={true}
        underlayColor="#dd904d"
      />
    </ScrollView>
  );
};
export default FilterModal;
