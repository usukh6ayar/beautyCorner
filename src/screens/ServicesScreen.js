import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { services } from "../mockData/services";
import ServiceCard from "../components/ServiceCard";
const ServicesScreen = ({ navigation }) => {
  const categories = [...new Set(services.map((service) => service.category))];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Үйлчилгээнүүд</Text>
        <Text style={styles.headerSubtitle}>
          Манай олон төрлийн гоо сайхны үйлчилгээнүүдээс сонгоорой
        </Text>
      </View>

      {/* Categories and Services */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            <View style={styles.servicesGrid}>
              {services
                .filter((service) => service.category === category)
                .map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onPress={() => navigation.navigate("Booking", { service })}
                  />
                ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  categorySection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default ServicesScreen;
