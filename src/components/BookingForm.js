import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Calendar from "./Calendar";
import TimeSlot from "./TimeSlot";

const BookingForm = ({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onSubmit,
}) => {
  const handleTimeSelect = (time) => {
    onTimeSelect(time);
    // If both date and time are selected, automatically submit
    if (selectedDate) {
      onSubmit();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Calendar selectedDate={selectedDate} onSelectDate={onDateSelect} />

      {selectedDate && (
        <View style={styles.timeContainer}>
          <TimeSlot
            time={selectedTime}
            isSelected={selectedTime}
            onSelect={handleTimeSelect}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default BookingForm;
