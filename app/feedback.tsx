import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Star, Send, Hop as Home } from 'lucide-react-native';

export default function FeedbackScreen() {
  const { appointmentId } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please provide a rating for the consultation');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert(
        'Thank You',
        'Your feedback has been submitted successfully. We appreciate your time.',
        [
          {
            text: 'Back to Home',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Consultation Feedback</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>How was your experience?</Text>
          <Text style={styles.introText}>
            Your feedback helps us improve our services and provide better care to our
            patients.
          </Text>
        </View>

        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>Rate your consultation</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}>
                <Star
                  size={40}
                  color={star <= rating ? '#f59e0b' : '#e2e8f0'}
                  fill={star <= rating ? '#f59e0b' : 'none'}
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingText}>
              {rating === 1
                ? 'Poor'
                : rating === 2
                ? 'Fair'
                : rating === 3
                ? 'Good'
                : rating === 4
                ? 'Very Good'
                : 'Excellent'}
            </Text>
          )}
        </View>

        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackTitle}>Additional Comments (Optional)</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Share your thoughts about the consultation..."
            placeholderTextColor="#94a3b8"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={5}
            editable={!loading}
          />
        </View>

        <View style={styles.questionsCard}>
          <Text style={styles.questionsTitle}>Quick Questions</Text>

          <View style={styles.questionGroup}>
            <Text style={styles.question}>Was the doctor professional and courteous?</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.questionGroup}>
            <Text style={styles.question}>Did the consultation address your concerns?</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>Partially</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.questionGroup}>
            <Text style={styles.question}>Would you recommend this doctor?</Text>
            <View style={styles.optionsRow}>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>Maybe</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <Text style={styles.optionText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmitFeedback}
          disabled={loading}>
          <Send color="#ffffff" size={20} />
          <Text style={styles.submitButtonText}>
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.replace('/(tabs)')}
          disabled={loading}>
          <Home color="#64748b" size={20} />
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  introCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  ratingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
  },
  feedbackCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  feedbackInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    textAlignVertical: 'top',
  },
  questionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  questionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
  },
  questionGroup: {
    marginBottom: 24,
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  optionText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 12,
  },
  submitButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  submitButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
  },
  skipButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
});
