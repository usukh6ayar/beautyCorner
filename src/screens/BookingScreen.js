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

const BookingScreen = ({ route, navigation }) => {
  const { service } = route.params;
  const [selectedSalon, setSelectedSalon] = useState(salons[0]);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: Salon, 2: Stylist, 3: Date, 4: Time, 5: Confirmation

  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        fullDate: date,
        day: date.toLocaleString("en-us", { weekday: "short" }),
        dayNumber: date.getDate(),
        month: date.toLocaleString("en-us", { month: "short" }),
        formattedDate: `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      });
    }

    return dates;
  };

  // Generate time slots from 9 AM to 6 PM
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 9;

    while (hour <= 18) {
      if (hour < 18) {
        slots.push(`${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`);
        slots.push(`${hour % 12 || 12}:30 ${hour < 12 ? "AM" : "PM"}`);
      } else {
        slots.push(`${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`);
      }
      hour++;
    }

    return slots;
  };

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

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
    // Here you would typically make an API call to save the booking
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

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4, 5].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View
            style={[
              styles.stepDot,
              currentStep >= step && styles.activeStepDot,
            ]}
          />
          {step < 5 && (
            <View
              style={[
                styles.stepLine,
                currentStep > step && styles.activeStepLine,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderSalonSelection = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Салон сонгох</Text>
      {salons.map((salon) => (
        <TouchableOpacity
          key={salon.id}
          style={[
            styles.selectionCard,
            selectedSalon?.id === salon.id && styles.selectedCard,
          ]}
          onPress={() => handleSalonSelect(salon)}
        >
          <Image source={{ uri: salon.imageUrl }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{salon.name}</Text>
            <Text style={styles.cardSubtitle} numberOfLines={1}>
              {salon.address}
            </Text>
            <View style={styles.cardDetails}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.rating}>{salon.rating}</Text>
              </View>
              <Text style={styles.workingHours}>{salon.workingHours}</Text>
            </View>
          </View>
          {selectedSalon?.id === salon.id && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#ff4b8d"
              style={styles.checkIcon}
            />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderStylistSelection = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Мэргэжилтэн сонгох</Text>
      {stylists.map((stylist) => (
        <TouchableOpacity
          key={stylist.id}
          style={[
            styles.selectionCard,
            selectedStylist?.id === stylist.id && styles.selectedCard,
          ]}
          onPress={() => handleStylistSelect(stylist)}
        >
          <Image
            source={{ uri: stylist.imageUrl }}
            style={styles.stylistImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{stylist.name}</Text>
            <Text style={styles.cardSubtitle}>{stylist.specialty}</Text>
            <View style={styles.cardDetails}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.rating}>{stylist.rating}</Text>
              </View>
              <Text style={styles.experience}>{stylist.experience}</Text>
            </View>
          </View>
          {selectedStylist?.id === stylist.id && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#ff4b8d"
              style={styles.checkIcon}
            />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderDateSelection = () => (
    <View>
      <Text style={styles.sectionTitle}>Өдөр сонгох</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateContainer}
      >
        {dates.map((date) => (
          <TouchableOpacity
            key={date.formattedDate}
            style={[
              styles.dateCard,
              selectedDate?.formattedDate === date.formattedDate &&
                styles.selectedDateCard,
            ]}
            onPress={() => handleDateSelect(date)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDate?.formattedDate === date.formattedDate &&
                  styles.selectedDateText,
              ]}
            >
              {date.day}
            </Text>
            <Text
              style={[
                styles.dateNumber,
                selectedDate?.formattedDate === date.formattedDate &&
                  styles.selectedDateText,
              ]}
            >
              {date.dayNumber}
            </Text>
            <Text
              style={[
                styles.monthText,
                selectedDate?.formattedDate === date.formattedDate &&
                  styles.selectedDateText,
              ]}
            >
              {date.month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderTimeSelection = () => (
    <View>
      <Text style={styles.sectionTitle}>Цаг сонгох</Text>
      <View style={styles.timeContainer}>
        {timeSlots.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeCard,
              selectedTime === time && styles.selectedTimeCard,
            ]}
            onPress={() => handleTimeSelect(time)}
          >
            <Text
              style={[
                styles.timeText,
                selectedTime === time && styles.selectedTimeText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
          <Text style={styles.detailValue}>{selectedSalon?.name || ""}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="person-outline" size={20} color="#666" />
          <Text style={styles.detailLabel}>Мэргэжилтэн:</Text>
          <Text style={styles.detailValue}>{selectedStylist?.name || ""}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <Text style={styles.detailLabel}>Өдөр:</Text>
          <Text style={styles.detailValue}>
            {selectedDate
              ? `${selectedDate.dayNumber} ${selectedDate.month}`
              : ""}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text style={styles.detailLabel}>Цаг:</Text>
          <Text style={styles.detailValue}>{selectedTime || ""}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmBooking}
      >
        <Text style={styles.confirmButtonText}>Захиалга баталгаажуулах</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderSalonSelection();
      case 2:
        return renderStylistSelection();
      case 3:
        return renderDateSelection();
      case 4:
        return renderTimeSelection();
      case 5:
        return renderConfirmation();
      default:
        return null;
    }
  };

  const canGoBack = currentStep > 1;
  const stepTitle = [
    "Захиалга",
    "Салон сонгох",
    "Мэргэжилтэн сонгох",
    "Өдөр сонгох",
    "Цаг сонгох",
    "Баталгаажуулах",
  ][currentStep];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {canGoBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{stepTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      {renderStepIndicator()}

      <View style={styles.content}>{renderStepContent()}</View>
    </View>
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
  selectionCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: "#ff4b8d",
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  stylistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#ff4b8d",
    marginLeft: 5,
  },
  workingHours: {
    fontSize: 12,
    color: "#666",
  },
  experience: {
    fontSize: 12,
    color: "#666",
  },
  checkIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  dateContainer: {
    paddingVertical: 10,
  },
  dateCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedDateCard: {
    borderWidth: 1,
    borderColor: "#ff4b8d",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  monthText: {
    fontSize: 14,
    color: "#666",
  },
  selectedDateText: {
    color: "#ff4b8d",
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedTimeCard: {
    borderWidth: 1,
    borderColor: "#ff4b8d",
  },
  timeText: {
    fontSize: 16,
    color: "#333",
  },
  selectedTimeText: {
    color: "#ff4b8d",
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
});
export default BookingScreen;
