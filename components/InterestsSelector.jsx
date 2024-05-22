import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const interests = [
    'Museum', 'Historical Site', 'Attraction', 'Art Gallery', 'Park', 'Market' 
]

export default InterestsSelector = ({ selectedInterests, setSelectedInterests }) => {
    // const [selectedInterest, setSelectedInterests] = useState([]);

    const toggleInterest = (interest) => {
        setSelectedInterests((prev) => 
            prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
        );
    };

    return (
        <View style={styles.container}>
            {interests.map((interest, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={[styles.option, selectedInterests.includes(interest) && styles.selectedOption]}
                        onPress={() => toggleInterest(interest)}
                    >
                        <Text
                            style={[styles.optionText, selectedInterests.includes(interest) && styles.selectedOptionText]}
                        >{interest}</Text>
                    </TouchableOpacity>
                )   
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    option: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      selectedOption: {
        backgroundColor: 'lightblue',
      },
      optionText: {
        color: '#333',
        fontSize: 16,
      },
      selectedOptionText: {
        color: '#333',
      },
})