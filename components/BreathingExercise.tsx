import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export default function BreathingExercise() {
  const [cycle, setCycle] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    if (!isActive) return;

    const sequence = [
      { duration: 4000, label: 'Inhale', toValue: 1.3 },
      { duration: 4000, label: 'Hold', toValue: 1.3 },
      { duration: 4000, label: 'Exhale', toValue: 0.8 },
    ];

    let currentStep = cycle % 3;
    const { duration, toValue } = sequence[currentStep];

    Animated.timing(scaleAnim, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start(() => {
      setCycle((c) => c + 1);
    });
  }, [cycle, isActive]);

  const currentStep = cycle % 3;
  const steps = ['Inhale', 'Hold', 'Exhale'];
  const totalCycles = 3;
  const completedCycles = Math.floor(cycle / 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#ffffff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breathing Exercise</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>4-7-8 Breathing Technique</Text>
        <Text style={styles.description}>
          A scientifically-backed breathing technique to calm your nervous system
        </Text>

        <View style={styles.circleContainer}>
          <Animated.View
            style={[
              styles.breathingCircle,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}>
            <Text style={styles.stepText}>{steps[currentStep]}</Text>
          </Animated.View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Current Cycle</Text>
            <Text style={styles.statValue}>{completedCycles + 1}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Cycles</Text>
            <Text style={styles.statValue}>{totalCycles}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Progress</Text>
            <Text style={styles.statValue}>
              {Math.min(100, Math.floor((completedCycles / totalCycles) * 100))}%
            </Text>
          </View>
        </View>

        {completedCycles >= totalCycles ? (
          <View style={styles.completionContainer}>
            <Text style={styles.completionText}>Great! Exercise completed!</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.back()}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.button, !isActive && styles.buttonDisabled]}
            onPress={() => setIsActive(!isActive)}>
            <Text style={styles.buttonText}>
              {isActive ? 'Pause' : 'Resume'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>How it works:</Text>
          <Text style={styles.instructionItem}>• Breathe in for 4 seconds</Text>
          <Text style={styles.instructionItem}>• Hold for 4 seconds</Text>
          <Text style={styles.instructionItem}>• Breathe out for 4 seconds</Text>
          <Text style={styles.instructionItem}>• Repeat 3 times</Text>
        </View>
      </View>
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
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  stepText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3b82f6',
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: '#64748b',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  completionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  completionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionsContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  instructionItem: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 8,
    lineHeight: 20,
  },
});
