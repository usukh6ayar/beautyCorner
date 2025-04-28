import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { appointments } from "../mockData/appointments";
import AppointmentCard from "../components/AppointmentCard";

const AppointmentsScreen = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Баталгаажсан":
        return "#4CAF50";
      case "Хүлээгдэж байна":
        return "#FFC107";
      case "Дууссан":
        return "#9E9E9E";
      default:
        return "#666";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Миний захиалгууд</Text>
        <Text style={styles.headerSubtitle}>
          Захиалсан үйлчилгээнүүдээ хянах{" "}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onPress={() => handleAppointmentPress(appointment)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  appointmentCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
  },
  appointmentDetails: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  time: {
    fontSize: 15,
    color: "#333",
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ff4b8d",
  },
});

export default AppointmentsScreen;
