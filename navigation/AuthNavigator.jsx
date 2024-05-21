import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Sign In" 
        component={AuthScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Sign Up" 
        component={SignUpScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;