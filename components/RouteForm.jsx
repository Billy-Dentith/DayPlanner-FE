import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select'
import InterestsSelector from "./InterestsSelector";

const validationSchema = Yup.object().shape({
    city: Yup
        .string()
        .required('City is required'),
    // startTime: Yup
    //     .number()
    //     .required('Start time is required'),
    // endTime: Yup
    //     .number()
    //     .required('End time is required')
})

export default RouteForm =() => {
    const [selectedCity, setSelectedCity] = useState();
    const [selectedInterests, setSelectedInterests] = useState([]);

    return (
        <Formik
            initialValues={{ 
                city: '',  
                // startTime: '', 
                // endTime: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values)
                console.log(selectedInterests);
            }}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <View style={styles.loginContainer}>
                <Text style={styles.text}>City:</Text>
                <RNPickerSelect
                    style={{...pickerStyles}}
                    onValueChange={handleChange('city')}
                    onBlur={handleChange('city')}
                    items={[
                        { label: 'London', value: 'england'},
                        { label: 'Manchester', value: 'manchester'},
                        { label: 'Birmingham', value: 'birmingham'},
                        { label: 'Liverpool', value: 'liverpool'},
                    ]}
                    value={values.city}
                />
                {errors.city &&
                    <Text style={styles.errorText}>City must be provided</Text>
                }
                {/* <Text style={styles.text}>Start Time:</Text>
                <TextInput
                    name='start time'
                    placeholder="Start Time"
                    style={styles.textInput}
                    onChangeText={handleChange('start time')}
                    onBlur={handleBlur('start time')}
                    value={values.startTime}
                />
                {errors.end &&
                    <Text style={styles.errorText}>Start time must be provided</Text>
                }
                <Text style={styles.text}>End Time:</Text>
                <TextInput
                    name='end time'
                    placeholder="End Time"
                    style={styles.textInput}
                    onChangeText={handleChange('end time')}
                    onBlur={handleBlur('end time')}
                    value={values.endTime}
                />
                {errors.numberOfSights &&
                    <Text style={styles.errorText}>End time must be provided</Text>
                } */}
                <Text style={styles.text}>Interests:</Text>
                <InterestsSelector selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests}></InterestsSelector>
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
    loginContainer: {
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
        marginTop: 10,
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