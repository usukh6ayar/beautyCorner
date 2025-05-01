import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "../providers/ThemeProvider";

const CustomButton = ({ title, onPress }) => {
  const { colors, spacing, borderRadius } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: colors.primary,
          padding: spacing[4],
          borderRadius: borderRadius.medium,
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.common.white }]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default CustomButton;
