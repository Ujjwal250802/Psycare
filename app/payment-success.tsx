import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { router } from 'expo-router';

import { CircleCheck } from 'lucide-react-native';

export default function PaymentSuccess() {
  return (
    <View style={styles.container}>
      <CircleCheck
        color="#10b981"
        size={90}
      />

      <Text style={styles.title}>
        Payment Successful
      </Text>

      <Text style={styles.subtitle}>
        Your appointment has been booked
        successfully.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.replace('/(tabs)')
        }>
        <Text style={styles.buttonText}>
          Go To Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#f8fafc',

    padding: 24,
  },

  title: {
    fontSize: 28,

    fontWeight: '700',

    color: '#1e293b',

    marginTop: 20,

    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,

    color: '#64748b',

    textAlign: 'center',

    lineHeight: 24,

    marginBottom: 30,
  },

  button: {
    backgroundColor: '#10b981',

    paddingVertical: 16,

    paddingHorizontal: 28,

    borderRadius: 14,
  },

  buttonText: {
    color: '#ffffff',

    fontSize: 16,

    fontWeight: '700',
  },
});