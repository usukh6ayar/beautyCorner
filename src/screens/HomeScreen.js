import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { salons } from "../mockData/salons";
import { services } from "../mockData/services";
import { stylists } from "../mockData/stylists";
import SalonCard from "../components/SalonCard";
import ServiceCard from "../components/ServiceCard";
import StylistCard from "../components/StylistCard";

const HomeScreen = ({ navigation }) => {
  const featuredSalons = salons.filter((salon) => salon.featured);
  const popularServices = services.slice(0, 4);
  const topStylists = stylists.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Jessica!</Text>
            <Text style={styles.subtitle}>
              Find and book your beauty services
            </Text>
          </View>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={() => console.log("Notifications")}
          >
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => console.log("Search")}
        >
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchText}>Search salons, services...</Text>
        </TouchableOpacity>

        {/* Featured Salons */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Salons</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Services")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </ScrollView>
        </View>

        {/* Popular Services */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Services")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.serviceGrid}>
            {popularServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onPress={() => navigation.navigate("Booking", { service })}
              />
            ))}
          </View>
        </View>

        {/* Top Stylists */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Stylists</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Stylists")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {topStylists.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} />
            ))}
          </ScrollView>
        </View>

        {/* Promotions */}
        <View style={styles.promotionContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/400x150" }}
            style={styles.promotionImage}
          />
          <View style={styles.promotionContent}>
            <Text style={styles.promotionTitle}>Special Offer</Text>
            <Text style={styles.promotionDescription}>
              Get 20% off on all hair services this week!
            </Text>
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchText: {
    marginLeft: 10,
    color: "#999",
    fontSize: 15,
  },
  sectionContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#ff4b8d",
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  promotionContainer: {
    marginTop: 25,
    marginBottom: 30,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promotionImage: {
    width: "100%",
    height: 150,
  },
  promotionContent: {
    padding: 15,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  promotionDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  promotionButton: {
    backgroundColor: "#ff4b8d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  promotionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
