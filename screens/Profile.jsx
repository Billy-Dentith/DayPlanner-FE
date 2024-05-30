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
import { getSavedRoutes, getUserByUsername } from "../api";
import { SightsContext } from "../context/SightsContext";

export default function Profile({ navigation }) {
  const [userDB, setUserDB] = useState({});
  const { handleSignOut, user, avatar } = useContext(AuthContext);
  const { setSavedRouteId } = useContext(SightsContext);
  const [savedRoutes, setSavedRoutes] = useState([])

  useEffect(() => {
    getUserByUsername(user.displayName)
      .then((res) => {
        setUserDB(res);
        return getSavedRoutes(user.displayName);
      })
      .then((res) => {
        setSavedRoutes(res);
      })
      .catch((err) => {
        console.log(err)
      })

    // Promise.all([
    //   getUserByUsername(user.displayName),
    //   getSavedRoutes(user.displayName)
    // ])
    // .then(([userRes, routesRes]) => {
    //   setUserDB(userRes);
    //   setSavedRoutes(routesRes);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  }, [user])
  
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
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textTitle}>Saved Routes</Text>
        {savedRoutes.map((route) => (
            <View style={styles.routeContainer} key={route._id}>
              <TouchableOpacity
                onPress={() => {
                  setSavedRouteId(route._id);
                  navigation.navigate('Day Planner');
                }}
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
            </View>
          )
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
    padding: 10
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: "dimgray",
    borderWidth: 7,
    marginBottom: 20,
  },
});
  