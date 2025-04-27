import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Calendar from "./Calendar";
import TimeSlot from "./TimeSlot";

const BookingForm = ({ onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

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

  const timeSlots = generateTimeSlots();

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      onSubmit({
        date: selectedDate,
        time: selectedTime,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      <View style={styles.timeContainer}>
        <Text style={styles.title}>Цаг сонгох</Text>
        <View style={styles.timeSlotsGrid}>
          {timeSlots.map((time) => (
            <TimeSlot
              key={time}
              time={time}
              isSelected={selectedTime === time}
              onSelect={setSelectedTime}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  timeSlotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default BookingForm;
