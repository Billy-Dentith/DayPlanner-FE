import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default InterestsFilter = ({filter, setFilter}) => {

  const handleToggle = (category, item) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [category]: {
        ...prevFilter[category],
        [item]: !prevFilter[category][item],
      },
    }));
  };

  const renderButtons = (category) => {
    return Object.keys(filter[category]).map((item, index) => (
      <View key={item} style={styles.switchContainer}>
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            filter[category][item] && styles.selectedOption,
          ]}
          onPress={() => handleToggle(category, item)}
        >
          <Text
            style={styles.optionText}
          >
            {item.replace('_', ' ')}
          </Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {Object.keys(filter).map((category, index) => (
        <View key={index}>
          <Text style={styles.categoryHeader}>{category}</Text>
          <View style={styles.categoryContainer}>
            {renderButtons(category)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 20,
    marginVertical: 5,
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "center",
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: 'dimgray',
    textTransform: 'capitalize',
  },
  switchContainer: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
  option: {
    backgroundColor: '#e6e6e6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  optionText: {
    color: '#333',
    fontSize: 16,
    textTransform: 'capitalize'
  },
});

