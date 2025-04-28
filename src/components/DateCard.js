import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const DateCard = ({ day, date, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.day, isSelected && styles.selectedDay]}>{day}</Text>
      <Text style={[styles.date, isSelected && styles.selectedDate]}>
        {date}
      </Text>
    </TouchableOpacity>
  );
};

export default DateCard;

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: "#FF6C6C",
  },
  day: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  selectedDay: {
    color: "#FFF",
  },
  selectedDate: {
    color: "#FFF",
  },
});
