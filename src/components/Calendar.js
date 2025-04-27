import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Calendar = ({ selectedDate, onSelectDate }) => {
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
        formattedDate: date.toISOString().split("T")[0],
      });
    }

    return dates;
  };

  const dates = generateDates();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Өдөр сонгох</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((date) => (
          <TouchableOpacity
            key={date.formattedDate}
            style={[
              styles.dateCard,
              selectedDate?.formattedDate === date.formattedDate &&
                styles.selectedCard,
            ]}
            onPress={() => onSelectDate(date)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDate?.formattedDate === date.formattedDate &&
                  styles.selectedText,
              ]}
            >
              {date.day}
            </Text>
            <Text
              style={[
                styles.dayNumber,
                selectedDate?.formattedDate === date.formattedDate &&
                  styles.selectedText,
              ]}
            >
              {date.dayNumber}
            </Text>
            <Text
              style={[
                styles.monthText,
                selectedDate?.formattedDate === date.formattedDate &&
                  styles.selectedText,
              ]}
            >
              {date.month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  dateCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: "center",
    minWidth: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: "#ff4b8d",
  },
  dayText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  monthText: {
    fontSize: 14,
    color: "#666",
  },
  selectedText: {
    color: "#fff",
  },
});

export default Calendar;
