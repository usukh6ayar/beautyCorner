import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { salons } from "../mockData/salons";
import { services } from "../mockData/services";
import { stylists } from "../mockData/stylists";
import { categories } from "../mockData/categories";

import SalonCard from "../components/SalonCard";
import ServiceCard from "../components/ServiceCard";
import StylistCard from "../components/StylistCard";
import CategoryCard from "../components/CategoryCard";

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const featuredSalons = salons.filter((salon) => salon.featured);
  const filteredServices =
    selectedCategory === "all"
      ? services.slice(0, 4)
      : services
          .filter((service) => service.category === selectedCategory)
          .slice(0, 4);
  const topStylists = stylists.slice(0, 3);

  const renderCategoryItem = ({ item }) => (
    <CategoryCard
      category={item}
      isSelected={selectedCategory === item.id}
      onPress={() => setSelectedCategory(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Сайн уу, Өсөхбаяр!</Text>
            <Text style={styles.subtitle}>
              Гоо сайхны үйлчилгээгээ одоо захиалаарай
            </Text>
          </View>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchText}>Салон, үйлчилгээ хайх...</Text>
        </TouchableOpacity>

        {/* Promotions */}
        <View style={styles.promotionContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/400x150" }}
            style={styles.promotionImage}
          />
          <View style={styles.promotionContent}>
            <Text style={styles.promotionTitle}>Тусгай санал</Text>
            <Text style={styles.promotionDescription}>
              Энэ долоо хоногт үсний бүх үйлчилгээндээ 20%-ийн хямдрал аваарай!
            </Text>
            <TouchableOpacity style={styles.promotionButton}>
              <Text style={styles.promotionButtonText}>Захиалах</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <FlatList
          data={[
            { id: "all", name: "Бүгд", icon: "grid-outline" },
            ...categories,
          ]}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />

        {/* Recommend Salons */}
        <Section title="Санал болгох салонууд">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </ScrollView>
        </Section>

        {/* Featured Salons */}
        <Section title="Онцлох салонууд">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </ScrollView>
        </Section>

        {/* New Salons */}
        <Section title="Шинээр нэмэгдсэн салонууд">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </ScrollView>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

// Section Component
const Section = ({ title, children, onPress }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.seeAllText}>Бүгд</Text>
        </TouchableOpacity>
      )}
    </View>
    {children}
  </View>
);

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
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff4b8d",
    borderWidth: 1,
    borderColor: "#fff",
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
  categoryContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  categoryList: {
    paddingHorizontal: 20,
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
