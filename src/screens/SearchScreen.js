import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import mock data
import { salons } from "../mockData/salons";
import { services } from "../mockData/services";
import { stylists } from "../mockData/stylists";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // all, salons, services, stylists

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      const query = searchQuery.toLowerCase();

      let results = [];

      if (activeTab === "all" || activeTab === "salons") {
        const filteredSalons = salons
          .filter(
            (salon) =>
              salon.name.toLowerCase().includes(query) ||
              salon.location.toLowerCase().includes(query)
          )
          .map((salon) => ({ ...salon, type: "salon" }));

        if (activeTab === "all") {
          results = [...results, ...filteredSalons];
        } else {
          results = filteredSalons;
        }
      }

      if (activeTab === "all" || activeTab === "services") {
        const filteredServices = services
          .filter(
            (service) =>
              service.name.toLowerCase().includes(query) ||
              service.description.toLowerCase().includes(query)
          )
          .map((service) => ({ ...service, type: "service" }));

        if (activeTab === "all") {
          results = [...results, ...filteredServices];
        } else {
          results = filteredServices;
        }
      }

      if (activeTab === "all" || activeTab === "stylists") {
        const filteredStylists = stylists
          .filter(
            (stylist) =>
              stylist.name.toLowerCase().includes(query) ||
              stylist.specialization.toLowerCase().includes(query)
          )
          .map((stylist) => ({ ...stylist, type: "stylist" }));

        if (activeTab === "all") {
          results = [...results, ...filteredStylists];
        } else {
          results = filteredStylists;
        }
      }

      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  }, [searchQuery, activeTab]);

  const renderTabButton = (tabName, label) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tabName && styles.activeTabButton,
      ]}
      onPress={() => setActiveTab(tabName)}
    >
      <Text
        style={[
          styles.tabButtonText,
          activeTab === tabName && styles.activeTabButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "salon":
        return (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => navigation.navigate("SalonDetail", { salon: item })}
          >
            <Image
              source={{ uri: item.image || "https://via.placeholder.com/60" }}
              style={styles.resultImage}
            />
            <View style={styles.resultInfo}>
              <Text style={styles.resultTitle}>{item.name}</Text>
              <Text style={styles.resultSubtitle}>{item.location}</Text>
              <View style={styles.resultMeta}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.resultMetaText}>{item.rating}</Text>
                <Text style={styles.resultType}>Салон</Text>
              </View>
            </View>
          </TouchableOpacity>
        );

      case "service":
        return (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => navigation.navigate("Booking", { service: item })}
          >
            <Image
              source={{ uri: item.image || "https://via.placeholder.com/60" }}
              style={styles.resultImage}
            />
            <View style={styles.resultInfo}>
              <Text style={styles.resultTitle}>{item.name}</Text>
              <Text style={styles.resultSubtitle}>{item.description}</Text>
              <View style={styles.resultMeta}>
                <Text style={styles.resultPrice}>{item.price}₮</Text>
                <Text style={styles.resultType}>Үйлчилгээ</Text>
              </View>
            </View>
          </TouchableOpacity>
        );

      case "stylist":
        return (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() =>
              navigation.navigate("StylistDetail", { stylist: item })
            }
          >
            <Image
              source={{ uri: item.avatar || "https://via.placeholder.com/60" }}
              style={styles.resultImage}
              borderRadius={30}
            />
            <View style={styles.resultInfo}>
              <Text style={styles.resultTitle}>{item.name}</Text>
              <Text style={styles.resultSubtitle}>{item.specialization}</Text>
              <View style={styles.resultMeta}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.resultMetaText}>{item.rating}</Text>
                <Text style={styles.resultType}>Мэргэжилтэн</Text>
              </View>
            </View>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Салон, үйлчилгээ хайх..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <View style={styles.tabContainer}>
        {renderTabButton("all", "Бүгд")}
        {renderTabButton("salons", "Салонууд")}
        {renderTabButton("services", "Үйлчилгээ")}
        {renderTabButton("stylists", "Мэргэжилтнүүд")}
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff4b8d" />
        </View>
      ) : searchQuery.trim() !== "" && searchResults.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Хайлтын үр дүн олдсонгүй</Text>
          <Text style={styles.emptySubtext}>
            Өөр түлхүүр үг эсвэл шүүлтүүрийг туршиж үзнэ үү
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.type}-${item.id}`}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    padding: 0,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: "#ff4b8d",
  },
  tabButtonText: {
    fontSize: 14,
    color: "#666",
  },
  activeTabButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  resultsList: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  resultSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    marginBottom: 4,
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  resultMetaText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 2,
    marginRight: 12,
  },
  resultType: {
    fontSize: 12,
    color: "#ff4b8d",
    backgroundColor: "#fff0f5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  resultPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginRight: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
});

export default SearchScreen;
