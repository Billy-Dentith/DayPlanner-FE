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
import { getAllSights, patchUser } from "../api";
import { AuthContext } from '../context/AuthContext'
import { SightsContext } from "../context/SightsContext";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default function MapRoute({ routeCoords, selectedSights }) {
  const { user } = useContext(AuthContext)
  const mapRef = useRef();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
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
        showsUserLocation={true}
      >
        {selectedSights.map((sight) => (
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
        origin={routeCoords[0]}
        destination={routeCoords[routeCoords.length - 1]}
        apikey={`${process.env.GOOGLE_API_KEY}`}
        strokeWidth={4}
        strokeColor='#111111'/> */}
        <Polyline 
            coordinates={routeCoords.routePolyLine}
            strokeWidth={4}
            strokeColor="#111111"
        />
      </MapView>
      {selectedLocation && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{selectedLocation.tags.name || 'Local Sight'}</Text>
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
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    top: 0, left: 0, right: 0, bottom: 0
  },
  detailCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
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
