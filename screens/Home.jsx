import React from "react";
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
import MapViewDirections from 'react-native-maps-directions';
import * as Location from "expo-location";
import mapStyle from "../styles/mapStyle";
import { MARKERS_DATA } from "../data";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default function MapScreen() {
  const mapRef = useRef();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directions, setDirections] = useState([
    {
      latitude: 51.51804671105917,
      longitude: -0.08383278364567782,
    },
    {
      latitude: 51.51353018002063,
      longitude: -0.13652633647427498,
    },
  ]);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleMarkerPress = (coordinate) => {
    mapRef.current.animateToRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
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
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (currentLocation) {
    text = JSON.stringify(currentLocation);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        // provider="google"
        googleMapsApiKey="AIzaSyA_yYlqJPS6gu50NJB3lD7ntyQtwqQ8xUg"
        ref={mapRef}
        initialRegion={initialRegion}
      >
        {MARKERS_DATA.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => {
              setSelectedLocation(marker);
              handleMarkerPress(marker);
            }}
            image={require("../assets/map_marker.png")}
          />
          // <CustomMarker
          //   key={location.id}
          //   id={location.id}
          //   selectedMarker={location}
          //   color={location.color}
          //   latitude={location.latitude}
          //   longitude={location.longitude}
          //   setSelectedLocation={setSelectedLocation}
          // ></CustomMarker>
        ))}
    <MapViewDirections 
      origin={directions[0]}
      destination={directions[1]}
      apikey='AIzaSyCpXQ_Jqv8Pv9yQiKvahvD_tMvwOA4TKaw'
      strokeWidth={4}
      strokeColor='#111111'/>
    <Marker coordinate={directions[0]}/>
    <Marker coordinate={directions[1]}/>
      </MapView>
      <FlatList
        data={MARKERS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedLocation(item);
              handleMarkerPress(item);
            }}
          >
            <View style={styles.item}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
      {selectedLocation && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{selectedLocation.name}</Text>
          <Text>{selectedLocation.direction}</Text>
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
  },
  closeButton: {
    marginTop: 10,
    color: "blue",
  },
});
