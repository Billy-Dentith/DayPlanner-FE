import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth } from "../firebase/firebase";
import { getAllUsers, postUser } from "../api";
import axios from "axios";
import { initialFilter } from "../data/Interests";
import InterestsFilter from "../components/InterestsFilter";
import RNPickerSelect from 'react-native-picker-select'
import { AuthContext } from "../context/AuthContext";

import avatar1 from '../assets/avatars/avatar1.png';
import avatar2 from '../assets/avatars/avatar2.png';
import avatar3 from '../assets/avatars/avatar3.png';
import avatar4 from '../assets/avatars/avatar4.png';

export default function SignUpScreen({ navigation }) {

  const { setAvatar: setContextAvatar } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [userInterestsFilter, setUserInterestsFilter] = useState(initialFilter);
  const [searchRadius, setSearchRadius] = useState(500)
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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        console.log('User created successfully!');

        setContextAvatar(avatar); 

        // Hardcoded lon lat
        await postUser(name, username, searchRadius, -0.140634, 51.501476, userInterestsFilter)

      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(`Failed to get users: ${error.message}`)
    }
  }

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   // console.log(result);

  //   if (!result.canceled) {
  //     setAvatar(result.assets[0].uri);
  //   }
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Ionicons
          onPress={navigate}
          style={styles.icon}
          name="arrow-back-circle-outline"
          color={"white"}
          size={60}
        />
        <Text style={styles.heading}>
          Create your{"\n"}
          account
        </Text>
        <View style={styles.formView}>
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
          <Text style={styles.text}>Choose Your Avatar</Text>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => setAvatar(Image.resolveAssetSource(avatar1).uri)}>
            <Image source={avatar1} style={[styles.avatar, avatar === Image.resolveAssetSource(avatar1).uri && styles.selectedAvatar]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatar(Image.resolveAssetSource(avatar2).uri)}>
            <Image source={avatar2} style={[styles.avatar, avatar === Image.resolveAssetSource(avatar2).uri && styles.selectedAvatar]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatar(Image.resolveAssetSource(avatar3).uri)}>
            <Image source={avatar3} style={[styles.avatar, avatar === Image.resolveAssetSource(avatar3).uri && styles.selectedAvatar]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAvatar(Image.resolveAssetSource(avatar4).uri)}>
            <Image source={avatar4} style={[styles.avatar, avatar === Image.resolveAssetSource(avatar4).uri && styles.selectedAvatar]} />
          </TouchableOpacity>
        </View>
          <Text style={styles.text}>Choose your interests:</Text>
          <View style={styles.interestsContainer}>
            <InterestsFilter filter={userInterestsFilter} setFilter={setUserInterestsFilter}></InterestsFilter>
          </View>
          <Text style={styles.text}>Choose your search radius:</Text>
          <RNPickerSelect
            style={{...pickerStyles}}
            onValueChange={value => setSearchRadius(value)}
            placeholder={{}}
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
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'lightblue',
    paddingTop: 100,
    paddingBottom: 100,
  },
  heading: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 25,
    marginTop: 5,
    alignSelf: 'left',
  },
  formView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  interestsContainer: {
    paddingHorizontal: 10,
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
  button: {
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
  buttonText: {
    fontWeight: "bold",
    color: "dimgray",
    fontSize: 17,
  },
  icon: {
    marginLeft: 30,
    marginBottom: 20,
    alignSelf: 'left',
  },
  text: {
    fontWeight: "normal",
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
    marginTop: 30,
    marginLeft: 25,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedAvatar: {
    width: 100,
    height: 100,
    borderColor: 'yellow',
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
      width: "90%",
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 50,
  }
})