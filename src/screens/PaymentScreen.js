import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "./HomeScreen"; // Adjust the import path as necessary

const PaymentScreen = ({ route, navigation }) => {
  const { service, salon, stylist, date, time } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      id: "card",
      name: "Кредит карт",
      icon: "card-outline",
    },
    {
      id: "qpay",
      name: "QPay",
      icon: "phone-portrait-outline",
    },
    {
      id: "cash",
      name: "Бэлнээр",
      icon: "cash-outline",
    },
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert("Алдаа", "Төлбөрийн хэлбэр сонгоно уу");
      return;
    }

    Alert.alert("Амжилттай", "Таны төлбөр амжилттай хийгдлээ. Баярлалаа!", [
      {
        text: "OK",
        onPress: () => navigation.navigate("HomeScreen"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Төлбөр төлөх</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Захиалгын мэдээлэл</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Үйлчилгээ:</Text>
            <Text style={styles.summaryValue}>{service.name}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Салон:</Text>
            <Text style={styles.summaryValue}>{salon.name}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Мэргэжилтэн:</Text>
            <Text style={styles.summaryValue}>{stylist.name}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Огноо:</Text>
            <Text style={styles.summaryValue}>
              {date.dayNumber} {date.month}, {time}
            </Text>
          </View>
        </View>

        <View style={styles.paymentMethodsCard}>
          <Text style={styles.methodsTitle}>Төлбөрийн хэлбэр</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodItem,
                selectedMethod === method.id && styles.selectedMethod,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodIcon}>
                <Ionicons
                  name={method.icon}
                  size={24}
                  color={selectedMethod === method.id ? "#ff4b8d" : "#666"}
                />
              </View>
              <Text
                style={[
                  styles.methodName,
                  selectedMethod === method.id && styles.selectedMethodText,
                ]}
              >
                {method.name}
              </Text>
              {selectedMethod === method.id && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color="#ff4b8d"
                  style={styles.checkIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.totalCard}>
          <View style={styles.totalItem}>
            <Text style={styles.totalLabel}>Үйлчилгээний төлбөр</Text>
            <Text style={styles.totalValue}>₮{service.price}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalItem}>
            <Text style={styles.grandTotalLabel}>Нийт төлбөр</Text>
            <Text style={styles.grandTotalValue}>₮{service.price}</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Төлбөр төлөх</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  paymentMethodsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  methodsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },
  selectedMethod: {
    backgroundColor: "#fff5f8",
    borderWidth: 1,
    borderColor: "#ff4b8d",
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  methodName: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  selectedMethodText: {
    color: "#ff4b8d",
    fontWeight: "500",
  },
  checkIcon: {
    marginLeft: 10,
  },
  totalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  totalLabel: {
    fontSize: 14,
    color: "#666",
  },
  totalValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 15,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff4b8d",
  },
  payButton: {
    backgroundColor: "#ff4b8d",
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
