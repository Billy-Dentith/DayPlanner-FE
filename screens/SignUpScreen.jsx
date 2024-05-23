import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth } from "../firebase/firebase";
import { getAllUsers } from "../api";
import axios from "axios";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');


  function navigate() {
    navigation.navigate("Sign In")
  }

  const handleSignUp = async () => {
    const formInputs = [name, email, password, confirmPassword];

    if (formInputs.includes("") || formInputs.includes(undefined)) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const users = await getAllUsers();
      const usernames = users.map((user) => user.username);

      if (usernames.includes(username)) {
        setUsernameError('Sorry, this username is taken. Please choose another.');
        return;
      }

      if (password !== confirmPassword) {
        setPasswordError('Both passwords must match');
        return;
      }

      setPasswordError('')
      setUsernameError('')
      setErrorMessage('')

      try {
        // const userCred = await createUserWithEmailAndPassword(auth, email, password);
        // console.log(userCred);
        // const username = userCred.user.username;

        /* 
        await postUser({
          username: username,
          name: name,
          emailAddress: email,
          etc...
        })
        */

        // setUser(username)
        // Set user using Mongo users database - currently using firebase user database

        // await updateProfile to update user

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        console.log('User created successfully!');


        await postUserToMongo(username);


      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(`Failed to get users: ${error.message}`)
    }
  }

  const postUserToMongo = async (username) => {
    try {
      const response = await axios.post('https://dayplanner-yoqm.onrender.com/api/users', {
        username: username,
        avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
      });
      
      console.log('User saved ', response.data);
      navigate();
    } catch (error) {
      console.error('Error saving user', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
        <Ionicons
          onPress={navigate}
          style={styles.Icon}
          name="arrow-back-circle-outline"
          color={"white"}
          size={60}
        />
        <Text style={styles.Heading}>
          Create your{"\n"}
          account
        </Text>
        <View style={styles.FormView}>
          <TextInput
            onChangeText={(text) => {setName(text); setErrorMessage('')}}
            value={name}
            placeholder={"Full Name*"}
            placeholderTextColor={"white"}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={(text) => {setUsername(text); setErrorMessage(''); setUsernameError('')}}
            value={username}
            placeholder={"Username*"}
            placeholderTextColor={"white"}
            style={styles.TextInput}
          />
          {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}
          <TextInput
            onChangeText={(text) => {setEmail(text); setErrorMessage('')}}
            placeholder={"Email Address*"}
            value={email}
            placeholderTextColor={"white"}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={(text) => {setPassword(text); setErrorMessage(''); setPasswordError('')}}
            placeholder={"Password*"}
            value={password}
            secureTextEntry={true}
            placeholderTextColor={"white"}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={(text) => {setConfirmPassword(text); setErrorMessage(''); setPasswordError('')}}
            placeholder={"Confirm Password*"}
            value={confirmPassword}
            secureTextEntry={true}
            placeholderTextColor={"white"}
            style={styles.TextInput}
          />
          {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
          <Text style={styles.Text}>Choose a Profile Picture:</Text>
          <TouchableOpacity onPress={pickImage} style={styles.Button}>
            <Text style={styles.ButtonText}>
              Choose from Camera Roll
            </Text>
          </TouchableOpacity>
          <View style={styles.container}>
            {avatar && (
              <Image
                source={{ uri: avatar }}
                style={styles.image}
              />
            )}
          </View>
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <TouchableOpacity onPress={handleSignUp} style={styles.Button}>
            <Text style={styles.ButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'lightblue',
    width: '100%',
    height: '100%',
  },
  Heading: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 25,
    marginTop: 5,
    alignSelf: 'left',
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  TextInput: {
    width: "90%",
    height: 55,
    borderWidth: 1.5,
    borderColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    color: "white",
    fontSize: 17
  },
  Button: {
    width: "90%",
    height: 55,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    fontWeight: "bold",
    color: "dimgray",
    fontSize: 17,
  },
  Icon: {
    marginLeft: 30,
    marginBottom: 20,
    alignSelf: 'left',
  },
  Text: {
    fontWeight: "normal",
    fontSize: 17,
    fontWeight: 'bold',
    color: "white",
    marginTop: 30,
    marginLeft: 25,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'dimgray',
    borderWidth: 5,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  }
});