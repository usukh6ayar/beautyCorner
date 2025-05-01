import React, { useCallback } from "react";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");
const PRIMARY_COLOR = "#ff4b8d";
const SECONDARY_COLOR = "#f7f7f7";
const TEXT_DARK = "#333";
const TEXT_LIGHT = "#999";

const iconMap = {
  mail: { name: "mail-outline", lib: Ionicons },
  phone: { name: "call-outline", lib: Ionicons },
  location: { name: "location-outline", lib: Ionicons },
  card: { name: "credit-card", lib: FontAwesome },
  camera: { name: "camera", lib: Ionicons },
  bell: { name: "notifications-outline", lib: Ionicons },
  lock: { name: "lock-closed-outline", lib: Ionicons },
  "help-circle": { name: "help-circle-outline", lib: Ionicons },
  "chevron-right": { name: "chevron-forward", lib: Ionicons },
};

const ProfileScreen = () => {
  const renderIcon = useCallback(
    (iconName, size = 20, color = PRIMARY_COLOR) => {
      const IconComponent = iconMap[iconName]?.lib;
      return IconComponent ? (
        <IconComponent
          name={iconMap[iconName].name}
          size={size}
          color={color}
        />
      ) : null;
    },
    []
  );

  const renderInfoItem = useCallback(
    (icon, label, value) => (
      <View style={styles.infoItem}>
        <View style={styles.iconContainer}>{renderIcon(icon)}</View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {value || "N/A"}
          </Text>
        </View>
      </View>
    ),
    [renderIcon]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={SECONDARY_COLOR} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.coverPhoto} />

          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={() => console.log("Edit avatar pressed")}
            >
              {renderIcon("camera", 16, "#fff")}
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Premium Гишүүн</Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.contentTitle}>Хувийн мэдээлэл</Text>
          {renderInfoItem("mail", "Имэйл", user.email)}
          {renderInfoItem("phone", "Утас", user.phone)}
          {renderInfoItem("location", "Хаяг", "Улаанбаатар, Монгол")}
          {renderInfoItem("card", "Төлбөрийн хэлбэр", "Visa **** 3452")}

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => console.log("Edit info pressed")}
          >
            <Text style={styles.editButtonText}>Мэдээлэл засварлах</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsCard}>
          <Text style={styles.contentTitle}>Тохиргоо</Text>
          {["bell", "lock", "help-circle"].map((icon) => (
            <TouchableOpacity
              key={icon}
              style={styles.settingsItem}
              onPress={() => console.log(`${icon} pressed`)}
            >
              {renderIcon(icon, 20, TEXT_DARK)}
              <Text style={styles.settingsText}>
                {icon === "bell" && "Мэдэгдлүүд"}
                {icon === "lock" && "Нууцлал"}
                {icon === "help-circle" && "Тусламж"}
              </Text>
              <View style={styles.spacer} />
              {renderIcon("chevron-right", 18, "#bbb")}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => console.log("Logout pressed")}
        >
          <Text style={styles.logoutText}>Гарах</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: SECONDARY_COLOR },
  container: { flex: 1 },
  scrollContent: { paddingBottom: 30 },
  profileHeader: { alignItems: "center", paddingBottom: 24 },
  coverPhoto: {
    height: width * 0.4,
    width: "100%",
    backgroundColor: `${PRIMARY_COLOR}20`,
  },
  avatarContainer: { marginTop: -50, position: "relative" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },
  editAvatarButton: {
    position: "absolute",
    right: -4,
    bottom: -4,
    backgroundColor: PRIMARY_COLOR,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: { fontSize: 24, fontWeight: "700", color: TEXT_DARK, marginTop: 12 },
  statusBadge: {
    backgroundColor: `${PRIMARY_COLOR}15`,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 8,
  },
  statusText: { color: PRIMARY_COLOR, fontSize: 12, fontWeight: "600" },
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
    color: TEXT_DARK,
    marginBottom: 16,
  },
  infoItem: { flexDirection: "row", marginBottom: 20, alignItems: "center" },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: `${PRIMARY_COLOR}10`,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContent: { marginLeft: 12, flex: 1 },
  infoLabel: { fontSize: 13, color: TEXT_LIGHT, marginBottom: 2 },
  infoValue: { fontSize: 16, color: TEXT_DARK, fontWeight: "500" },
  editButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: { color: TEXT_DARK, fontWeight: "600", fontSize: 16 },
  settingsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 20,
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
  settingsText: { fontSize: 16, color: TEXT_DARK, marginLeft: 16 },
  spacer: { flex: 1 },
  logoutButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 30,
    alignItems: "center",
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default ProfileScreen;
