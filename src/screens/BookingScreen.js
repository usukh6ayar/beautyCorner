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
import { appointments } from "../mockData/appointments";

const BookingScreen = ({ route, navigation }) => {
  const { service } = route.params;
  const [selectedSalon, setSelectedSalon] = useState(salons[0]);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Generate some dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date,
        day: date.toLocaleString("en-us", { weekday: "short" }),
        dayNumber: date.getDate(),
      });
    }

    return dates;
  };

  // Generate time slots from 9 AM to 5 PM
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 9;

    while (hour < 17) {
      slots.push(`${hour}:00 ${hour < 12 ? "AM" : "PM"}`);
      slots.push(`${hour}:30 ${hour < 12 ? "AM" : "PM"}`);
      hour++;
    }

    return slots;
  };
};

export default BookingScreen;
