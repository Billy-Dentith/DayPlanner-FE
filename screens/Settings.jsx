import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Image
  } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import PreferencesForm from "../components/PreferencesForm";
import SettingsForm from "../components/SettingsForm";
import InterestsFilter from "../components/InterestsFilter";
import { AuthContext } from "../context/AuthContext";
import { getUserByUsername } from "../api";

import avatar1 from '../assets/avatars/avatar1.png';
import avatar2 from '../assets/avatars/avatar2.png';
import avatar3 from '../assets/avatars/avatar3.png';
import avatar4 from '../assets/avatars/avatar4.png';

export default function SettingsScreen({ navigation }) {
  const { user, avatar, setAvatar } = useContext(AuthContext);
  const [usersInterests, setUsersInterests] = useState([]);
  const [currentRadius, setCurrentRadius] = useState();

  useEffect(() => {
    getUserByUsername(user.displayName).then((res) => {
      setUsersInterests(res.filters);
      setCurrentRadius(res.settings.searchRadius)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

    return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Map Preferences</Text>
            <PreferencesForm usersInterests={usersInterests} setUsersInterests={setUsersInterests} currentRadius={currentRadius} navigation={navigation}></PreferencesForm>
          <Text style={styles.title}>Change your avatar:</Text>
            {/* <SettingsForm></SettingsForm> */}
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6F848c',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'left',
    marginLeft: 15,
    marginTop: 20,
    color: "white",
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 40,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedAvatar: {
    width: 80,
    height: 80,
    borderColor: 'yellow',
  },
})