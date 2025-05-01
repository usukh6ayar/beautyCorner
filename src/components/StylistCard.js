import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StylistCard = ({ stylist }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9}>
      <Image source={{ uri: stylist.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{stylist.name}</Text>

        <View style={styles.specialtyContainer}>
          <Ionicons name="briefcase-outline" size={14} color="#888" />
          <Text style={styles.specialty}>{stylist.specialty}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{stylist.rating}</Text>
          </View>
          <View style={styles.experience}>
            <Ionicons name="time-outline" size={14} color="#888" />
            <Text style={styles.experienceText}>{stylist.experience}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.bookButton}>
        <Ionicons name="calendar-outline" size={16} color="#fff" />
        <Text style={styles.bookButtonText}>Цаг авах</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 10,
    marginRight: 15,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#ff4b8d20",
  },
  content: {
    alignItems: "center",
    marginTop: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  specialtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  specialty: {
    fontSize: 13,
    color: "#777",
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 12,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  experience: {
    flexDirection: "row",
    alignItems: "center",
  },
  experienceText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#666",
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    backgroundColor: "#ff4b8d",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
    marginLeft: 6,
  },
});

export default StylistCard;
