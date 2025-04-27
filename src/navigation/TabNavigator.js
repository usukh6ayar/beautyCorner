import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServicesScreen";
import StylistsScreen from "../screens/StylistsScreen";
import AppointmentsScreen from "../screens/AppointmentsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Services":
              iconName = focused ? "cut" : "cut-outline";
              break;
            case "Stylists":
              iconName = focused ? "people" : "people-outline";
              break;
            case "Appointments":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#ff4b8d",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 24 : 12,
          left: 20,
          right: 20,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 20,
          height: 70,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Нүүр" }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{ title: "Үйлчилгээ" }}
      />
      <Tab.Screen
        name="Stylists"
        component={StylistsScreen}
        options={{ title: "Мэргэжилтэн" }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ title: "Захиалга" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Профайл" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
