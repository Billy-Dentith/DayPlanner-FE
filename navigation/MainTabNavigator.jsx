import React, { useContext } from 'react';
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import DayPlanner from '../screens/DayPlanner';
import Profile from '../screens/Profile';
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../firebase/firebase';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const { handleSignOut } = useContext(AuthContext)

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <Button
              onPress={handleSignOut}
              title="Logout"
              color="#e74c3c"
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Day Planner" 
        component={DayPlanner}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
          headerRight: () => (
            <Button
              onPress={handleSignOut}
              title="Logout"
              color="#e74c3c"
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerRight: () => (
            <Button
              onPress={handleSignOut}
              title="Logout"
              color="#e74c3c"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;