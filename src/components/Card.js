import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../constants/theme";

const Card = ({
  children,
  onPress,
  style,
  elevation = "small",
  padding = "medium",
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.card, styles[padding], theme.shadows[elevation], style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
  },
  small: {
    padding: theme.spacing.sm,
  },
  medium: {
    padding: theme.spacing.md,
  },
  large: {
    padding: theme.spacing.lg,
  },
});

export default Card;
