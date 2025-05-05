import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const SalonDetailScreen = ({ route, navigation }) => {
  const { salon } = route.params; // Navigation-аас дамжуулсан салон мэдээллийг авна.

  return (
    <ScrollView style={styles.container}>
      {/* Салоны зураг */}
      <Image source={{ uri: salon.image }} style={styles.image} />

      {/* Салоны нэр */}
      <Text style={styles.title}>{salon.name}</Text>

      {/* Салоны товч мэдээлэл */}
      <Text style={styles.address}>{salon.address}</Text>
      <Text style={styles.description}>{salon.description}</Text>

      {/* Үйлчилгээнүүд */}
      <Text style={styles.sectionTitle}>Services</Text>
      {salon.services.map((service, index) => (
        <View key={index} style={styles.serviceCard}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.servicePrice}>${service.price}</Text>
        </View>
      ))}

      {/* Booking товч */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate("BookingScreen", { salon })}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  image: { width: "100%", height: 200, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 8 },
  address: { fontSize: 16, color: "#777" },
  description: { fontSize: 14, color: "#555", marginVertical: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
  serviceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  serviceName: { fontSize: 16 },
  servicePrice: { fontSize: 16, fontWeight: "bold" },
  bookButton: {
    backgroundColor: "#ff6347",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  bookButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default SalonDetailScreen;
