import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings'
import { Ionicons } from '@expo/vector-icons'

const Stack = createStackNavigator();

function ProfileNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={({ navigation }) => ({
          title: 'Profile',
          headerRight: () => (
            <Ionicons
              onPress={() => 
                navigation.navigate('Settings')}
              name="settings-outline"
              color={"dimgray"}
              size={30}
              paddingRight={15} 
              paddingBottom={5}
            />
          ),
        })}
      />
      <Stack.Screen 
        name="Settings" 
        component={Settings} 
        options={({ navigation }) => ({
          title: 'Settings',
          headerLeft: () => (
            <Ionicons
              onPress={() => 
                navigation.navigate('Profile')}
              name="arrow-back-circle-outline"
              color={"dimgray"}
              size={30}
              paddingLeft={15}
              paddingBottom={5}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;