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

import { router } from 'expo-router';

import { Brain } from 'lucide-react-native';

import { analyzeMentalHealth } from '@/services/MLService';

const questions = [
  'How have you been feeling emotionally recently?',

  'What thoughts trouble you most during the day?',

  'How has your sleep been lately?',

  'Do you often feel mentally exhausted?',

  'How is your motivation level nowadays?',

  'Do you feel lonely or disconnected from others?',

  'What situations make you anxious?',

  'Do you overthink frequently?',

  'How is your appetite these days?',

  'Do you feel hopeful about your future?',

  'How often do you feel overwhelmed?',

  'Do you struggle to focus on tasks?',

  'How is your social life currently?',

  'Do you feel emotionally supported?',

  'Describe your overall mental state recently.',
];

export default function AssessmentScreen() {
  const [
    answers,
    setAnswers,
  ] = useState<string[]>(
    Array(
      questions.length
    ).fill('')
  );

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    text: string,
    index: number
  ) => {
    const updated = [
      ...answers,
    ];

    updated[index] = text;

    setAnswers(updated);
  };

  const handleSubmit =
    async () => {
      const empty =
        answers.some(
          (a) => !a.trim()
        );

      if (empty) {
        Alert.alert(
          'Incomplete',
          'Please answer all questions'
        );

        return;
      }

      try {
        setLoading(true);

        const combinedText =
          answers.join(' ');

        const result =
          await analyzeMentalHealth(
            combinedText
          );

        if (!result.success) {
          Alert.alert(
            'Error',
            'AI analysis failed'
          );

          return;
        }

        router.push({
          pathname:
            '/results',

          params: {
            severity:
              result.severity,

            stress:
              result.stress_score.toString(),

            anxiety:
              result.anxiety_score.toString(),

            depression:
              result.depression_score.toString(),

            prediction:
              result.prediction,

            confidence:
              result.confidence.toString(),

            responses:
              JSON.stringify(
                answers
              ),
          },
        });
      } catch (error: any) {
        Alert.alert(
          'Error',
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={
          styles.content
        }>
        <View style={styles.header}>
          <Brain
            color="#10b981"
            size={48}
          />

          <Text style={styles.title}>
            AI Mental Health
            Assessment
          </Text>

          <Text
            style={
              styles.subtitle
            }>
            Answer honestly so
            our AI can better
            understand your
            emotional state.
          </Text>
        </View>

        {questions.map(
          (
            question,
            index
          ) => (
            <View
              key={index}
              style={
                styles.questionCard
              }>
              <Text
                style={
                  styles.question
                }>
                Q{index + 1}.{' '}
                {question}
              </Text>

              <TextInput
                style={
                  styles.input
                }
                multiline
                placeholder="Write your answer here..."
                value={
                  answers[index]
                }
                onChangeText={(
                  text
                ) =>
                  handleChange(
                    text,
                    index
                  )
                }
              />
            </View>
          )
        )}

        <TouchableOpacity
          style={
            styles.submitButton
          }
          onPress={
            handleSubmit
          }>
          <Text
            style={
              styles.submitButtonText
            }>
            {loading
              ? 'Analyzing...'
              : 'Analyze Mental Health'}
          </Text>
        </TouchableOpacity>
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

    content: {
      padding: 20,
      paddingTop: 60,
      paddingBottom: 100,
    },

    header: {
      alignItems: 'center',
      marginBottom: 30,
    },

    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#1e293b',
      marginTop: 16,
    },

    subtitle: {
      fontSize: 15,
      color: '#64748b',
      textAlign: 'center',
      marginTop: 10,
      lineHeight: 22,
    },

    questionCard: {
      backgroundColor:
        '#ffffff',
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
    },

    question: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: 12,
    },

    input: {
      minHeight: 120,
      backgroundColor:
        '#f8fafc',
      borderRadius: 12,
      padding: 16,
      textAlignVertical:
        'top',
      fontSize: 15,
      color: '#1e293b',
    },

    submitButton: {
      backgroundColor:
        '#10b981',
      borderRadius: 16,
      padding: 18,
      alignItems: 'center',
      marginTop: 20,
    },

    submitButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '700',
    },
  });