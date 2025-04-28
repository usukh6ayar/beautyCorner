import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "./CustomHeader";
import CustomButton from "./CustomButton";
import DateCard from "./DateCard";
import TimeCard from "./TimeCard";

const Calendar = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = [
    { id: 1, day: "Да", date: "29" },
    { id: 2, day: "Мя", date: "30" },
    { id: 3, day: "Лх", date: "1" },
    { id: 4, day: "Пү", date: "2" },
    { id: 5, day: "Ба", date: "3" },
    { id: 6, day: "Бя", date: "4" },
    { id: 7, day: "Ня", date: "5" },
  ];

  const times = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      navigation.navigate("SelectServiceScreen", {
        selectedDate,
        selectedTime,
      });
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Өдөр, цаг сонгох" showBackButton />

      <Text style={styles.sectionTitle}>Өдөр сонгох</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollSection}
      >
        {dates.map((item) => (
          <DateCard
            key={item.id}
            day={item.day}
            date={item.date}
            isSelected={selectedDate === item.id}
            onPress={() => setSelectedDate(item.id)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Цаг сонгох</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollSection}
      >
        {times.map((time, index) => (
          <TimeCard
            key={index}
            time={time}
            isSelected={selectedTime === time}
            onPress={() => setSelectedTime(time)}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Буцах"
          onPress={() => navigation.goBack()}
          variant="secondary"
          style={styles.button}
        />
        <CustomButton
          title="Дараах"
          onPress={handleNext}
          disabled={!(selectedDate && selectedTime)}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  scrollSection: { marginBottom: 20 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: { flex: 1, marginHorizontal: 5 },
});
