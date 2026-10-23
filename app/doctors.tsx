import { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  ArrowLeft,
  MapPin,
  Star,
  Phone,
  Mail,
  IndianRupee,
} from 'lucide-react-native';

interface Doctor {
  id: string;

  name: string;

  specialization: string;

  phone: string;

  email: string;

  consultation_fee: number;

  location: string;

  rating: number;

  available: boolean;

  mode:
    | 'virtual'
    | 'inperson';
}

export default function DoctorsScreen() {
  const { type } =
    useLocalSearchParams();

  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors =
    async () => {
      try {
        const mockDoctors: Doctor[] =
          [
            // VIRTUAL
            {
              id: '1',

              name:
                'Dr. Rajesh Kumar',

              specialization:
                'Clinical Psychologist',

              phone:
                '+91-9876543210',

              email:
                'rajesh@clinic.com',

              consultation_fee: 500,

              location:
                'Online Consultation',

              rating: 4.8,

              available: true,

              mode: 'virtual',
            },

            {
              id: '2',

              name:
                'Dr. Priya Sharma',

              specialization:
                'Psychiatrist',

              phone:
                '+91-9876543211',

              email:
                'priya@clinic.com',

              consultation_fee: 700,

              location:
                'Online Consultation',

              rating: 4.9,

              available: true,

              mode: 'virtual',
            },

            // IN PERSON
            {
              id: '3',

              name:
                'Dr. Amit Verma',

              specialization:
                'Therapist',

              phone:
                '+91-9876543212',

              email:
                'amit@clinic.com',

              consultation_fee: 900,

              location:
                'New Delhi',

              rating: 4.7,

              available: true,

              mode: 'inperson',
            },

            {
              id: '4',

              name:
                'Dr. Sneha Kapoor',

              specialization:
                'Mental Health Specialist',

              phone:
                '+91-9876543213',

              email:
                'sneha@clinic.com',

              consultation_fee: 1000,

              location:
                'Mumbai',

              rating: 4.9,

              available: true,

              mode: 'inperson',
            },
          ];

        setDoctors(
          mockDoctors
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const filteredDoctors =
    doctors.filter(
      (doctor) =>
        doctor.mode === type
    );

  const handleBookAppointment =
    (doctor: Doctor) => {
      router.push({
        pathname: '/payment',

        params: {
          doctorId: doctor.id,

          doctorName:
            doctor.name,

          fee:
            doctor.consultation_fee,

          consultationType:
            type,
        },
      });
    };

  if (loading) {
    return (
      <View
        style={
          styles.loadingContainer
        }>
        <ActivityIndicator
          size="large"
          color="#10b981"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.back()
          }
          style={
            styles.backButton
          }>
          <ArrowLeft
            color="#1e293b"
            size={24}
          />
        </TouchableOpacity>

        <Text
          style={
            styles.headerTitle
          }>
          {type ===
          'virtual'
            ? 'Virtual Doctors'
            : 'In-Person Doctors'}
        </Text>

        <View
          style={
            styles.placeholder
          }
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={
          styles.contentContainer
        }>
        <View
          style={
            styles.doctorsList
          }>
          {filteredDoctors.map(
            (doctor) => (
              <View
                key={
                  doctor.id
                }
                style={
                  styles.doctorCard
                }>
                <View
                  style={
                    styles.doctorHeader
                  }>
                  <View
                    style={
                      styles.doctorAvatar
                    }>
                    <Text
                      style={
                        styles.doctorInitial
                      }>
                      {doctor.name.charAt(
                        0
                      )}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.doctorInfo
                    }>
                    <Text
                      style={
                        styles.doctorName
                      }>
                      {
                        doctor.name
                      }
                    </Text>

                    <Text
                      style={
                        styles.doctorSpecialization
                      }>
                      {
                        doctor.specialization
                      }
                    </Text>

                    <View
                      style={
                        styles.ratingContainer
                      }>
                      <Star
                        color="#f59e0b"
                        size={16}
                        fill="#f59e0b"
                      />

                      <Text
                        style={
                          styles.ratingText
                        }>
                        {
                          doctor.rating
                        }
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={
                    styles.doctorDetails
                  }>
                  <View
                    style={
                      styles.detailRow
                    }>
                    <MapPin
                      color="#64748b"
                      size={16}
                    />

                    <Text
                      style={
                        styles.detailText
                      }>
                      {
                        doctor.location
                      }
                    </Text>
                  </View>

                  <View
                    style={
                      styles.detailRow
                    }>
                    <Phone
                      color="#64748b"
                      size={16}
                    />

                    <Text
                      style={
                        styles.detailText
                      }>
                      {
                        doctor.phone
                      }
                    </Text>
                  </View>

                  <View
                    style={
                      styles.detailRow
                    }>
                    <Mail
                      color="#64748b"
                      size={16}
                    />

                    <Text
                      style={
                        styles.detailText
                      }>
                      {
                        doctor.email
                      }
                    </Text>
                  </View>

                  <View
                    style={
                      styles.detailRow
                    }>
                    <IndianRupee
                      color="#64748b"
                      size={16}
                    />

                    <Text
                      style={
                        styles.detailText
                      }>
                      ₹
                      {
                        doctor.consultation_fee
                      }
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={
                    styles.bookButton
                  }
                  onPress={() =>
                    handleBookAppointment(
                      doctor
                    )
                  }>
                  <Text
                    style={
                      styles.bookButtonText
                    }>
                    Pay &
                    Book Appointment
                  </Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#f8fafc',
    },

    loadingContainer: {
      flex: 1,
      justifyContent:
        'center',
      alignItems: 'center',
      backgroundColor:
        '#f8fafc',
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'space-between',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor:
        '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor:
        '#e2e8f0',
    },

    backButton: {
      padding: 8,
    },

    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#1e293b',
    },

    placeholder: {
      width: 40,
    },

    content: {
      flex: 1,
    },

    contentContainer: {
      padding: 20,
    },

    doctorsList: {
      gap: 16,
    },

    doctorCard: {
      backgroundColor:
        '#ffffff',
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor:
        '#e2e8f0',
    },

    doctorHeader: {
      flexDirection: 'row',
      marginBottom: 16,
    },

    doctorAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor:
        '#10b981',
      alignItems: 'center',
      justifyContent:
        'center',
      marginRight: 16,
    },

    doctorInitial: {
      fontSize: 24,
      fontWeight: '700',
      color: '#ffffff',
    },

    doctorInfo: {
      flex: 1,
    },

    doctorName: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: 4,
    },

    doctorSpecialization: {
      fontSize: 14,
      color: '#64748b',
      marginBottom: 8,
    },

    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },

    ratingText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#1e293b',
    },

    doctorDetails: {
      gap: 12,
      marginBottom: 20,
    },

    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },

    detailText: {
      fontSize: 14,
      color: '#475569',
    },

    bookButton: {
      backgroundColor:
        '#10b981',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },

    bookButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '700',
    },
  });