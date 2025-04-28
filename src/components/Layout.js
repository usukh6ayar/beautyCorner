import React from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { theme } from "../constants/theme";

export const Layout = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
