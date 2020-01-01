import React, { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import styles from "./style";
import PageHeader from "./PageHeader";
import ButtonComponent from "./../Utils/ButtonComponent";
import lang from "./../../assets/lang/SharedComponents/FilterModal";

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

    //console.log(props.filterOptions);

    if (filterModalName === lang.distance["en"]) {
      setSelectedData(props.filterOptions.distance);
      setSelectedResultName(lang.distance["en"]);
    } else if (filterModalName === lang.hobby["en"]) {
      setSelectedData(props.filterOptions.hobby);
      setSelectedResultName(lang.hobby["en"]);
    } else if (filterModalName === lang.status["en"]) {
      setSelectedData(props.filterOptions.status);
      setSelectedResultName(lang.status["en"]);
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
        boldText={lang.filterResults["en"]}
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
                  key={`FilterModal-${i}`}
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
        buttonComponentText={lang.filterResults["en"]}
        fullWidth={true}
        underlayColor="#dd904d"
        whiteBg={false}
        showBackIcon={false}
      />
    </ScrollView>
  );
};
export default FilterModal;
