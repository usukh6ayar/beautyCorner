import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");

  const handleContinue = () => {
    if (input.trim() !== "") {
      navigation.navigate("Verify");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/adaptive-icon.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>
          Book Your Perfect{"\n"}Look in Minutes!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email or phone"
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or Continue with</Text>

        {/* <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialBtn}>
            <Image
              source={require("../../assets/google.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  container: {
    backgroundColor: "white",
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  continueBtn: {
    backgroundColor: "#3366FF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginVertical: 16,
    color: "#666",
  },
  socialContainer: {
    alignItems: "center",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    fontSize: 14,
    color: "#333",
  },
});

export default LoginScreen;
