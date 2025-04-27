import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CategoryCard = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, isSelected && styles.selectedIcon]}>
        <Ionicons
          name={category.icon}
          size={22}
          color={isSelected ? "#fff" : "#ff4b8d"}
        />
      </View>
      <Text style={[styles.name, isSelected && styles.selectedText]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selected: {
    backgroundColor: "#ff4b8d",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 75, 141, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  selectedText: {
    color: "#fff",
  },
});

export default CategoryCard;
