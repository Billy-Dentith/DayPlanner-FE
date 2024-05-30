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
import MapView from "react-native-maps";
import * as Location from "expo-location";
import mapStyle from "../styles/mapStyle";
import {
  getAllSights,
  getUserByUsername,
  patchUser,
  patchUserLocation,
} from "../api";
import { AuthContext } from "../context/AuthContext";
import { SightsContext } from "../context/SightsContext";
import amenity from "../assets/amenity_marker.png";
import historic from "../assets/historic_marker.png";
import shop from "../assets/shop_marker.png";
import leisure from "../assets/leisure_marker.png";
import tourism from "../assets/tourism_marker.png";
import Loading from '../components/Loading';

const { height } = Dimensions.get("window");

const { width } = Dimensions.get("window");

export default function MapScreen() {
  const { user } = useContext(AuthContext);
  const { usersSights, setUsersSights } = useContext(SightsContext);
  const mapRef = useRef();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [updateTime, setUpdateTime] = useState(0);

  const [searchRadius, setSearchRadius] = useState(1000);

  const handleMarkerPress = (coordinate) => {
    mapRef.current.animateToRegion({
      latitude: coordinate.lat,
      longitude: coordinate.lon,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTime(updateTime + 1)
      
    }, 60000)
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      await setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      return location.coords;
    };

    getLocation();
  
    getUserByUsername(user.displayName)
      .then((res) => {
  
        if (res.settings.searchRadius) {
          return Promise.all([getLocation(), res.settings.searchRadius]);
        }
        return Promise.all([getLocation(), searchRadius]);
      })
      .then(([Location, radius]) => {
  
        return patchUser(
          user.displayName,
          undefined,
          radius,
          Location.longitude,
          Location.latitude,
          undefined
        );
      })
      .then((response) => {
  
        return getAllSights(user.displayName)
      })
      .then((res) => {
        setUsersSights(res);
        setIsLoading(false);
        setErrorMsg('')
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        setErrorMsg('Unable to fetch sights')
      })
    return () => clearInterval(interval)
  }, [updateTime])

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          // provider="google"
          googleMapsApiKey={`${process.env.GOOGLE_API_KEY}`}
          ref={mapRef}
          initialRegion={initialRegion}
          showsUserLocation={true}
        >
          {usersSights.map((sight) => {
            let type = "Default";
            if (!!sight.tags.amenity) {
              type = amenity;
            } else if (!!sight.tags.historic) {
              type = historic;
            } else if (!!sight.tags.leisure) {
              type = leisure;
            } else if (!!sight.tags.shop) {
              type = shop;
            } else if (!!sight.tags.tourism) {
              type = tourism;
            }

            return (
              <Marker
                key={sight.id}
                coordinate={{
                  latitude: sight.lat,
                  longitude: sight.lon,
                }}
                onPress={() => {
                  setSelectedLocation(sight);
                  handleMarkerPress(sight);
                }}
                image={type}
              />
            );
          })}
        </MapView>
      </View>
      {isLoading ? <Loading /> : (
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
              <Text style={styles.nameCard}>
                {item.tags.name || "Local Sight"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.list}
      />)}
      {selectedLocation && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{selectedLocation.tags.name}</Text>
          <View style={styles.address}>
            {selectedLocation.tags["addr:housenumber"] && (
              <Text style={styles.text}>
                {selectedLocation.tags["addr:housenumber"]}{" "}
              </Text>
            )}
            {selectedLocation.tags["addr:street"] && (
              <Text style={styles.text}>
                {selectedLocation.tags["addr:street"]}
              </Text>
            )}
          </View>
          {selectedLocation.tags.phone && (
            <Text style={styles.text}>{selectedLocation.tags.phone}</Text>
          )}
          {selectedLocation.tags.website && (
            <Text style={styles.text}>{selectedLocation.tags.website}</Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setSelectedLocation(null)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    flex: 1,
    justifyContent: "center",
  },
  mapContainer: {
    margin: "auto",
    marginTop: 5,
    borderWidth: 0,
    borderRadius: 20,
    height: width - 8,
    width: width - 8,
    overflow: "hidden",
    elevation: 3,
    zIndex: 3,
  },
  map: { height: "100%", width: "100%" },
  list: {
    marginTop: 5,
    flex: 1,
    overflow: "visible",
    elevation: 1,
    zIndex: 1,
  },
  item: {
    margin: "auto",
    alignItems: "center",
    backgroundColor: "rgb(235,235,235)",
    padding: 20,
    borderBottomWidth: 5,
    borderBottomColor: "#ccc",
    width: width - 10,
    borderRadius: 15,
    zIndex: 1,
    elevation: 1,
  },
  detailCard: {
    flex: 1,
    width: width - 10,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
    margin: "auto",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 3,
    zIndex: 3,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    textTransform: "capitalize",
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  closeButton: {
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 10,
    color: "black",
    backgroundColor: "rgb(240,240,250)",
  },
  address: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    marginVertical: 1,
    alignText: "center",
    margin: "auto",
  },
  nameCard: {
    textTransform: "capitalize",
  },
});
