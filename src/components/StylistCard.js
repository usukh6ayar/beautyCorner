import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StylistCard = ({ stylist }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: stylist.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{stylist.name}</Text>
        <Text style={styles.specialty}>{stylist.specialty}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{stylist.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  content: {
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  specialty: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  rating: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 4,
  },
});

export default StylistCard;
