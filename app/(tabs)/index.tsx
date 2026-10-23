import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Heart, Brain, Shield, Users } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'Mental Health Assessment',
      description: 'Take a quick 10-question test to understand your mental well-being',
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Get tailored recommendations based on your assessment results',
    },
    {
      icon: Shield,
      title: 'Professional Support',
      description: 'Connect with certified mental health professionals when needed',
    },
    {
      icon: Users,
      title: 'Stress Relief Activities',
      description: 'Access guided exercises and activities for relaxation',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
          <View style={styles.logoSmall}>
            <Heart color="#10b981" size={28} />
          </View>
        </View>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Your Mental Wellness Journey Starts Here</Text>
        <Text style={styles.heroSubtitle}>
          Take control of your mental health with personalized assessments and professional support
        </Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/assessment')}>
          <Text style={styles.startButtonText}>Start Assessment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What We Offer</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.iconContainer}>
                <feature.icon color="#10b981" size={24} />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>About PsyCare</Text>
        <Text style={styles.infoText}>
          PsyCare is your trusted companion for mental wellness. We provide science-backed
          assessments to help you understand your mental health better. Our platform connects
          you with qualified professionals and offers personalized activities for stress relief
          and mental well-being.
        </Text>
        <Text style={styles.infoText}>
          Whether you're dealing with stress, anxiety, or just want to maintain good mental
          health, PsyCare is here to support you every step of the way.
        </Text>
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
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  email: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  logoSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d1fae5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    backgroundColor: '#10b981',
    margin: 20,
    padding: 24,
    borderRadius: 16,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#d1fae5',
    marginBottom: 24,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#d1fae5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 12,
  },
});
