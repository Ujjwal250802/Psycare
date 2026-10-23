import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ArrowLeft, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import { router } from 'expo-router';

const exercises = [
  {
    id: 1,
    name: 'Jumping Jacks',
    duration: 30,
    description: 'A full-body warm-up exercise',
  },
  {
    id: 2,
    name: 'Push-ups',
    duration: 45,
    description: 'Strengthens chest and arms',
  },
  {
    id: 3,
    name: 'Squats',
    duration: 45,
    description: 'Builds leg strength',
  },
  {
    id: 4,
    name: 'Plank',
    duration: 60,
    description: 'Core strengthening exercise',
  },
  {
    id: 5,
    name: 'Lunges',
    duration: 45,
    description: 'Leg toning exercise',
  },
  {
    id: 6,
    name: 'Stretching',
    duration: 30,
    description: 'Cool down and flexibility',
  },
];

export default function WorkoutActivity() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [isRunning, setIsRunning] = useState(true);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (currentExercise < exercises.length - 1) {
            setCompletedExercises([...completedExercises, currentExercise]);
            setCurrentExercise(currentExercise + 1);
            setTimeLeft(exercises[currentExercise + 1].duration);
          } else {
            setIsRunning(false);
            setCompletedExercises([...completedExercises, currentExercise]);
          }
          return exercises[currentExercise]?.duration || 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentExercise, completedExercises]);

  const totalExercises = exercises.length;
  const progress = ((completedExercises.length) / totalExercises) * 100;
  const isCompleted =
    completedExercises.length === totalExercises && !isRunning;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#ffffff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quick Workout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
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
          {completedExercises.length} of {totalExercises} exercises
        </Text>

        <View style={styles.exerciseCard}>
          <Text style={styles.exerciseLabel}>Current Exercise</Text>
          <Text style={styles.exerciseName}>
            {exercises[currentExercise].name}
          </Text>
          <Text style={styles.exerciseDescription}>
            {exercises[currentExercise].description}
          </Text>

          <View style={styles.timerContainer}>
            <Text style={styles.timer}>
              {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
              {String(timeLeft % 60).padStart(2, '0')}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, !isRunning && isCompleted && styles.buttonDisabled]}
          onPress={() => {
            if (isCompleted) {
              router.back();
            } else {
              setIsRunning(!isRunning);
            }
          }}>
          <Text style={styles.buttonText}>
            {isCompleted ? 'Done' : isRunning ? 'Pause' : 'Resume'}
          </Text>
        </TouchableOpacity>

        {isCompleted && (
          <View style={styles.completionCard}>
            <Text style={styles.completionTitle}>Workout Complete!</Text>
            <Text style={styles.completionSubtitle}>
              Great job! You've completed your quick workout. Keep it up!
            </Text>
          </View>
        )}

        <View style={styles.exercisesListContainer}>
          <Text style={styles.listTitle}>All Exercises</Text>
          {exercises.map((exercise, index) => (
            <View
              key={exercise.id}
              style={[
                styles.exerciseListItem,
                index === currentExercise && styles.exerciseListItemActive,
              ]}>
              <View style={styles.exerciseListLeft}>
                <Text style={styles.exerciseNumber}>{index + 1}</Text>
                <View>
                  <Text style={styles.exerciseListName}>{exercise.name}</Text>
                  <Text style={styles.exerciseListTime}>
                    {exercise.duration}s
                  </Text>
                </View>
              </View>
              {completedExercises.includes(index) && (
                <CheckCircle2 color="#10b981" size={24} />
              )}
            </View>
          ))}
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
  progressBar: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  progressText: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 24,
    textAlign: 'center',
  },
  exerciseCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  exerciseLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 24,
    lineHeight: 20,
  },
  timerContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#0f172a',
    borderRadius: 12,
  },
  timer: {
    fontSize: 48,
    fontWeight: '700',
    color: '#10b981',
  },
  button: {
    backgroundColor: '#10b981',
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
  completionCard: {
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
  exercisesListContainer: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  exerciseListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  exerciseListItemActive: {
    borderColor: '#10b981',
    backgroundColor: '#0f472a',
  },
  exerciseListLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  exerciseNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b98122',
    textAlign: 'center',
    lineHeight: 32,
  },
  exerciseListName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  exerciseListTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
