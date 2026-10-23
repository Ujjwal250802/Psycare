interface Question {
  id: number;
  category: 'stress' | 'anxiety' | 'depression';
}

interface AnalysisResult {
  stressScore: number;
  anxietyScore: number;
  depressionScore: number;
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string;
}

export function analyzeResponses(
  responses: Record<number, number>,
  questions: Question[]
): AnalysisResult {
  const categoryScores = {
    stress: 0,
    anxiety: 0,
    depression: 0,
  };

  const categoryCounts = {
    stress: 0,
    anxiety: 0,
    depression: 0,
  };

  questions.forEach((question) => {
    const response = responses[question.id] || 0;
    categoryScores[question.category] += response;
    categoryCounts[question.category]++;
  });

  const stressScore = Math.round(
    (categoryScores.stress / (categoryCounts.stress * 4)) * 100
  );
  const anxietyScore = Math.round(
    (categoryScores.anxiety / (categoryCounts.anxiety * 4)) * 100
  );
  const depressionScore = Math.round(
    (categoryScores.depression / (categoryCounts.depression * 4)) * 100
  );

  const averageScore = Math.round(
    (stressScore + anxietyScore + depressionScore) / 3
  );

  let severity: 'mild' | 'moderate' | 'severe';
  let recommendations: string;

  if (averageScore < 40) {
    severity = 'mild';
    recommendations =
      'Your results indicate mild stress levels. We recommend trying our stress relief activities and maintaining healthy habits like regular exercise, good sleep, and mindfulness practices.';
  } else if (averageScore < 70) {
    severity = 'moderate';
    recommendations =
      'Your results show moderate stress, anxiety, or depression symptoms. We recommend consulting with a mental health professional for personalized guidance. In the meantime, try our stress relief activities and maintain a support network.';
  } else {
    severity = 'severe';
    recommendations =
      'Your results indicate significant mental health concerns. We strongly recommend scheduling an appointment with a mental health professional as soon as possible. Professional support can make a significant difference in your well-being.';
  }

  return {
    stressScore,
    anxietyScore,
    depressionScore,
    severity,
    recommendations,
  };
}
