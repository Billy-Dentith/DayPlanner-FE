import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select'
// import InterestsSelector from "./InterestsSelector";
// import { initialFilter } from "../data/Interests";
// import InterestsFilter from "./InterestsFilter";
import { SightsContext } from "../context/SightsContext";
import SightItem from '../components/SightItem'

export default RouteForm =() => {
    // const [selectedCity, setSelectedCity] = useState();
    const { usersSights, setUsersSights } = useContext(SightsContext);

    return (
        <View contentContainerStyle={styles.container}>
            {/* <Text style={styles.text}>Click the button below to get a list of sights based on your interests:</Text> */}
            <FlatList 
                data={usersSights}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            console.log('hello');
                        }}
                    >
                        <View style={styles.item}>
                            <Text style={styles.nameCard}>{item.tags.name || 'Local Sight'}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                style={styles.list}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 20,
    },
    // textInput: {
    //   height: 40,
    //   width: '90%',
    //   margin: 10,
    //   marginBottom: 15,
    //   padding: 10,
    //   backgroundColor: 'white',
    //   borderColor: 'gray',
    //   borderWidth: StyleSheet.hairlineWidth,
    //   borderRadius: 10,
    // },
    errorText: {
        fontSize: 10,
        color: 'red',
        margin: 7.5,
        marginBottom: 15,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'left',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 10,
        color: "dimgray",
    },
    button: {
        backgroundColor: "dimgray",
        width: "90%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 25,
        alignSelf: 'center'
      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
      },
      list: {
        flex: 1,
      },
  })

//   const pickerStyles = StyleSheet.create({
//     inputIOS: {
//         fontSize: 13,
//         padding: 7,
//         borderWidth: 1,
//         borderColor: "gray",
//         borderRadius: 10,
//         backgroundColor: "white",
//         color: "black",
//         height: 40,
//         width: "90%",
//         marginTop: 10,
//         marginBottom: 15,
//         marginHorizontal: 20,
//     }
//   })