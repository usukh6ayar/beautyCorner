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
import { useNavigation } from "@react-navigation/native";

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState("Удахгүй");
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();

  const filteredAppointments = appointments.filter((item) => {
    if (activeTab === "Удахгүй")
      return (
        item.status === "Баталгаажсан" || item.status === "Хүлээгдэж байна"
      );
    if (activeTab === "Дууссан") return item.status === "Дууссан";
    if (activeTab === "Цуцлагдсан") return item.status === "Цуцлагдсан";
  });

  const handleCancelBooking = () => {
    setCancelModalVisible(false);
    setSuccessModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>
          {item.date} - {item.time}
        </Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "Цуцлагдсан" && styles.cancelledBadge,
            item.status === "Дууссан" && styles.completedBadge,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.appointmentDetails}>
        <Image source={{ uri: item.image }} style={styles.salonImage} />
        <View style={styles.salonInfo}>
          <Text style={styles.salonName}>{item.salonName}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <Text numberOfLines={1} style={styles.servicesText}>
            {item.services}
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        {activeTab === "Удахгүй" ? (
          <>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setSelectedId(item.id);
                setCancelModalVisible(true);
              }}
            >
              <Text style={styles.cancelButtonText}>Цуцлах</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>Дэлгэрэнгүй</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Баримт харах</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Миний захиалгууд</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabs}>
          {["Удахгүй", "Дууссан", "Цуцлагдсан"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
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
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <Ionicons name="warning" size={32} color="#fff" />
            </View>
            <Text style={styles.modalTitle}>Захиалга цуцлах</Text>
            <Text style={styles.modalText}>
              Та захиалгаа цуцлахдаа итгэлтэй байна уу?
            </Text>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleCancelBooking}
            >
              <Text style={styles.confirmButtonText}>Тийм, цуцлах</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButtonModal}
              onPress={() => setCancelModalVisible(false)}
            >
              <Text style={styles.cancelButtonTextModal}>Болих</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[styles.modalIcon, styles.successIcon]}>
              <Ionicons name="checkmark" size={32} color="#fff" />
            </View>
            <Text style={styles.modalTitle}>Амжилттай цуцлагдлаа</Text>
            <Text style={styles.modalText}>
              Таны захиалга амжилттай цуцлагдлаа
            </Text>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Ойлголоо</Text>
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
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  statusBadge: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  cancelledBadge: {
    backgroundColor: "#ffebee",
  },
  completedBadge: {
    backgroundColor: "#e8f5e9",
  },
  appointmentDetails: {
    flexDirection: "row",
    padding: 16,
  },
  salonImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
  },
  salonInfo: {
    flex: 1,
  },
  salonName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  servicesText: {
    fontSize: 14,
    color: "#666",
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff4b8d",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#ff4b8d",
    fontWeight: "600",
    fontSize: 14,
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#ff4b8d",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    alignItems: "center",
  },
  modalIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ff4b8d",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successIcon: {
    backgroundColor: "#4CAF50",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  modalText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  confirmButton: {
    backgroundColor: "#ff4b8d",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  cancelButtonModal: {
    width: "100%",
    padding: 16,
    alignItems: "center",
  },
  cancelButtonTextModal: {
    color: "#666",
    fontWeight: "500",
    fontSize: 14,
  },
  tabContainer: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tab: {
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  activeTabText: {
    color: "#ff4b8d",
    fontWeight: "700",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    letterSpacing: 0.3,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "70%",
    backgroundColor: "#ff4b8d",
    borderRadius: 2,
  },
});
