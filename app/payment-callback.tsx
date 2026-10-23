import { View, Text, StyleSheet } from 'react-native';

export default function PaymentCallback() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Processing Payment...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },

  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
});