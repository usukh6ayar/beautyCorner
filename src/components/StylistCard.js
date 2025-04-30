import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StylistCard = ({ stylist }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: stylist.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{stylist.name}</Text>
        <View style={styles.specialtyContainer}>
          <Ionicons name="briefcase-outline" size={12} color="#666" />
          <Text style={styles.specialty}>{stylist.specialty}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{stylist.rating}</Text>
          </View>
          <View style={styles.experience}>
            <Ionicons name="time-outline" size={12} color="#666" />
            <Text style={styles.experienceText}>{stylist.experience}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bookButton}>
        <Ionicons name="calendar-outline" size={16} color="#ff4b8d" />
        <Text style={styles.bookButtonText}>Цаг авах</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 8,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 75, 141, 0.1)",
  },
  content: {
    alignItems: "center",
    marginTop: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  specialtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  specialty: {
    fontSize: 12,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  experience: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  experienceText: {
    fontSize: 12,
    color: "#666",
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "rgba(255, 75, 141, 0.1)",
    padding: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ff4b8d",
  },
});

export default StylistCard;
