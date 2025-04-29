import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View, StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import AppointmentsScreen from "../screens/AppointmentsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Appointments":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "Favorites":
              iconName = focused ? "heart" : "heart-outline";
              break;
            case "Profile":
              iconName = focused ? "person-circle" : "person-circle-outline";
              break;
          }

          return (
            <View style={[styles.iconWrapper, focused && styles.iconFocused]}>
              <Ionicons
                name={iconName}
                size={focused ? 22 : 22}
                color={focused ? "#ff4b8d" : "gray"}
              />
            </View>
          );
        },
        tabBarActiveTintColor: "#ff4b8d",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{title: "Нүүр"}} />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{ title: "Захиалга" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Дуртай" }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{title: "Профайл"}} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 40,
    borderRadius: 12,
    paddingX:10,
  },
  tabBarStyle: {
    display: "flex",
    position: "relative",
    height: 80,
    // bottom: Platform.OS === "ios" ? 10 : 10,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: 20,
    paddingBottom: Platform.OS === "ios" ? 28 : 16, // Доод зайг нэмэх
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    borderTopWidth: 0,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default TabNavigator;
