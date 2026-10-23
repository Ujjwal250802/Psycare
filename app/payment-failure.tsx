import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { router } from 'expo-router';

import { CircleAlert } from 'lucide-react-native';

export default function PaymentFailure() {
  return (
    <View style={styles.container}>
      <CircleAlert
        color="#dc2626"
        size={90}
      />

      <Text style={styles.title}>
        Payment Failed
      </Text>

      <Text style={styles.subtitle}>
        Something went wrong during payment.
        Please try again.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.back()
        }>
        <Text style={styles.buttonText}>
          Try Again
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

    color: '#dc2626',

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
    backgroundColor: '#dc2626',

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