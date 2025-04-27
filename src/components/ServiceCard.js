import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ServiceCard = ({ service, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: service.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{service.name}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.priceContainer}>
            <Ionicons name="pricetag-outline" size={14} color="#ff4b8d" />
            <Text style={styles.price}>₮{service.price}</Text>
          </View>
          <View style={styles.durationContainer}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.duration}>{service.duration} min</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "column",
    gap: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#ff4b8d",
  },
  duration: {
    fontSize: 12,
    color: "#666",
  },
});

export default ServiceCard;
