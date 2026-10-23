import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ArrowLeft, Heart, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

const affirmations = [
  'I am capable of achieving my goals.',
  'I deserve happiness and success.',
  'My potential is limitless.',
  'I am worthy of love and respect.',
  'I choose positivity and growth.',
  'I am strong and resilient.',
  'My mistakes are learning opportunities.',
  'I am grateful for all that I have.',
  'I inspire others with my presence.',
  'I create positive change in my life.',
  'I am enough just as I am.',
  'My future is bright and full of possibilities.',
];

export default function AffirmationsActivity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedAffirmations, setLikedAffirmations] = useState<number[]>([]);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    if (currentIndex < affirmations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleLike = (index: number) => {
    if (likedAffirmations.includes(index)) {
      setLikedAffirmations(likedAffirmations.filter((i) => i !== index));
    } else {
      setLikedAffirmations([...likedAffirmations, index]);
    }
  };

  const isLiked = likedAffirmations.includes(currentIndex);
  const progress = ((currentIndex + 1) / affirmations.length) * 100;
  const minutes = Math.floor(sessionTime / 60);
  const seconds = sessionTime % 60;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#ffffff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Positive Affirmations</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1} of {affirmations.length}
          </Text>
        </View>

        <View style={styles.affirmationCard}>
          <Text style={styles.affirmationText}>
            {affirmations[currentIndex]}
          </Text>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleLike(currentIndex)}>
            <Heart
              color={isLiked ? '#ef4444' : '#cbd5e1'}
              size={32}
              fill={isLiked ? '#ef4444' : 'none'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
            onPress={handlePrevious}
            disabled={currentIndex === 0}>
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentIndex === affirmations.length - 1 && styles.navButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={currentIndex === affirmations.length - 1}>
            <ChevronRight color="#ffffff" size={20} />
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        {currentIndex === affirmations.length - 1 && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => router.back()}>
            <Text style={styles.completeButtonText}>Complete Session</Text>
          </TouchableOpacity>
        )}

        <View style={styles.likedContainer}>
          <Text style={styles.likedTitle}>
            Liked Affirmations ({likedAffirmations.length})
          </Text>
          {likedAffirmations.length > 0 ? (
            <View style={styles.likedList}>
              {likedAffirmations.map((index) => (
                <View key={index} style={styles.likedItem}>
                  <Heart color="#ef4444" size={16} fill="#ef4444" />
                  <Text style={styles.likedText}>{affirmations[index]}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noLikedText}>
              Like affirmations by tapping the heart icon
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#06b6d4',
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#06b6d4',
  },
  progressText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  affirmationCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 32,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
    borderWidth: 2,
    borderColor: '#06b6d4',
  },
  affirmationText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 24,
  },
  heartButton: {
    padding: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#06b6d4',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  navButtonDisabled: {
    backgroundColor: '#64748b',
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  likedContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
  },
  likedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  likedList: {
    gap: 12,
  },
  likedItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  likedText: {
    flex: 1,
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  noLikedText: {
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
});
