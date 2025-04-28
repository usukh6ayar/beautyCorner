import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const TimeCard = ({ time, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.timeText, isSelected && styles.selectedTimeText]}>
        {time}
      </Text>
    </TouchableOpacity>
  );
};

export default TimeCard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    marginRight: 10,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: "#FF6C6C",
  },
  timeText: {
    fontSize: 16,
    color: "#555",
  },
  selectedTimeText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
