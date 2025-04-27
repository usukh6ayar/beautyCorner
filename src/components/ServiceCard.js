import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ServiceCard = ({ service, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: service.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{service.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₮{service.price}</Text>
          <Text style={styles.duration}>{service.duration} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 100,
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ff4b8d",
  },
  duration: {
    fontSize: 12,
    color: "#666",
  },
});

export default ServiceCard;
