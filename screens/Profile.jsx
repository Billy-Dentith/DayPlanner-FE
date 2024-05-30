import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
  } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteRouteById, getRouteById, getSavedRoutes, getUserByUsername } from "../api";
import MapRoute from "../components/MapComponent";
import { Ionicons } from "@expo/vector-icons";
import Loading from '../components/Loading';

export default function Profile({ navigation }) {
  const [userDB, setUserDB] = useState({});
  const { handleSignOut, user, avatar } = useContext(AuthContext);
  const [savedRoute, setSavedRoute] = useState();
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [refreshPage, setRefreshPage] = useState(0);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isRoutesLoading, setIsRoutesLoading] = useState(true);
  const [userErrorMsg, setUserErrorMsg] = useState('');
  const [routeErrorMsg, setRouteErrorMsg] = useState('');

  useEffect(() => {
    getUserByUsername(user.displayName)
      .then((res) => {
        setUserDB(res);
        setIsUserLoading(false);
        setUserErrorMsg('')
        return getSavedRoutes(user.displayName);
      })
      .then((res) => {
        setSavedRoutes(res);
        setIsRoutesLoading(false);
        setRouteErrorMsg('')
      })
      .catch((err) => {
        console.log(err)
        setIsRoutesLoading(false);
        setIsUserLoading(false);
        setUserErrorMsg('Unable to fetch user details');
        setRouteErrorMsg('Unable to fetch saved routes');
      })

  }, [user, refreshPage])

  const handleRoutePress = (routeId) => {
    getRouteById(routeId).then((res) => setSavedRoute(res))
  }

  const handleDelete = (routeId) => {
    deleteRouteById(routeId).then(() => {
      setRefreshPage(refreshPage + 1)
    })
  }
  
  if (savedRoute) {
    return (
      <View style={styles.container}>
        <MapRoute 
          routeCoords={savedRoute} 
          selectedSights={savedRoute.sights}
        />
        <TouchableOpacity
        style={styles.endButton}
          onPress={() => setSavedRoute()}
        >
          <Text style={styles.endButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Image
              style={styles.avatar}
              source={{ uri: avatar }}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textTitle}>User Information</Text>
          {isUserLoading ? <Loading /> : (
            <>
              <Text style={styles.text}>
                Name:{"  "}
                <Text style={styles.line}>{userDB.displayName}</Text>
              </Text>
              <Text style={styles.text}>
                Username:{"  "}
                <Text style={styles.line}>{userDB.username}</Text>
              </Text>
              <Text style={styles.text}>
                Location:{"  "}
                <Text style={styles.line}>{userDB.location}</Text>
              </Text>
            </>
          )}
          {userErrorMsg && (
            <Text>{userErrorMsg}</Text>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textTitle}>Saved Routes</Text>
          {isRoutesLoading ? <Loading /> : (
          <>
          {savedRoutes.map((route) => (
              <View style={styles.routeContainer} key={route._id}>
                <TouchableOpacity
                  onPress={() => handleRoutePress(route._id)}
                >
                  <Text style={styles.text}>
                    Route Name:{"  "}
                    <Text style={styles.text}>{route.name}</Text>
                  </Text>
                  <Text style={styles.text}>
                    Number of Sights:{"  "}
                    <Text style={styles.text}>{route.sights.length}</Text>
                  </Text>
                </TouchableOpacity>
                  <Ionicons
                    onPress={() => handleDelete(route._id)}
                    style={styles.icon}
                    name="close-outline"
                    color={"dimgray"}
                    size={40}
                  />
              </View>
              )
            )}
          </>
          )}
          {routeErrorMsg && (
            <Text>{routeErrorMsg}</Text>
          )}
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  button: {
    backgroundColor: "dimgray",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 0,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  textTitle: {
    paddingLeft: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    backgroundColor: "dimgray",
    marginBottom: 10,
    width: "100%",
    padding: 2,
    marginTop: 25,
  },
  text: {
    marginTop: 5,
    color: "dimgray",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    padding: 5,
  },
  infoContainer: {
    alignSelf: "center",
    width: "85%",
    marginBottom: 20,
    textAlign: "center",
  },
  line: {
    fontSize: 25,
    alignSelf: "center",
  },
  routeContainer: {
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'dimgray',
    padding: 10,
    flexDirection: 'row',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: "dimgray",
    borderWidth: 7,
    marginBottom: 20,
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
  icon: {
    marginLeft: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
});
  