import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  CircleCheck,
} from 'lucide-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '@/contexts/AuthContext';

import { razorpayService } from '@/services/RazorpayService';

export default function PaymentScreen() {
  const {
    doctorId,
    doctorName,
    fee,
    consultationType,
  } = useLocalSearchParams();

  const { user } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [showPaymentModal, setShowPaymentModal] =
    useState(false);

  const [processing, setProcessing] =
    useState(false);

  const totalAmount = Math.round(
    Number(fee) * 1.18
  );

  const startPaymentFlow = async () => {
    try {
      setLoading(true);

      const orderResponse =
        await razorpayService.createOrder(
          {
            amount: totalAmount,

            currency: 'INR',

            receipt: `receipt_${Date.now()}`,
          }
        );

      if (!orderResponse.success) {
        Alert.alert(
          'Error',
          'Unable to create order'
        );

        return;
      }

      setShowPaymentModal(true);

      setTimeout(async () => {
        setProcessing(true);

        const paymentResult =
          await razorpayService.processPayment(
            orderResponse.order,
            {
              name:
                user?.email ||
                'PsyCare User',

              email:
                user?.email || '',

              phone:
                '9999999999',
            }
          );

        if (
          paymentResult.success
        ) {
          try {
            const existingHistory =
              await AsyncStorage.getItem(
                'paymentHistory'
              );

            const parsedHistory =
              existingHistory
                ? JSON.parse(
                    existingHistory
                  )
                : [];

            const newPayment = {
              doctorId,

              doctorName,

              amount: totalAmount,

              consultationType,

              paymentId:
                paymentResult.paymentId,

              orderId:
                paymentResult.orderId,

              date:
                new Date().toLocaleString(),

              status: 'Success',
            };

            parsedHistory.unshift(
              newPayment
            );

            await AsyncStorage.setItem(
              'paymentHistory',
              JSON.stringify(
                parsedHistory
              )
            );
          } catch (storageError) {
            console.log(
              storageError
            );
          }

          try {
            await razorpayService.sendConfirmationEmail(
              user?.email || '',

              doctorName as string,

              totalAmount,

              consultationType as string
            );
          } catch (emailError) {
            console.log(
              emailError
            );
          }

          setTimeout(() => {
            setShowPaymentModal(
              false
            );

            router.replace({
              pathname:
                '/appointment-confirmation',

              params: {
                doctorId,

                doctorName,

                amount:
                  totalAmount,

                consultationType,

                paymentId:
                  paymentResult.paymentId,
              },
            });
          }, 2500);
        } else {
          setShowPaymentModal(
            false
          );

          router.replace(
            '/payment-failure'
          );
        }
      }, 1200);
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message ||
          'Payment failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.back()
          }>
          <ArrowLeft
            color="#1e293b"
            size={24}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Secure Payment
        </Text>

        <View
          style={{ width: 24 }}
        />
      </View>

      {/* CONTENT */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={
          styles.contentContainer
        }>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Appointment Details
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>
              Doctor
            </Text>

            <Text style={styles.value}>
              {doctorName}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Consultation
            </Text>

            <Text style={styles.value}>
              {consultationType ===
              'virtual'
                ? 'Video Call'
                : 'In-Person'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Fee
            </Text>

            <Text style={styles.value}>
              ₹{fee}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Payment Summary
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>
              Consultation Fee
            </Text>

            <Text style={styles.value}>
              ₹{fee}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              GST
            </Text>

            <Text style={styles.value}>
              ₹
              {Math.round(
                Number(fee) * 0.18
              )}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text
              style={styles.totalLabel}>
              Total
            </Text>

            <Text
              style={styles.totalValue}>
              ₹{totalAmount}
            </Text>
          </View>
        </View>

        <View
          style={styles.securityCard}>
          <ShieldCheck
            color="#10b981"
            size={28}
          />

          <Text
            style={
              styles.securityTitle
            }>
            Secure Payment
          </Text>

          <Text
            style={
              styles.securityText
            }>
            Your payment is protected
            and encrypted.
          </Text>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={
            startPaymentFlow
          }
          disabled={loading}>
          {loading ? (
            <ActivityIndicator
              color="#fff"
            />
          ) : (
            <>
              <CreditCard
                color="#fff"
                size={20}
              />

              <Text
                style={
                  styles.payButtonText
                }>
                Pay ₹{totalAmount}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* PAYMENT MODAL */}
      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide">
        <View
          style={styles.modalOverlay}>
          <View
            style={styles.modalContainer}>
            {!processing ? (
              <>
                <Text
                  style={
                    styles.modalTitle
                  }>
                  Payment Options
                </Text>

                <TouchableOpacity
                  style={
                    styles.paymentOption
                  }>
                  <Text
                    style={
                      styles.paymentOptionText
                    }>
                    UPI - Google Pay
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.paymentOption
                  }>
                  <Text
                    style={
                      styles.paymentOptionText
                    }>
                    UPI - PhonePe
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.paymentOption
                  }>
                  <Text
                    style={
                      styles.paymentOptionText
                    }>
                    UPI - Paytm
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    styles.continueButton
                  }
                  onPress={() =>
                    setProcessing(
                      true
                    )
                  }>
                  <Text
                    style={
                      styles.continueButtonText
                    }>
                    Continue
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View
                style={
                  styles.processingContainer
                }>
                <ActivityIndicator
                  size="large"
                  color="#10b981"
                />

                <Text
                  style={
                    styles.processingTitle
                  }>
                  Processing your
                  payment
                </Text>

                <Text
                  style={
                    styles.processingSubtitle
                  }>
                  This will only take
                  a few seconds.
                </Text>

                <CircleCheck
                  color="#10b981"
                  size={60}
                  style={{
                    marginTop: 20,
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 18,
    color: '#1e293b',
  },

  row: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginBottom: 14,
  },

  label: {
    color: '#64748b',
    fontSize: 15,
  },

  value: {
    color: '#1e293b',
    fontWeight: '600',
    fontSize: 15,
  },

  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 12,
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
  },

  securityCard: {
    backgroundColor: '#d1fae5',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
  },

  securityTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#065f46',
    marginTop: 10,
    marginBottom: 10,
  },

  securityText: {
    fontSize: 14,
    color: '#065f46',
    textAlign: 'center',
  },

  footer: {
    padding: 20,
    backgroundColor: '#fff',
  },

  payButton: {
    backgroundColor: '#10b981',
    borderRadius: 16,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  payButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 420,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    color: '#1e293b',
  },

  paymentOption: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  paymentOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },

  continueButton: {
    backgroundColor: '#10b981',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },

  processingTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 24,
    color: '#1e293b',
  },

  processingSubtitle: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 10,
    textAlign: 'center',
  },
});
