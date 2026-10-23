import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CircleCheck as CheckCircle, Calendar, Clock, Phone, Mail, Video, Hop as Home } from 'lucide-react-native';

interface AppointmentDetails {
  id: string;
  appointment_date: string;
  video_call_room_id: string;
  status: string;
  doctor: {
    name: string;
    phone: string;
    email: string;
    specialization: string;
  };
}

export default function AppointmentConfirmationScreen() {
  const { appointmentId, doctorName, amount } = useLocalSearchParams();

  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <CheckCircle color="#10b981" size={64} />
        </View>
        <Text style={styles.successTitle}>Appointment Confirmed</Text>
        <Text style={styles.successText}>
          Your consultation has been successfully booked. You will receive a confirmation
          email shortly.
        </Text>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Appointment Details</Text>

        <View style={styles.detailRow}>
          <Calendar color="#10b981" size={20} />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {appointmentDate.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Clock color="#10b981" size={20} />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>10:00 AM - 10:45 AM (Approximate)</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Video color="#10b981" size={20} />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Consultation Type</Text>
            <Text style={styles.detailValue}>Video Call</Text>
          </View>
        </View>
      </View>

      <View style={styles.doctorCard}>
        <Text style={styles.doctorTitle}>Doctor Information</Text>

        <View style={styles.doctorHeader}>
          <View style={styles.doctorAvatar}>
            <Text style={styles.doctorInitial}>
              {(doctorName as string)?.charAt(0) || 'D'}
            </Text>
          </View>
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{doctorName}</Text>
            <Text style={styles.doctorSpec}>Mental Health Professional</Text>
          </View>
        </View>

        <View style={styles.contactRow}>
          <Phone color="#64748b" size={16} />
          <Text style={styles.contactText}>
            +91 98765 43210
          </Text>
        </View>

        <View style={styles.contactRow}>
          <Mail color="#64748b" size={16} />
          <Text style={styles.contactText}>
            doctor@psycare.com
          </Text>
        </View>
      </View>

      <View style={styles.paymentCard}>
        <Text style={styles.paymentTitle}>Payment Confirmation</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Amount Paid</Text>
          <Text style={styles.paymentValue}>
            ₹{Math.round(parseInt(amount as string) * 1.18)}
          </Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Payment ID</Text>
          <Text style={styles.paymentValue}>PAY{Date.now()}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Status</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Confirmed</Text>
          </View>
        </View>
      </View>

      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>Important Instructions</Text>
        <View style={styles.instruction}>
          <Text style={styles.instructionNumber}>1</Text>
          <Text style={styles.instructionText}>
            You will receive a video call link 15 minutes before the appointment time
          </Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.instructionNumber}>2</Text>
          <Text style={styles.instructionText}>
            Ensure you have a stable internet connection and a quiet environment
          </Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.instructionNumber}>3</Text>
          <Text style={styles.instructionText}>
            Keep your consultation records and medical history ready
          </Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.instructionNumber}>4</Text>
          <Text style={styles.instructionText}>
            If you need to reschedule, contact the doctor at least 24 hours prior
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.videoCallButton}
          onPress={() => {
            Alert.alert(
              'Video Call',
              'Video call will be available 15 minutes before the appointment time.'
            );
          }}>
          <Video color="#ffffff" size={20} />
          <Text style={styles.videoCallButtonText}>Join Video Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace('/(tabs)')}>
          <Home color="#64748b" size={20} />
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  successText: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  doctorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  doctorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  doctorInitial: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  doctorSpec: {
    fontSize: 14,
    color: '#64748b',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#475569',
  },
  paymentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  paymentLabel: {
    fontSize: 15,
    color: '#64748b',
  },
  paymentValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  statusBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#065f46',
    fontWeight: '600',
    fontSize: 13,
  },
  instructionsCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 16,
  },
  instruction: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    fontSize: 14,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  videoCallButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  videoCallButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  homeButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  homeButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
});
