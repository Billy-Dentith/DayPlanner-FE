import React, { useContext } from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import DayPlanner from "../screens/DayPlanner";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../firebase/firebase";
import ProfileNavigator from "./ProfileNavigator";
import PopularSights from "../screens/PopularSights";

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {backgroundColor:'#B0D9E8'},
          headerTitleAlign: "center",
          headerTitleStyle:{color: '#17343E'},
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Day Planner"
        component={DayPlanner}
        options={{
          headerStyle: {backgroundColor:'#B0D9E8'},
          headerTitleAlign: "center",
          headerTitleStyle:{color: '#17343E'},
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Popular Sights"
        component={PopularSights}
        options={{
          headerStyle: {backgroundColor:'#B0D9E8'},
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flame" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
