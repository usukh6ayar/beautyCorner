import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../providers/ThemeProvider"; // Шинээр нэмэх

const CustomHeader = ({ title, showBackButton = true, rightComponent }) => {
  const router = useRouter();
  const { colors, spacing } = useTheme(); // Theme-ээс утга авах

  const handleGoBack = () => {
    if (router?.back) {
      router.back();
    }
  };

  return (
    <View
      style={[
        styles.header,
        {
          paddingHorizontal: spacing[4], // 16px
          paddingVertical: spacing[3], // 12px
          backgroundColor: colors.white,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.secondary} />
          </TouchableOpacity>
        )}
      </View>

      <Text
        style={[styles.title, { color: colors.secondary }]}
        numberOfLines={1}
      >
        {title}
      </Text>

      <View style={styles.rightContainer}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    alignItems: "flex-end",
  },
  backButton: {
    padding: 8, // Шууд утгаар бичих
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
});

export default CustomHeader;
