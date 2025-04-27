import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { salons } from "../mockData/salons";
import { stylists } from "../mockData/stylists";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingForm from "../components/BookingForm";
import Calendar from "../components/Calendar";
import TimeSlot from "../components/TimeSlot";
import AppointmentCard from "../components/AppointmentCard";

const BookingScreen = ({ route, navigation }) => {
  const { service } = route.params;
  const [selectedSalon, setSelectedSalon] = useState(salons[0]);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSalonSelect = (salon) => {
    setSelectedSalon(salon);
    setCurrentStep(2);
  };

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
    setCurrentStep(3);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentStep(4);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(5);
  };

  const handleConfirmBooking = () => {
    Alert.alert(
      "Баталгаажуулалт",
      "Таны захиалга амжилттай бүртгэгдлээ! Баярлалаа.",
      [
        {
          text: "Төлбөр төлөх",
          onPress: () =>
            navigation.navigate("Payment", {
              service,
              salon: selectedSalon,
              stylist: selectedStylist,
              date: selectedDate,
              time: selectedTime,
            }),
        },
        {
          text: "Хаах",
          onPress: () => navigation.navigate("Appointments"),
        },
      ]
    );
  };

  const renderSalonSelection = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Салон сонгох</Text>
      {salons.map((salon) => (
        <AppointmentCard
          key={salon.id}
          appointment={{
            id: salon.id,
            name: salon.name,
            address: salon.address,
            rating: salon.rating,
            imageUrl: salon.imageUrl,
            workingHours: salon.workingHours,
          }}
          isSelected={selectedSalon?.id === salon.id}
          onPress={() => handleSalonSelect(salon)}
        />
      ))}
    </ScrollView>
  );

  const renderStylistSelection = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Мэргэжилтэн сонгох</Text>
      {stylists.map((stylist) => (
        <AppointmentCard
          key={stylist.id}
          appointment={{
            id: stylist.id,
            name: stylist.name,
            specialty: stylist.specialty,
            rating: stylist.rating,
            imageUrl: stylist.imageUrl,
            experience: stylist.experience,
          }}
          isSelected={selectedStylist?.id === stylist.id}
          onPress={() => handleStylistSelect(stylist)}
        />
      ))}
    </ScrollView>
  );

  const renderDateAndTimeSelection = () => (
    <BookingForm
      selectedDate={selectedDate}
      selectedTime={selectedTime}
      onDateSelect={handleDateSelect}
      onTimeSelect={handleTimeSelect}
      onSubmit={() => setCurrentStep(5)}
    />
  );

  const renderConfirmation = () => (
    <View style={styles.confirmationContainer}>
      <Text style={styles.sectionTitle}>Захиалгын мэдээлэл</Text>

      <View style={styles.serviceInfoCard}>
        <Image source={{ uri: service.imageUrl }} style={styles.serviceImage} />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.servicePrice}>₮{service.price}</Text>
          <Text style={styles.serviceDuration}>{service.duration} мин</Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="business-outline" size={20} color="#666" />
          <Text style={styles.detailLabel}>Салон:</Text>
          <Text style={styles.detailValue}>{selectedSalon?.name}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={20} color="#666" />
          <Text style={styles.detailLabel}>Мэргэжилтэн:</Text>
          <Text style={styles.detailValue}>{selectedStylist?.name}</Text>
        </View>

        {selectedDate && (
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.detailLabel}>Өдөр:</Text>
            <Text style={styles.detailValue}>
              {selectedDate.dayNumber} {selectedDate.month}
            </Text>
          </View>
        )}

        {selectedTime && (
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.detailLabel}>Цаг:</Text>
            <Text style={styles.detailValue}>{selectedTime}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmBooking}
      >
        <Text style={styles.confirmButtonText}>Захиалга баталгаажуулах</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStepIndicator = () => {
    const totalSteps = 5;
    return (
      <View style={styles.stepIndicator}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View key={index} style={styles.stepContainer}>
            <View
              style={[
                styles.stepDot,
                currentStep >= index + 1 && styles.activeStepDot,
              ]}
            />
            {index < totalSteps - 1 && (
              <View
                style={[
                  styles.stepLine,
                  currentStep > index + 1 && styles.activeStepLine,
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderSalonSelection();
      case 2:
        return renderStylistSelection();
      case 3:
      case 4:
        return renderDateAndTimeSelection();
      case 5:
        return renderConfirmation();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {currentStep > 1 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>
          {
            [
              "Захиалга",
              "Салон сонгох",
              "Мэргэжилтэн сонгох",
              "Өдөр & цаг", // Combined date and time step
              "Баталгаажуулалт",
            ][currentStep]
          }
        </Text>
        <View style={styles.placeholder} />
      </View>

      {renderStepIndicator()}
      <View style={styles.content}>{renderStepContent()}</View>
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
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
  },
  activeStepDot: {
    backgroundColor: "#ff4b8d",
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 4,
  },
  activeStepLine: {
    backgroundColor: "#ff4b8d",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  confirmationContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  serviceInfo: {
    marginLeft: 15,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  servicePrice: {
    fontSize: 14,
    color: "#ff4b8d",
    marginTop: 5,
  },
  serviceDuration: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  bookingDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: "#666",
  },
  confirmButton: {
    backgroundColor: "#ff4b8d",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  sectionContent: {
    marginTop: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 15,
  },
});

export default BookingScreen;
