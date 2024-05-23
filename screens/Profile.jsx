import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
  } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import { getUserByUsername } from "../api";

export default function Profile() {
  const [message, setMessage] = useState('');
  const [userDB, setUserDB] = useState({});
  const { handleSignOut, user } = useContext(AuthContext);

  useEffect(() => {
    getUserByUsername(user.displayName).then((res) => {
      setUserDB(res);
    })
  }, [])
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              borderColor: "dimgray",
              borderWidth: 7,
              marginBottom: 20,
            }}
            source={{ uri: userDB.avatar }}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textTitle}>User Information</Text>
        <Text style={styles.text}>
          Name:{"  "}
          <Text style={styles.line}>Billy</Text>
        </Text>
        <Text style={styles.text}>
          Username:{"  "}
          <Text style={styles.line}>{userDB.username}</Text>
        </Text>
        <Text style={styles.text}>
          Location:{"  "}
          <Text style={styles.line}>London</Text>
        </Text>
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
    marginBottom: 10,
    padding: 10,
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
});
  