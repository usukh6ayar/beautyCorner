import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { appointments } from "../mockData/appointments";

const TABS = ["Upcoming", "Completed", "Cancelled"];

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
    // simulate cancel
    setCancelModalVisible(false);
    setSuccessModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ marginTop: 12 }}>
        <Text style={styles.salon}>{item.salonName}</Text>
        <Text style={styles.details}>
          {item.date} - {item.time}
        </Text>
        <Text style={styles.details}>{item.location}</Text>
        <Text style={styles.details}>
          Services: ${item.price} | {item.duration} min
        </Text>
      </View>
      <View style={styles.buttons}>
        {activeTab === "Upcoming" ? (
          <>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                setSelectedId(item.id);
                setCancelModalVisible(true);
              }}
            >
              <Text style={styles.btnText}>Cancel Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.receiptBtn}>
              <Text style={styles.btnText}>View Receipt</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.receiptBtn}>
            <Text style={styles.btnText}>View Receipt</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={activeTab === tab ? styles.activeTab : styles.tab}
          >
            <Text
              style={activeTab === tab ? styles.activeTabText : styles.tabText}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Cancel Modal */}
      <Modal visible={cancelModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cancel Booking?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to cancel? Canceling your appointment will
              remove it from your upcoming bookings.
            </Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={handleCancelBooking}
              >
                <Text style={styles.btnText}>Yes, Cancel Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.receiptBtn}
                onPress={() => setCancelModalVisible(false)}
              >
                <Text style={styles.btnText}>Keep Appointment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Booking Canceled</Text>
            <Text style={styles.modalText}>
              Your appointment has been successfully canceled.
            </Text>
            <TouchableOpacity
              style={styles.receiptBtn}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.btnText}>Back to Bookings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F2F2F2",
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    color: "#888",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  salon: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  details: {
    color: "#555",
    marginTop: 2,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  cancelBtn: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  receiptBtn: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalBtns: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  modalText: {
    color: "#555",
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
  },
});
