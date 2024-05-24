import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Marker, Polyline, Polygon, Callout } from "react-native-maps";
import MapView from 'react-native-maps'
// import MapViewDirections from 'react-native-maps-directions';
import * as Location from "expo-location";
import mapStyle from "../styles/mapStyle";
// import { MARKERS_DATA } from "../data";
import { getAllSights } from "../api";
import { AuthContext } from '../context/AuthContext'
import { SightsContext } from "../context/SightsContext";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default function MapScreen() {
  const { user } = useContext(AuthContext)
  const { usersSights, setUsersSights } = useContext(SightsContext);
  const mapRef = useRef();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  // const [usersSights, setUsersSights] = useState([])
  
  // const [directions, setDirections] = useState([
  //   {
  //     latitude: 51.51804671105917,
  //     longitude: -0.08383278364567782,
  //   },
  //   {
  //     latitude: 51.51353018002063,
  //     longitude: -0.13652633647427498,
  //   },
  // ]);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleMarkerPress = (coordinate) => {
    mapRef.current.animateToRegion({
      latitude: coordinate.lat,
      longitude: coordinate.lon,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();

    // Hardcoded user 
    getAllSights('JamesO').then((res) => {
      setUsersSights(res);
    })
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        // provider="google"
        googleMapsApiKey={`${process.env.GOOGLE_API_KEY}`}
        ref={mapRef}
        initialRegion={initialRegion}
      >
        {usersSights.map((sight) => (
          <Marker 
            key={sight.id}
            coordinate={{
              latitude: sight.lat,
              longitude: sight.lon
            }}
            onPress={() => {
              setSelectedLocation(sight);
              handleMarkerPress(sight);
            }}
            image={require("../assets/map_marker.png")}
          />
        ))}
    {/* <MapViewDirections 
      origin={directions[0]}
      destination={directions[1]}
      apikey={`${process.env.GOOGLE_API_KEY}`}
      strokeWidth={4}
      strokeColor='#111111'/>
    <Marker coordinate={directions[0]}/>
    <Marker coordinate={directions[1]}/> */}
      </MapView>
      <FlatList 
        data={usersSights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedLocation(item);
              handleMarkerPress(item);
            }}
          >
            <View style={styles.item}>
              <Text style={styles.nameCard}>{item.tags.name || 'Local Sight'}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
      {selectedLocation && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{selectedLocation.tags.name}</Text>
          <View style={styles.address}>
            {selectedLocation.tags['addr:housenumber'] && 
              <Text style={styles.text}>{selectedLocation.tags['addr:housenumber']} </Text>}
            {selectedLocation.tags['addr:street'] && 
              <Text style={styles.text}>{selectedLocation.tags['addr:street']}</Text>}
          </View>
          {selectedLocation.tags.phone && 
            <Text style={styles.text}>{selectedLocation.tags.phone}</Text>}
          {selectedLocation.tags.website && 
            <Text style={styles.text}>{selectedLocation.tags.website}</Text>}
          <TouchableOpacity onPress={() => setSelectedLocation(null)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: height / 2,
    width: width,
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  detailCard: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  closeButton: {
    marginTop: 10,
    color: "blue",
  },
  address: {
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    marginVertical: 1
  },
  nameCard: {
    textTransform: 'capitalize',
  }
});
