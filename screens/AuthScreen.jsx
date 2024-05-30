import React, { useContext, useState } from 'react';
import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { auth } from '../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'; 

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = () => {
    navigation.navigate("Sign Up")
  }

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('success', email);
    } catch (error) {
      console.log('error');
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('success', email);
    } catch (error) {
      console.log('error');
    }
  };

  return (
      <ImageBackground source={require('../assets/Artboard 1.png')} resizeMode='cover' style={styles.container}>

      <Image
        style={styles.logo}
        source={require('../assets/plan_ahead.png')}
        />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigate}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      </ImageBackground>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    elevation: 0,
    zIndex:0
  },
  input: {
    height: 55,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 15,
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 17,
    backgroundColor: 'rgb(240,240,255)',
    elevation:3,
    zIndex:3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1, 
  },
  message: {
    marginTop: 20,
    color: 'red',
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#B0D9E6",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation:3,
    zIndex:3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1, 

  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 17
  },
  logo: {
    margin: 5,
    padding: 5,
    alignSelf: 'center',
    width: 250,
    height: 162,
    resizeMode: 'auto',
    elevation: 3,
    zIndex: 3,
    backgroundColor: 'white',
    borderRadius: 15
  },
});