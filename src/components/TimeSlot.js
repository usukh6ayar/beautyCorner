import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TimeSlot = ({ time, isSelected, isAvailable = true, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        !isAvailable && styles.unavailableContainer,
      ]}
      onPress={() => isAvailable && onSelect(time)}
      disabled={!isAvailable}
    >
      <Text
        style={[
          styles.timeText,
          isSelected && styles.selectedText,
          !isAvailable && styles.unavailableText,
        ]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedContainer: {
    backgroundColor: "#ff4b8d",
  },
  unavailableContainer: {
    backgroundColor: "#f5f5f5",
  },
  timeText: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
  unavailableText: {
    color: "#999",
  },
});

export default TimeSlot;
