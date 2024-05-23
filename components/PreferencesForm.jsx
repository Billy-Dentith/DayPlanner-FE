import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select'
import InterestsFilter from "./InterestsFilter";
import { initialFilter } from "../data/Interests";

const validationSchema = Yup.object().shape({
    radius: Yup
        .string()
        .required('Radius is required'),
})

export default RouteForm =() => {
    const [filter, setFilter] = useState(initialFilter);

    return (
        <Formik
            initialValues={{  
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values)
                console.log(filter);
            }}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <View style={styles.container}>
                <Text style={styles.text}>Search Radius</Text>
                <RNPickerSelect
                    style={{...pickerStyles}}
                    onValueChange={handleChange('radius')}
                    onBlur={handleChange('radius')}
                    placeholder={{}}
                    items={[
                        { label: '100 Meters', value: '100'},
                        { label: '200 Meters', value: '200'},
                        { label: '300 Meters', value: '300'},
                        { label: '400 Meters', value: '400'},
                        { label: '500 Meters', value: '500'},
                        { label: '600 Meters', value: '600'},
                        { label: '700 Meters', value: '700'},
                        { label: '800 Meters', value: '800'},
                        { label: '900 Meters', value: '900'},
                        { label: '1 Kilometer', value: '1000'},
                    ]}
                    value={values.radius}
                />
                <Text style={styles.text}>Interests</Text>
                <InterestsFilter filter={filter} setFilter={setFilter}></InterestsFilter>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleSubmit} 
                    title="Submit"
                    disabled={!isValid}    
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
       )}
        </Formik>
    )
}

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