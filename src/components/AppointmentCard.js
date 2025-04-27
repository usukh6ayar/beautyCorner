import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AppointmentCard = ({ appointment, onPress }) => {
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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <Text style={styles.date}>{appointment.date}</Text>
        </View>
        <Text
          style={[styles.status, { color: getStatusColor(appointment.status) }]}
        >
          {appointment.status}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={18} color="#666" />
          <Text style={styles.infoText}>{appointment.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="cut-outline" size={18} color="#666" />
          <Text style={styles.infoText}>{appointment.serviceName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={18} color="#666" />
          <Text style={styles.infoText}>{appointment.stylistName}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>₮{appointment.price}</Text>
        <Text style={styles.duration}>{appointment.duration} мин</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff4b8d",
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
});

export default AppointmentCard;
