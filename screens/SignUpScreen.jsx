import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword } from "@firebase/auth";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [avatar, setAvatar] = useState(null);
  const [errMessage, setErrorMessage] = useState("");


  function navigate() {
    navigation.navigate("Sign In")
  }

  const validateForm = () => {
    const formInputs = [name, email, password, confirmPassword];
    const passwordsMatch = password === confirmPassword;

    if (formInputs.includes("") || formInputs.includes(undefined)) {
      setErrorMessage("Please fill in all fields");
    }

    if (!passwordsMatch) {
      setErrorMessage("Passwords do not match")
    }

    if (passwordsMatch) {
      createUserWithEmailAndPassword(auth, email, password).then(() => {
        addUserToDatabase()
      })
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

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
            onChangeText={setName}
            value={name}
            placeholder={"Full Name*"}
            placeholderTextColor={"white"}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={setEmail}
            placeholder={"Email Address*"}
            value={email}
            placeholderTextColor={"white"}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={setPassword}
            placeholder={"Password*"}
            value={password}
            secureTextEntry={true}
            placeholderTextColor={"white"}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={setConfirmPassword}
            placeholder={"Confirm Password*"}
            value={confirmPassword}
            secureTextEntry={true}
            placeholderTextColor={"white"}
            style={styles.TextInput}
          />
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
          <TouchableOpacity onPress={validateForm} style={styles.Button}>
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
  }
});