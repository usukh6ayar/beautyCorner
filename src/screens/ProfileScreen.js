import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { user } from "../mockData/user";
// Import icons from react-native-vector-icons
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../providers/ThemeProvider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ThemeToggle from "../components/ThemeToggle";

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const { colors, spacing } = useTheme();

  // Helper function to render the right icon from the right library
  const renderIcon = (iconName, size = 20, color = "#ff4b8d") => {
    if (iconName === "mail") {
      return <Ionicons name="mail-outline" size={size} color={color} />;
    } else if (iconName === "phone") {
      return <Ionicons name="call-outline" size={size} color={color} />;
    } else if (iconName === "location") {
      return <Ionicons name="location-outline" size={size} color={color} />;
    } else if (iconName === "card") {
      return <FontAwesome name="credit-card" size={size} color={color} />;
    } else if (iconName === "camera") {
      return <Ionicons name="camera" size={size} color={color} />;
    } else if (iconName === "bell") {
      return (
        <Ionicons name="notifications-outline" size={size} color={color} />
      );
    } else if (iconName === "lock") {
      return <Ionicons name="lock-closed-outline" size={size} color={color} />;
    } else if (iconName === "help-circle") {
      return <Ionicons name="help-circle-outline" size={size} color={color} />;
    } else if (iconName === "chevron-right") {
      return <Ionicons name="chevron-forward" size={size} color={color} />;
    }
    return null;
  };

  const renderInfoItem = (icon, label, value) => (
    <View style={styles.infoItem}>
      <View style={styles.iconContainer}>{renderIcon(icon)}</View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.screenBackground }]}
    >
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: colors.screenBackground },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Профайл
        </Text>
        <View style={styles.headerActions}>
          <ThemeToggle />
        </View>
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f7f7" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.coverPhoto} />

          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              {renderIcon("camera", 16, "#fff")}
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Premium Гишүүн</Text>
          </View>
        </View>

        {/* Content Area */}
        <View style={styles.contentCard}>
          {activeTab === "personal" ? (
            <>
              <Text style={styles.contentTitle}>Хувийн мэдээлэл</Text>

              {renderInfoItem("mail", "Имэйл", user.email)}
              {renderInfoItem("phone", "Утас", user.phone)}
              {renderInfoItem("location", "Хаяг", "Улаанбаатар, Монгол")}
              {renderInfoItem("card", "Төлбөрийн хэлбэр", "Visa **** 3452")}

              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Мэдээлэл засварлах</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.favoritesContainer}>
              <Text style={styles.contentTitle}>Миний дуртай</Text>
              <Text style={styles.emptyStateText}>
                Таны дуртай зүйлс одоогоор хоосон байна
              </Text>
            </View>
          )}
        </View>

        {/* Settings Section */}
        <View style={styles.settingsCard}>
          <Text style={styles.contentTitle}>Тохиргоо</Text>

          <TouchableOpacity style={styles.settingsItem}>
            {renderIcon("bell", 20, "#555")}
            <Text style={styles.settingsText}>Мэдэгдлүүд</Text>
            <View style={styles.spacer} />
            {renderIcon("chevron-right", 18, "#bbb")}
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            {renderIcon("lock", 20, "#555")}
            <Text style={styles.settingsText}>Нууцлал</Text>
            <View style={styles.spacer} />
            {renderIcon("chevron-right", 18, "#bbb")}
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            {renderIcon("help-circle", 20, "#555")}
            <Text style={styles.settingsText}>Тусламж</Text>
            <View style={styles.spacer} />
            {renderIcon("chevron-right", 18, "#bbb")}
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Гарах</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingBottom: 24,
  },
  coverPhoto: {
    height: 140,
    width: "100%",
    backgroundColor: "#ff4b8d20",
  },
  avatarContainer: {
    marginTop: -50,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },
  editAvatarButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#ff4b8d",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginTop: 12,
  },
  statusBadge: {
    backgroundColor: "#ff4b8d15",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 8,
  },
  statusText: {
    color: "#ff4b8d",
    fontSize: 12,
    fontWeight: "600",
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#ff4b8d",
  },
  tabText: {
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#ff4b8d10",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: "#999",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  editButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  favoritesContainer: {
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  settingsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingsText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 16,
  },
  spacer: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "#ff4b8d",
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 30,
    alignItems: "center",
    shadowColor: "#ff4b8d",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
