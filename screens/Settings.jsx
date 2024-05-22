import {
    StyleSheet,
    Text,
    ScrollView,
  } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext, auth } from "../firebase/firebase";
import PreferencesForm from "../components/PreferencesForm";
import SettingsForm from "../components/SettingsForm";

export default function SettingsScreen() {
    const { user } = useContext(AuthContext);

    return (
        <ScrollView>
          <Text style={styles.title}>Map Preferences</Text>
            <PreferencesForm></PreferencesForm>
          <Text style={styles.title}>User Settings</Text>
            <SettingsForm></SettingsForm>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'left',
    marginLeft: 15,
    marginTop: 20,
    color: "dimgray",
},
})