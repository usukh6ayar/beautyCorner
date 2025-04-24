import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SalonCard = ({ salon }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: salon.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{salon.name}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.address} numberOfLines={1}>
            {salon.address}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{salon.rating}</Text>
          <Text style={styles.reviews}>({salon.reviews} reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  address: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
    flex: 1,
  },
  rating: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 4,
  },
  reviews: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
});

export default SalonCard;
