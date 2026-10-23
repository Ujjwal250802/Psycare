import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { ArrowLeft, Play, Pause } from 'lucide-react-native';
import { router } from 'expo-router';

export default function MeditationActivity() {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(true);
  const pulseAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalTime = 300;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const guides = [
    'Find a comfortable position and close your eyes.',
    'Take a deep breath in through your nose.',
    'Hold it for a moment, then exhale slowly through your mouth.',
    'Let your mind settle. If thoughts arise, observe them without judgment.',
    'Continue breathing naturally for the duration of this session.',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#ffffff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guided Meditation</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>5-Minute Mindfulness Meditation</Text>

        <View style={styles.timerContainer}>
          <View style={styles.progressRing}>
            <View
              style={[
                styles.progressFill,
                {
                  height: `${progress}%`,
                },
              ]}
            />
          </View>

          <Animated.View
            style={[
              styles.timerDisplay,
              {
                opacity: opacityAnim,
              },
            ]}>
            <Text style={styles.timeText}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </Text>
          </Animated.View>
        </View>

        {timeLeft === 0 && (
          <View style={styles.completionMessage}>
            <Text style={styles.completionTitle}>Meditation Complete!</Text>
            <Text style={styles.completionSubtitle}>
              You've completed your mindfulness session. Feel the calm within you.
            </Text>
          </View>
        )}

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[styles.controlButton, !isRunning && styles.controlButtonActive]}
            onPress={() => setIsRunning(!isRunning)}>
            {isRunning ? (
              <>
                <Pause color="#ffffff" size={20} />
                <Text style={styles.controlButtonText}>Pause</Text>
              </>
            ) : (
              <>
                <Play color="#ffffff" size={20} />
                <Text style={styles.controlButtonText}>Resume</Text>
              </>
            )}
          </TouchableOpacity>

          {timeLeft === 0 && (
            <TouchableOpacity
              style={[styles.controlButton, styles.doneButton]}
              onPress={() => router.back()}>
              <Text style={styles.controlButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.guidanceContainer}>
          <Text style={styles.guidanceTitle}>Meditation Guide</Text>
          {guides.map((guide, index) => (
            <View key={index} style={styles.guideItem}>
              <Text style={styles.guideBullet}>{index + 1}</Text>
              <Text style={styles.guideText}>{guide}</Text>
            </View>
          ))}
        </View>

        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Benefits of Regular Meditation</Text>
          <Text style={styles.benefitItem}>✓ Reduces stress and anxiety</Text>
          <Text style={styles.benefitItem}>✓ Improves focus and concentration</Text>
          <Text style={styles.benefitItem}>✓ Enhances emotional well-being</Text>
          <Text style={styles.benefitItem}>✓ Promotes better sleep</Text>
          <Text style={styles.benefitItem}>✓ Lowers blood pressure</Text>
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
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 32,
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  progressRing: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#1e293b',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#8b5cf6',
  },
  progressFill: {
    width: '100%',
    backgroundColor: '#8b5cf6',
  },
  timerDisplay: {
    position: 'absolute',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#8b5cf6',
  },
  completionMessage: {
    backgroundColor: '#10b98122',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  completionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 8,
  },
  completionSubtitle: {
    fontSize: 14,
    color: '#86efac',
    lineHeight: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  controlButton: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  controlButtonActive: {
    backgroundColor: '#06b6d4',
  },
  doneButton: {
    backgroundColor: '#10b981',
  },
  controlButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  guidanceContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  guidanceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  guideItem: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  guideBullet: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8b5cf6',
    minWidth: 30,
  },
  guideText: {
    flex: 1,
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  benefitsContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  benefitItem: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 8,
    lineHeight: 20,
  },
});
