import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const VerifyScreen = () => {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) {
      return;
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleContinue = () => {
    const enteredCode = code.join("");
    const validCode = ""; // Жишээ код

    if (enteredCode === validCode) {
      setError(false);
      navigation.navigate("Main");
    } else {
      setError(true);
    }
  };

  const handleResend = () => {
    Alert.alert("Code resent", "We’ve sent a new code to your phone.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Identity</Text>
      <Text style={styles.subtitle}>
        We’ve sent a 4-digit code to 976xxxxxxx
      </Text>

      <View style={styles.inputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el)}
            style={[styles.input, error && styles.inputError]}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>

      {error && (
        <Text style={styles.errorText}>The code you entered is incorrect.</Text>
      )}

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn’t receive a code?
        <Text style={styles.resendLink} onPress={handleResend}>
          Resend
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 24,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 12,
  },
  continueBtn: {
    backgroundColor: "#0066FF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  resendText: {
    textAlign: "center",
    color: "#555",
  },
  resendLink: {
    color: "#0066FF",
    fontWeight: "600",
  },
});

export default VerifyScreen;
