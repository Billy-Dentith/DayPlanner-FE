import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
// import RouteForm from '../components/RouteForm'
import { SightsContext } from "../context/SightsContext";
import SightItem from '../components/SightItem'
import { getRoute } from "../api";
import { AuthContext } from "../context/AuthContext";
import MapRoute from "../components/MapComponent";

const RoutePlanner = () => {
  const { user } = useContext(AuthContext);
  const { usersSights, setUsersSights } = useContext(SightsContext);
  const [selectedSights, setSelectedSights] = useState([]);
  const [routeCoords, setRouteCoords] = useState();
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
  };

  const handleSubmit = (sights) => {
    const sightIdsArr = Object.keys(sights).filter((sight) => sightsFilter[sight] === true);

    const sightsArr = usersSights.filter((sight) => {
      if (sightIdsArr.includes(sight.id.toString())) {
        return sight;
      }
    });
    
    setSelectedSights(sightsArr);

    getRoute(user.displayName, sightsArr).then((res) => {
      setRouteCoords(res);
    })
  };
  
  if (routeCoords) {
    return (
      <View style={styles.container}>
        <MapRoute routeCoords={routeCoords} selectedSights={selectedSights}></MapRoute>
        <TouchableOpacity
        style={styles.endButton}
          onPress={() => setRouteCoords()}
        >
          <Text style={styles.endButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
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
        onPress={() => handleSubmit(sightsFilter)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )}
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  }, 
  endButton: {
    backgroundColor: "white",
    width: "90%",
    padding: 8,
    alignSelf: "center",
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    fontWeight: 'bold'
  },
  endButtonText: {
    fontSize: 16,
  },
  list: {
    height: '90%',
    width: '95%',
    alignSelf: 'center',
  }
})

export default RoutePlanner;
