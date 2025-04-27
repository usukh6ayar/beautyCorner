import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CategoryCard = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selected: {
    backgroundColor: "#ff4b8d",
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    marginTop: 4,
  },
  selectedText: {
    color: "#fff",
  },
});

export default CategoryCard;
