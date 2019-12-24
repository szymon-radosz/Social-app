import React from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./style";
const trash: any = require("./../../assets/images/trash.png");

const ActiveFilters = (props: any) => (
  <View>
    {props.filterDistance || props.filterHobbyName
      ? !props.showFilterModal && (
          <Text style={styles.activeFiltersText}>Aktywne filtry: </Text>
        )
      : null}

    <View style={styles.activeFiltersConatiner}>
      {props.filterDistance && !props.showFilterModal ? (
        <View style={styles.removeFilterBtnContainer}>
          <Text style={styles.removeFilterText}>
            Odległość - {props.filterDistance}
          </Text>
          <TouchableHighlight
            style={styles.removeFilterBtn}
            onPress={() => props.removeFilter("Odległość")}
            underlayColor={"#dd904d"}
          >
            <Image source={trash} style={{ width: 20, height: 20 }} />
          </TouchableHighlight>
        </View>
      ) : null}

      {props.filterHobbyName && !props.showFilterModal ? (
        <View style={styles.removeFilterBtnContainer}>
          <Text style={styles.removeFilterText}>
            Hobby - {props.filterHobbyName}
          </Text>
          <TouchableHighlight
            style={styles.removeFilterBtn}
            onPress={() => props.removeFilter("Hobby")}
            underlayColor={"#dd904d"}
          >
            <Image source={trash} style={{ width: 20, height: 20 }} />
          </TouchableHighlight>
        </View>
      ) : null}

      {props.filterStatus && !props.showFilterModal ? (
        <View style={styles.removeFilterBtnContainer}>
          <Text style={styles.removeFilterText}>
            Status - {props.filterStatus}
          </Text>
          <TouchableHighlight
            style={styles.removeFilterBtn}
            onPress={() => props.removeFilter("Status")}
            underlayColor={"#dd904d"}
          >
            <Image source={trash} style={{ width: 20, height: 20 }} />
          </TouchableHighlight>
        </View>
      ) : null}
    </View>
  </View>
);

export default ActiveFilters;
