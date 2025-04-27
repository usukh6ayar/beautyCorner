import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { stylists } from "../mockData/stylists";

const StylistsScreen = ({ navigation }) => {
  const renderStylist = ({ item }) => (
    <TouchableOpacity
      style={styles.stylistCard}
      onPress={() => navigation.navigate("StylistDetail", { stylist: item })}
    >
      <Image source={{ uri: item.image }} style={styles.stylistImage} />
      <View style={styles.stylistInfo}>
        <Text style={styles.stylistName}>{item.name}</Text>
        <Text style={styles.stylistSpecialty}>{item.specialty}</Text>
        <Text style={styles.stylistExperience}>
          {item.experience} years experience
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Our Stylists</Text>
          <Text style={styles.headerSubtitle}>
            Meet our experienced professionals
          </Text>
        </View>

        <FlatList
          data={stylists}
          renderItem={renderStylist}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
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
  listContainer: {
    padding: 16,
  },
  stylistCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stylistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  stylistInfo: {
    marginLeft: 16,
    flex: 1,
  },
  stylistName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  stylistSpecialty: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  stylistExperience: {
    fontSize: 12,
    color: "#888",
  },
});

export default StylistsScreen;
