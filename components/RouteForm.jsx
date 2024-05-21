import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios'

const validationSchema = Yup.object().shape({
    start: Yup
        .string()
        .required('Start point is required'),
    end: Yup
        .string()
        .required('End point is required'),
    numberOfSights: Yup
        .number()
        .required('Number of sights is required')
})

export default RouteForm =() => {
    return (
        <Formik
            initialValues={{ start: '',  end: '', numberOfSights: ''}}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values)
                // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=liverpool+street,+london,+EC2M7PY`)
                // .then((res) => {
                //     console.log(res.data);
                // })
            }}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <View style={styles.loginContainer}>
                <Text>Start Point:</Text>
                <TextInput
                    name='start'
                    placeholder="Start Point"
                    style={styles.textInput}
                    onChangeText={handleChange('start')}
                    onBlur={handleBlur('start')}
                    value={values.start}
                />
                {errors.start &&
                    <Text style={styles.errorText}>Start point must be provided</Text>
                }
                <Text>End Point:</Text>
                <TextInput
                    name='end'
                    placeholder="End Point"
                    style={styles.textInput}
                    onChangeText={handleChange('end')}
                    onBlur={handleBlur('end')}
                    value={values.end}
                />
                {errors.end &&
                    <Text style={styles.errorText}>End point must be provided</Text>
                }
                <Text>Number of Sights:</Text>
                <TextInput
                    name='number of sights'
                    placeholder="Number of Sights"
                    style={styles.textInput}
                    onChangeText={handleChange('numberOfSights')}
                    onBlur={handleBlur('numberOfSights')}
                    value={values.numberOfSights}
                />
                {errors.numberOfSights &&
                    <Text style={styles.errorText}>Number of sights must be provided</Text>
                }
                <Button 
                    onPress={handleSubmit} 
                    title="Submit"
                    disabled={!isValid}    
                />
            </View>
       )}
        </Formik>
    )
}

const styles = StyleSheet.create({

    loginContainer: {
      width: '100%',
      alignItems: 'center',
      padding: 10,
      elevation: 10,
      backgroundColor: '#e6e6e6'
    },
    textInput: {
      height: 40,
      width: '100%',
      margin: 10,
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
    }
  })