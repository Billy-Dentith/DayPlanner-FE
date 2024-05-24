import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useState } from "react";
// import RouteForm from '../components/RouteForm'
import { SightsContext } from "../context/SightsContext";
import SightItem from '../components/SightItem'

const RoutePlanner = () => {
  const { usersSights, setUsersSights } = useContext(SightsContext);
  const [routeSights, setRouteSights] = useState([]); 
  const [sightsFilter, setSightsFilter] = useState(
    usersSights.reduce((obj, sight) => {
      obj[sight.id] = false;
      return obj;
    }, {})
  );

  const handleToggle = (sightId) => {
    setSightsFilter((prevFilter) => ({
      ...prevFilter,
      [sightId]: ! prevFilter[sightId]
    }))
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose from the below sights to start planning your route:</Text>
      <FlatList 
          data={usersSights}
          keyExtractor={(item) => item.id}
          style={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.option,
                sightsFilter[item.id] && styles.selectedOption,
              ]}
              onPress={() => {
                handleToggle(item.id);
                console.log(item);
              }}
            >
              <Text 
                style={[
                  styles.optionText,
                  sightsFilter[item.id] && styles.selectedOptionText 
                ]}
              >
                {item.tags.name || 'Local Sight'}
              </Text>
              <Text
                style={[
                  styles.optionText,
                  sightsFilter[item.id] && styles.selectedOptionText 
                  ]}
              >
                {item.tags.shop || item.tags.leisure || item.tags.historic || item.tags.amenity || item.tags.tourism}
              </Text>
            </TouchableOpacity>
          )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(sightsFilter)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    marginBottom: 100,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  nameCard: {
    textTransform: 'capitalize',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'left',
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 20,
    color: "dimgray",
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'left',
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 15,
    color: "dimgray",
  },
  option: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
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
    color: 'dimgray',
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  selectedOptionText: {
    color: 'white',
  },
  button: {
    backgroundColor: "dimgray",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 0,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  }, 
  list: {
    height: '90%'
  }
})

export default RoutePlanner;
