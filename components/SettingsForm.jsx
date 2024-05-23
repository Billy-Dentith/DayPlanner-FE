import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    
})

export default SettingsForm =() => {

    return (
        <Formik
            initialValues={{  
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values)
            }}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <View style={styles.container}>
                <Text>Add user settings...</Text>
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