import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Wind,
  Headphones,
  Activity,
  Palette,
  BookOpen,
  Sparkles,
} from 'lucide-react-native';

const activities = [
  {
    id: 1,
    icon: Wind,
    title: 'Breathing Exercise',
    description: 'A 5-minute guided breathing technique to calm your mind',
    color: '#3b82f6',
    bgColor: '#dbeafe',
  },
  {
    id: 2,
    icon: Headphones,
    title: 'Meditation',
    description: 'Guided meditation for stress relief and mindfulness',
    color: '#8b5cf6',
    bgColor: '#ede9fe',
  },
  {
    id: 3,
    icon: Activity,
    title: 'Quick Workout',
    description: 'Simple exercises to boost your mood and energy',
    color: '#10b981',
    bgColor: '#d1fae5',
  },
  {
    id: 4,
    icon: Palette,
    title: 'Art Therapy',
    description: 'Express yourself through creative drawing and coloring',
    color: '#f59e0b',
    bgColor: '#fef3c7',
  },
  {
    id: 5,
    icon: BookOpen,
    title: 'Journaling',
    description: 'Write down your thoughts and feelings',
    color: '#ec4899',
    bgColor: '#fce7f3',
  },
  {
    id: 6,
    icon: Sparkles,
    title: 'Positive Affirmations',
    description: 'Daily affirmations to boost your confidence',
    color: '#06b6d4',
    bgColor: '#cffafe',
  },
];

export default function StressReliefScreen() {
  const handleActivityPress = (id: number) => {
    const routes: { [key: number]: string } = {
      1: '/breathing-exercise',
      2: '/meditation',
      3: '/workout',
      4: '/art-therapy',
      5: '/journaling',
      6: '/affirmations',
    };
    router.push(routes[id] as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stress Relief Activities</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Take a Moment for Yourself</Text>
          <Text style={styles.introText}>
            These activities are designed to help you relax, reduce stress, and
            improve your mental well-being. Choose any activity below to get started.
          </Text>
        </View>

        <View style={styles.activitiesGrid}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={[
                styles.activityCard,
                { backgroundColor: activity.bgColor },
              ]}
              onPress={() => handleActivityPress(activity.id)}>
              <View
                style={[styles.iconContainer, { backgroundColor: activity.color }]}>
                <activity.icon color="#ffffff" size={28} />
              </View>
              <Text style={[styles.activityTitle, { color: activity.color }]}>
                {activity.title}
              </Text>
              <Text style={styles.activityDescription}>
                {activity.description}
              </Text>
              <View style={styles.startButton}>
                <Text style={[styles.startButtonText, { color: activity.color }]}>
                  Start Activity
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Daily Wellness Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Practice mindfulness for at least 10 minutes daily
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Maintain a regular sleep schedule
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Stay physically active with regular exercise
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Connect with friends and family regularly
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>
              Limit screen time, especially before bed
            </Text>
          </View>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
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
    marginBottom: 12,
  },
  introText: {
    fontSize: 15,
    color: '#1e40af',
    lineHeight: 24,
  },
  activitiesGrid: {
    gap: 16,
    marginBottom: 24,
  },
  activityCard: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  activityDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20,
  },
  startButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tipBullet: {
    fontSize: 16,
    color: '#10b981',
    marginRight: 12,
    fontWeight: '700',
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
});
