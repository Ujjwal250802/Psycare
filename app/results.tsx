import { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  TriangleAlert as AlertTriangle,
  CircleCheck as CheckCircle,
  Heart,
  Brain,
  Hop as Home,
} from 'lucide-react-native';

import {
  BarChart,
  PieChart,
} from 'react-native-chart-kit';

import { useAuth } from '@/contexts/AuthContext';

import { generateMentalHealthPDF } from '@/services/PDFService';

const screenWidth =
  Dimensions.get('window').width;

interface TestResult {
  anxiety_score: number;

  stress_score: number;

  depression_score: number;

  overall_severity:
    | 'mild'
    | 'moderate'
    | 'severe';

  recommendations: string;
}

export default function ResultsScreen() {
  const {
    severity,
    stress,
    anxiety,
    depression,
    prediction,
    confidence,
    responses,
  } = useLocalSearchParams();

  const { user } = useAuth();

  const [result, setResult] =
    useState<TestResult | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      let recommendations =
        '';

      if (
        severity === 'mild'
      ) {
        recommendations =
          'Your mental health condition appears stable. Continue stress-relief activities, mindfulness, exercise, and healthy sleep habits.';
      }

      if (
        severity ===
        'moderate'
      ) {
        recommendations =
          'You may be experiencing moderate stress, anxiety, or depression symptoms. Continue healthy self-care activities and seek support if needed.';
      }

      if (
        severity === 'severe'
      ) {
        recommendations =
          'Your results indicate significant mental health concerns. Professional consultation is strongly recommended.';
      }

      const mockResult: TestResult =
        {
          anxiety_score:
            Number(anxiety),

          stress_score:
            Number(stress),

          depression_score:
            Number(
              depression
            ),

          overall_severity:
            severity as
              | 'mild'
              | 'moderate'
              | 'severe',

          recommendations,
        };

      setResult(mockResult);
    } catch (error) {
      console.error(
        'Error fetching result:',
        error
      );
    } finally {
      setLoading(false);
    }
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

  if (!result) {
    return (
      <View
        style={
          styles.loadingContainer
        }>
        <Text
          style={
            styles.errorText
          }>
          Unable to load results
        </Text>
      </View>
    );
  }

  const isSevere =
    result.overall_severity ===
    'severe';

  const averageScore =
    Math.round(
      (result.stress_score +
        result.anxiety_score +
        result.depression_score) /
        3
    );

  // BAR GRAPH
  const barData = {
    labels: [
      'Stress',
      'Anxiety',
      'Depression',
    ],

    datasets: [
      {
        data: [
          result.stress_score,

          result.anxiety_score,

          result.depression_score,
        ],
      },
    ],
  };

  // PIE CHART
  const pieData = [
    {
      name: 'Stress',

      population:
        result.stress_score,

      color: '#ef4444',

      legendFontColor:
        '#1e293b',

      legendFontSize: 14,
    },

    {
      name: 'Anxiety',

      population:
        result.anxiety_score,

      color: '#3b82f6',

      legendFontColor:
        '#1e293b',

      legendFontSize: 14,
    },

    {
      name: 'Depression',

      population:
        result.depression_score,

      color: '#10b981',

      legendFontColor:
        '#1e293b',

      legendFontSize: 14,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }>
      {/* HEADER */}
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,

            isSevere
              ? styles.iconContainerSevere
              : styles.iconContainerMild,
          ]}>
          {isSevere ? (
            <AlertTriangle
              color="#dc2626"
              size={48}
            />
          ) : (
            <CheckCircle
              color="#10b981"
              size={48}
            />
          )}
        </View>

        <Text style={styles.title}>
          Assessment Complete
        </Text>

        <Text
          style={styles.subtitle}>
          {isSevere
            ? 'Professional support is recommended'
            : 'Your mental health report is ready'}
        </Text>
      </View>

      {/* SCORE CARD */}
      <View style={styles.scoreCard}>
        <View
          style={styles.scoreRow}>
          <Text
            style={
              styles.scoreLabel
            }>
            Overall Score
          </Text>

          <Text
            style={[
              styles.scoreValue,

              isSevere &&
                styles.scoreValueSevere,
            ]}>
            {averageScore}%
          </Text>
        </View>

        <View
          style={
            styles.progressBar
          }>
          <View
            style={[
              styles.progressFill,

              {
                width: `${averageScore}%`,
              },

              isSevere
                ? styles.progressFillSevere
                : styles.progressFillMild,
            ]}
          />
        </View>
      </View>

      {/* AI ANALYSIS */}
      <View
        style={
          styles.analysisCard
        }>
        <Brain
          color="#10b981"
          size={28}
        />

        <Text
          style={
            styles.analysisTitle
          }>
          AI Mental Health
          Analysis
        </Text>

        <Text
          style={
            styles.analysisText
          }>
          Severity:{' '}
          {result.overall_severity}
        </Text>

        <Text
          style={
            styles.analysisText
          }>
          Prediction:{' '}
          {prediction}
        </Text>

        <Text
          style={
            styles.analysisText
          }>
          Confidence:{' '}
          {confidence}%
        </Text>
      </View>

      {/* SCORES */}
      <View
        style={
          styles.detailsCard
        }>
        <Text
          style={
            styles.detailsTitle
          }>
          Detailed Scores
        </Text>

        <View
          style={
            styles.detailRow
          }>
          <Text
            style={
              styles.detailLabel
            }>
            Stress
          </Text>

          <Text
            style={
              styles.detailValue
            }>
            {
              result.stress_score
            }
            %
          </Text>
        </View>

        <View
          style={
            styles.detailRow
          }>
          <Text
            style={
              styles.detailLabel
            }>
            Anxiety
          </Text>

          <Text
            style={
              styles.detailValue
            }>
            {
              result.anxiety_score
            }
            %
          </Text>
        </View>

        <View
          style={
            styles.detailRow
          }>
          <Text
            style={
              styles.detailLabel
            }>
            Depression
          </Text>

          <Text
            style={
              styles.detailValue
            }>
            {
              result.depression_score
            }
            %
          </Text>
        </View>
      </View>

      {/* RECOMMENDATION */}
      <View
        style={
          styles.recommendationsCard
        }>
        <Text
          style={
            styles.recommendationsTitle
          }>
          Recommendations
        </Text>

        <Text
          style={
            styles.recommendationsText
          }>
          {
            result.recommendations
          }
        </Text>
      </View>

      {/* BAR CHART */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>
          Mental Health Graph
        </Text>

        <BarChart
          data={barData}
          width={screenWidth - 60}
          height={220}
          yAxisSuffix="%"
          fromZero
          chartConfig={{
            backgroundGradientFrom:
              '#ffffff',

            backgroundGradientTo:
              '#ffffff',

            decimalPlaces: 0,

            color: (
              opacity = 1
            ) =>
              `rgba(16,185,129,${opacity})`,

            labelColor: () =>
              '#1e293b',
          }}
          style={{
            borderRadius: 16,
          }}
        />
      </View>

      {/* PIE CHART */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>
          Severity Distribution
        </Text>

        <PieChart
          data={pieData}
          width={screenWidth - 60}
          height={220}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          chartConfig={{
            color: () => '#000',
          }}
        />
      </View>

      {/* DOWNLOAD REPORT */}
      <TouchableOpacity
        style={
          styles.downloadButton
        }
        onPress={() =>
          generateMentalHealthPDF(
            user,
            result,
            [],
            responses
          )
        }>
        <Text
          style={
            styles.downloadButtonText
          }>
          Download Report
        </Text>
      </TouchableOpacity>

      {/* SEVERE */}
      {isSevere ? (
        <View
          style={
            styles.warningCard
          }>
          <AlertTriangle
            color="#dc2626"
            size={24}
          />

          <Text
            style={
              styles.warningTitle
            }>
            Professional
            Support Needed
          </Text>

          <Text
            style={
              styles.warningText
            }>
            Based on your
            assessment, we strongly
            recommend consulting
            with a mental health
            professional.
          </Text>

          <TouchableOpacity
            style={
              styles.bookButton
            }
            onPress={() =>
              router.push(
                '/appointment-type'
              )
            }>
            <Text
              style={
                styles.bookButtonText
              }>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={
            styles.activitiesCard
          }>
          <Heart
            color="#10b981"
            size={24}
          />

          <Text
            style={
              styles.activitiesTitle
            }>
            Stress Relief
            Activities
          </Text>

          <Text
            style={
              styles.activitiesText
            }>
            Explore relaxing
            activities designed to
            improve your emotional
            well-being.
          </Text>

          <TouchableOpacity
            style={
              styles.activitiesButton
            }
            onPress={() =>
              router.push(
                '/stress-relief'
              )
            }>
            <Text
              style={
                styles.activitiesButtonText
              }>
              Explore Activities
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* HOME */}
      <TouchableOpacity
        style={
          styles.homeButton
        }
        onPress={() =>
          router.replace(
            '/(tabs)'
          )
        }>
        <Home
          color="#64748b"
          size={20}
        />

        <Text
          style={
            styles.homeButtonText
          }>
          Back to Home
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#f8fafc',
    },

    content: {
      padding: 20,
      paddingTop: 60,
      paddingBottom: 100,
    },

    loadingContainer: {
      flex: 1,
      justifyContent:
        'center',
      alignItems: 'center',
    },

    errorText: {
      fontSize: 16,
      color: '#64748b',
    },

    header: {
      alignItems: 'center',
      marginBottom: 32,
    },

    iconContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent:
        'center',
      marginBottom: 16,
    },

    iconContainerMild: {
      backgroundColor:
        '#d1fae5',
    },

    iconContainerSevere: {
      backgroundColor:
        '#fee2e2',
    },

    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: 8,
    },

    subtitle: {
      fontSize: 16,
      color: '#64748b',
      textAlign: 'center',
    },

    scoreCard: {
      backgroundColor:
        '#ffffff',
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
    },

    scoreRow: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      marginBottom: 16,
    },

    scoreLabel: {
      fontSize: 18,
      fontWeight: '600',
      color: '#475569',
    },

    scoreValue: {
      fontSize: 32,
      fontWeight: '700',
      color: '#10b981',
    },

    scoreValueSevere: {
      color: '#dc2626',
    },

    progressBar: {
      height: 8,
      backgroundColor:
        '#e2e8f0',
      borderRadius: 4,
      overflow: 'hidden',
    },

    progressFill: {
      height: '100%',
    },

    progressFillMild: {
      backgroundColor:
        '#10b981',
    },

    progressFillSevere: {
      backgroundColor:
        '#dc2626',
    },

    analysisCard: {
      backgroundColor:
        '#ecfeff',
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
      alignItems: 'center',
    },

    analysisTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#155e75',
      marginTop: 12,
      marginBottom: 8,
    },

    analysisText: {
      fontSize: 16,
      color: '#164e63',
      marginBottom: 4,
    },

    detailsCard: {
      backgroundColor:
        '#ffffff',
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
    },

    detailsTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: 16,
    },

    detailRow: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor:
        '#f1f5f9',
    },

    detailLabel: {
      fontSize: 16,
      color: '#64748b',
    },

    detailValue: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1e293b',
    },

    recommendationsCard: {
      backgroundColor:
        '#eff6ff',
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
    },

    recommendationsTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1e40af',
      marginBottom: 12,
    },

    recommendationsText: {
      fontSize: 15,
      color: '#1e40af',
      lineHeight: 24,
    },

    chartCard: {
      backgroundColor:
        '#ffffff',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      alignItems: 'center',
    },

    chartTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: 16,
    },

    downloadButton: {
      backgroundColor:
        '#2563eb',
      borderRadius: 14,
      padding: 18,
      alignItems: 'center',
      marginBottom: 20,
    },

    downloadButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '700',
    },

    warningCard: {
      backgroundColor:
        '#fee2e2',
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
      alignItems: 'center',
    },

    warningTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#991b1b',
      marginTop: 12,
      marginBottom: 8,
    },

    warningText: {
      fontSize: 15,
      color: '#7f1d1d',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 20,
    },

    bookButton: {
      backgroundColor:
        '#dc2626',
      borderRadius: 12,
      padding: 16,
      width: '100%',
      alignItems: 'center',
    },

    bookButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '700',
    },

    activitiesCard: {
      backgroundColor:
        '#d1fae5',
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
      alignItems: 'center',
    },

    activitiesTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#065f46',
      marginTop: 12,
      marginBottom: 8,
    },

    activitiesText: {
      fontSize: 15,
      color: '#065f46',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 20,
    },

    activitiesButton: {
      backgroundColor:
        '#10b981',
      borderRadius: 12,
      padding: 16,
      width: '100%',
      alignItems: 'center',
    },

    activitiesButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '700',
    },

    homeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'center',
      backgroundColor:
        '#ffffff',
      borderRadius: 12,
      padding: 16,
      gap: 12,
      marginBottom: 30,
    },

    homeButtonText: {
      color: '#64748b',
      fontSize: 16,
      fontWeight: '600',
    },
  });