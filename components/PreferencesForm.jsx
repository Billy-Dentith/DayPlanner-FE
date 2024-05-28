import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import RNPickerSelect from 'react-native-picker-select'
import InterestsFilter from "./InterestsFilter";
// import { initialFilter } from "../data/Interests";
import { patchUser } from "../api";
import { AuthContext } from "../context/AuthContext";

export default RouteForm =({ usersInterests, setUsersInterests, currentRadius, navigation }) => {
    const { user } = useContext(AuthContext);
    const [radius, setRadius] = useState();

    const handleSubmit = () => {
        patchUser(user.displayName, undefined, radius, undefined, undefined, usersInterests).then((res) => {
            // console.log(res);
        })
        navigation.navigate('Profile')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Search Radius</Text>
            <RNPickerSelect
                style={{...pickerStyles}}
                onValueChange={(value) => setRadius(value)}
                onBlur={(value) => setRadius(value)}
                placeholder={{}}
                value={currentRadius}
                items={[
                    { label: '500 Meters', value: '500'},
                    { label: '600 Meters', value: '600'},
                    { label: '700 Meters', value: '700'},
                    { label: '800 Meters', value: '800'},
                    { label: '900 Meters', value: '900'},
                    { label: '1000 Meters', value: '1000'},
                    { label: '1100 Meters', value: '1100'},
                    { label: '1200 Meters', value: '1200'},
                    { label: '1300 Meters', value: '1300'},
                    { label: '1400 Meter', value: '1400'},
                    { label: '1500 Meter', value: '1500'},
                    { label: '1600 Meter', value: '1600'},
                ]}
            />
            <Text style={styles.text}>Interests</Text>
            <InterestsFilter filter={usersInterests} setFilter={setUsersInterests}></InterestsFilter>
            <TouchableOpacity 
                style={styles.button}
                onPress={handleSubmit} 
            >
                <Text style={styles.buttonText}>Confirm Changes</Text>
            </TouchableOpacity>
        </View>
       )}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      padding: 20,
      elevation: 10,
    },
    textInput: {
      height: 40,
      width: '100%',
      margin: 10,
      marginBottom: 15,
      padding: 10,
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
    },
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
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        color: "dimgray",
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
  })

  const pickerStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 13,
        padding: 7,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        backgroundColor: "white",
        color: "black",
        height: 40,
        width: "100%",
        marginTop: 10,
        marginBottom: 15,
    }
  })