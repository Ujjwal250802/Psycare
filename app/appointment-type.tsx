import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { router } from 'expo-router';

import {
  Video,
  Building2,
} from 'lucide-react-native';

export default function AppointmentTypeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Choose Appointment Type
      </Text>

      {/* VIRTUAL */}
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname:
              '/doctors',

            params: {
              type: 'virtual',
            },
          })
        }>
        <Video
          color="#10b981"
          size={40}
        />

        <Text style={styles.cardTitle}>
          Virtual Consultation
        </Text>

        <Text style={styles.cardText}>
          Connect with doctors
          online through video
          consultation.
        </Text>
      </TouchableOpacity>

      {/* IN PERSON */}
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname:
              '/doctors',

            params: {
              type: 'inperson',
            },
          })
        }>
        <Building2
          color="#2563eb"
          size={40}
        />

        <Text style={styles.cardTitle}>
          In-Person Consultation
        </Text>

        <Text style={styles.cardText}>
          Visit doctor physically
          at clinic or hospital.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      justifyContent:
        'center',

      padding: 20,

      backgroundColor:
        '#f8fafc',
    },

    title: {
      fontSize: 28,

      fontWeight: '700',

      textAlign: 'center',

      marginBottom: 40,

      color: '#1e293b',
    },

    card: {
      backgroundColor:
        '#ffffff',

      borderRadius: 20,

      padding: 28,

      marginBottom: 20,

      alignItems: 'center',

      borderWidth: 1,

      borderColor:
        '#e2e8f0',
    },

    cardTitle: {
      fontSize: 22,

      fontWeight: '700',

      color: '#1e293b',

      marginTop: 16,

      marginBottom: 10,
    },

    cardText: {
      fontSize: 15,

      color: '#64748b',

      textAlign: 'center',

      lineHeight: 22,
    },
  });