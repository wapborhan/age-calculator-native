import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [age, setAge] = useState<string>('');
  const [ageInMonths, setAgeInMonths] = useState<string>('');
  const [ageInWeeks, setAgeInWeeks] = useState<string>('');
  const [ageInDays, setAgeInDays] = useState<string>('');
  const [ageInHours, setAgeInHours] = useState<string>('');
  const [ageInMinutes, setAgeInMinutes] = useState<string>('');
  const [ageInSeconds, setAgeInSeconds] = useState<string>('');

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const daysInMonth = (year: number, month: number) => {
    const days = [
      31,
      isLeapYear(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ];
    return days[month];
  };

  const calculateDetailedAge = () => {
    const year = parseInt(selectedYear);
    if (isNaN(year)) return;

    const selectedDate = new Date(year, selectedMonth, selectedDay);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - selectedDate.getFullYear();
    let months = currentDate.getMonth() - selectedDate.getMonth() + 1;
    let days = currentDate.getDate() - selectedDate.getDate();

    if (days < 0) {
      months -= 1;
      days += daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalMonths = years * 12 + months;

    setAge(`${years} years, ${months} months, ${days} days`);
    setAgeInMonths(`${totalMonths} months, ${days} days`);

    const diffInMs = currentDate.getTime() - selectedDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInSeconds = Math.floor(diffInMs / 1000);

    setAgeInDays(`${diffInDays} days`);
    setAgeInWeeks(`${diffInWeeks} weeks, ${diffInDays % 7} days`);
    setAgeInHours(`${diffInHours} hours`);
    setAgeInMinutes(`${diffInMinutes} minutes`);
    setAgeInSeconds(`${diffInSeconds} seconds`);
  };

  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.label}>Enter your birth date:</Text>

        <View style={styles.inputContainer}>
          <View style={styles.pickerContainer}>
          <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
        >
          {Array.from({ length: daysInMonth(parseInt(selectedYear), selectedMonth) }, (_, i) => (
            <Picker.Item key={i} label={(i + 1).toString()} value={i + 1} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Picker.Item key={i} label={new Date(0, i).toLocaleString('default', { month: 'short' })} value={i} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Year"
        keyboardType="numeric"
        onChangeText={(text) => setSelectedYear(text)}
        value={selectedYear}
      />
    </View>

    <Button title="Calculate Age" onPress={calculateDetailedAge} />

    {age !== '' && (
      <>
        <Text>Your age is:</Text>
        <Text> {age}</Text>
        <Text>or: {ageInMonths}</Text>
        <Text>or: {ageInWeeks}</Text>
        <Text>or: {ageInDays}</Text>
        <Text>or: {ageInHours}</Text>
        <Text>or: {ageInMinutes}</Text>
        <Text>or: {ageInSeconds}</Text>
      </>
    )}
  </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    marginBottom: 20,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  pickerContainer: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: '100%',
  },
});

export default App;
