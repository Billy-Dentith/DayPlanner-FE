import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
  } from "react-native";
import React, { useContext, useState } from "react";
import pug from "../assets/pug.jpg";
import { AuthContext, auth } from "../firebase/firebase";

export default function SettingsScreen() {
    const { user } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>Settings...</Text>
        </View>
    )
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