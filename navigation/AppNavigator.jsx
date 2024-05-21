import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { onAuthStateChanged } from '@firebase/auth';
import { AuthContext, auth } from '../firebase/firebase';

const Stack = createStackNavigator();

function AppNavigator() {
  const { user } = useContext(AuthContext)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;