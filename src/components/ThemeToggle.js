// src/components/ThemeToggle.js
import React, { useEffect } from "react";
import { Pressable, View, Animated, StyleSheet, Platform } from "react-native";
import { useTheme } from "../providers/ThemeProvider";
import Ionicons from "react-native-vector-icons/Ionicons";

const ThemeToggle = () => {
  const { colors, toggleTheme, mode } = useTheme();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  // Анимейшны эхний утгыг тохируулах
  useEffect(() => {
    animatedValue.setValue(mode === "light" ? 0 : 1);
  }, []);

  // Горим өөрчлөгдөхөд анимейшн үүсгэх
  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: mode === "light" ? 0 : 1,
      useNativeDriver: true,
      bounciness: 20,
      speed: 10,
    }).start();
  }, [mode]);

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 24], // Шинэ тооцоолол
  });

  const containerWidth = 52;
  const thumbSize = 24;

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      accessibilityLabel="Toggle theme"
      accessibilityRole="switch"
    >
      // ThemeToggle компонентийг шинэчлэх // src/components/ThemeToggle.js
      <Animated.View
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            transform: [{ translateX: thumbTranslateX }],
            backgroundColor: colors.primary,
            shadowColor: colors.common.black,
          },
        ]}
      >
        <Ionicons
          name={mode === "light" ? "sunny" : "moon"}
          size={16}
          color={colors.common.white}
          style={styles.icon}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 32,
    borderRadius: 16,
    padding: 4,
    justifyContent: "center",
  },
  thumb: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  icon: {
    marginTop: Platform.OS === "android" ? 1 : 0,
  },
});

export default ThemeToggle;
