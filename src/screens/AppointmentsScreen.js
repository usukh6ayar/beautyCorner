import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { appointments } from "../mockData/appointments";

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const filteredAppointments = appointments.filter((item) => {
    if (activeTab === "Upcoming")
      return (
        item.status === "Баталгаажсан" || item.status === "Хүлээгдэж байна"
      );
    if (activeTab === "Completed") return item.status === "Дууссан";
    if (activeTab === "Cancelled") return item.status === "Цуцлагдсан";
  });

  const handleCancelBooking = () => {
    // Simulate cancellation
    setCancelModalVisible(false);
    setSuccessModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.appointmentDate}>
        <Text style={styles.dateText}>
          {item.date} - {item.time}
        </Text>
        {item.status === "Цуцлагдсан" && (
          <Text style={styles.cancelledTag}>Cancelled</Text>
        )}
      </View>

      <View style={styles.appointmentDetails}>
        <Image source={{ uri: item.image }} style={styles.salonImage} />

        <View style={styles.salonInfo}>
          <Text style={styles.salonName}>{item.salonName}</Text>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.servicesText}>Services: {item.services}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        {activeTab === "Upcoming" ? (
          <>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setSelectedId(item.id);
                setCancelModalVisible(true);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Receipt</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.viewButton, styles.fullWidthButton]}>
            <Text style={styles.viewButtonText}>View Receipt</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Upcoming" && styles.activeTab]}
            onPress={() => setActiveTab("Upcoming")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Upcoming" && styles.activeTabText,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "Completed" && styles.activeTab]}
            onPress={() => setActiveTab("Completed")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Completed" && styles.activeTabText,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "Cancelled" && styles.activeTab]}
            onPress={() => setActiveTab("Cancelled")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Cancelled" && styles.activeTabText,
              ]}
            >
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Appointment List */}
      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Cancel Confirmation Modal */}
      <Modal visible={cancelModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.cancelModal}>
            <Text style={styles.cancelModalTitle}>Cancel Booking</Text>
            <Text style={styles.cancelModalText}>
              Are you sure you want to cancel?
            </Text>
            <Text style={styles.cancelModalSubtext}>
              Canceling your appointment will remove it from your upcoming
              bookings.
            </Text>

            <TouchableOpacity
              style={styles.yesButton}
              onPress={handleCancelBooking}
            >
              <Text style={styles.yesButtonText}>Yes, Cancel Booking</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keepButton}
              onPress={() => setCancelModalVisible(false)}
            >
              <Text style={styles.keepButtonText}>Keep Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={32} color="#fff" />
            </View>
            <Text style={styles.successTitle}>Booking Cancelled</Text>
            <Text style={styles.successText}>
              Your appointment has been successfully cancelled.
            </Text>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.backButtonText}>Back to Bookings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  tabContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4285F4",
  },
  tabText: {
    color: "#888",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#4285F4",
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
  },
  cancelledTag: {
    color: "#FF3B30",
    fontWeight: "500",
  },
  appointmentDetails: {
    flexDirection: "row",
    padding: 16,
  },
  salonImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  salonInfo: {
    marginLeft: 12,
    flex: 1,
  },
  salonName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 2,
  },
  servicesText: {
    fontSize: 14,
    color: "#888",
  },
  actionButtons: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F2F2F2",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4285F4",
    borderRadius: 8,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#4285F4",
    fontWeight: "600",
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#4285F4",
    borderRadius: 8,
    paddingVertical: 10,
    marginLeft: 8,
    alignItems: "center",
  },
  fullWidthButton: {
    marginLeft: 0,
    marginRight: 0,
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelModal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
  },
  cancelModalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  cancelModalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  cancelModalSubtext: {
    fontSize: 14,
    color: "#888",
    marginBottom: 24,
  },
  yesButton: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  yesButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  keepButton: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  keepButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  successModal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  successIcon: {
    backgroundColor: "#4285F4",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  successText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
