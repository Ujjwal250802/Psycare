import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const data = await AsyncStorage.getItem('paymentHistory');
    if (data) {
      setPayments(JSON.parse(data));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment History</Text>

      {payments.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.doctor}>{item.doctorName}</Text>
          <Text>Type: {item.type}</Text>
          <Text>Amount: ₹{item.amount}</Text>
          <Text>Payment ID: {item.paymentId}</Text>
          <Text>Date: {item.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  doctor: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
});