import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { appointments } from "../mockData/appointments";

const AppointmentsScreen = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#4CAF50";
      case "pending":
        return "#FFC107";
      case "completed":
        return "#9E9E9E";
      default:
        return "#666";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <Text style={styles.headerSubtitle}>
          Manage your upcoming appointments
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {appointments.map((appointment) => (
          <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Text style={styles.date}>{appointment.date}</Text>
              <Text
                style={[
                  styles.status,
                  { color: getStatusColor(appointment.status) },
                ]}
              >
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.time}>{appointment.time}</Text>
              <Text style={styles.duration}>
                Duration: {appointment.duration} min
              </Text>
              <Text style={styles.price}>Price: ${appointment.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
