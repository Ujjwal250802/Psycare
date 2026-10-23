from flask import Flask, request, jsonify

from flask_cors import CORS

import joblib

# CREATE FLASK APP
app = Flask(__name__)

CORS(app)

# LOAD MODEL
model = joblib.load(
    'mental_health_model.pkl'
)

encoder = joblib.load(
    'label_encoder.pkl'
)

# HOME ROUTE
@app.route('/')
def home():
    return (
        'PsyCare NLP AI Backend Running'
    )

# PREDICT ROUTE
@app.route(
    '/predict',
    methods=['POST']
)
def predict():
    try:
        # GET REQUEST DATA
        data = request.get_json()

        text = data.get(
            'text',
            ''
        )

        # VALIDATION
        if not text.strip():
            return jsonify({
                'success': False,

                'message':
                    'Text is required'
            })

        # MODEL PREDICTION
        prediction = model.predict(
            [text]
        )[0]

        # MODEL PROBABILITIES
        probabilities = (
            model.predict_proba(
                [text]
            )[0]
        )

        # LABEL
        label = (
            encoder.inverse_transform(
                [prediction]
            )[0]
        )

        # CONFIDENCE
        confidence = round(
            max(probabilities) * 100,
            2
        )

        # DEFAULT SCORES
        stress = 0

        anxiety = 0

        depression = 0

        # BASE SCORE
        base_score = round(
            confidence
        )

        # NORMAL MODEL SCORING
        if (
            label.lower()
            == 'stress'
        ):
            stress = max(
                base_score,
                65
            )

            anxiety = round(
                stress * 0.7
            )

            depression = round(
                stress * 0.5
            )

        elif (
            label.lower()
            == 'anxiety'
        ):
            anxiety = max(
                base_score,
                70
            )

            stress = round(
                anxiety * 0.6
            )

            depression = round(
                anxiety * 0.5
            )

        elif (
            label.lower()
            == 'depression'
        ):
            depression = max(
                base_score,
                85
            )

            stress = round(
                depression * 0.7
            )

            anxiety = round(
                depression * 0.6
            )

        elif (
            label.lower()
            == 'healthy'
        ):
            stress = 20

            anxiety = 15

            depression = 10

        else:
            stress = 35

            anxiety = 35

            depression = 35

        # EMOTION INTENSITY BOOSTING
        lower_text = text.lower()

        severe_keywords = [
            'hopeless',
            'broken',
            'empty',
            'suicidal',
            'worthless',
            'lonely',
            'depressed',
            'crying',
            'isolated',
            'exhausted',
            'panic',
            'fear',
            'emotionally drained',
            'no motivation',
            'hate myself',
            'tired of life',
        ]

        moderate_keywords = [
            'stress',
            'anxiety',
            'worried',
            'overthinking',
            'tired',
            'pressure',
            'nervous',
            'confused',
            'fearful',
            'restless',
        ]

        severe_count = sum(
            word in lower_text
            for word in severe_keywords
        )

        moderate_count = sum(
            word in lower_text
            for word in moderate_keywords
        )

        # SEVERE BOOST
        if severe_count >= 3:
            depression = max(
                depression,
                92
            )

            anxiety = max(
                anxiety,
                82
            )

            stress = max(
                stress,
                78
            )

        # MODERATE BOOST
        elif moderate_count >= 3:
            depression = max(
                depression,
                58
            )

            anxiety = max(
                anxiety,
                68
            )

            stress = max(
                stress,
                62
            )

        # SMART SEVERITY DETECTION
        if severe_count >= 3:
            severity = 'severe'

        elif moderate_count >= 3:
            severity = 'moderate'

        elif (
            label.lower()
            == 'healthy'
        ):
            severity = 'mild'

        elif (
            label.lower()
            == 'depression'
        ):
            severity = 'severe'

        elif (
            label.lower()
            in [
                'stress',
                'anxiety',
            ]
        ):
            severity = 'moderate'

        else:
            severity = 'mild'

        # RECOMMENDATIONS
        recommendations = ''

        if severity == 'mild':
            recommendations = (
                'Your mental health appears stable. '
                'Continue healthy habits, mindfulness, '
                'exercise, and emotional balance.'
            )

        elif severity == 'moderate':
            recommendations = (
                'You may be experiencing stress or anxiety symptoms. '
                'Stress-relief activities, emotional support, '
                'healthy sleep, and mindfulness are recommended.'
            )

        else:
            recommendations = (
                'Your responses indicate severe emotional distress. '
                'Professional mental health consultation is strongly '
                'recommended for proper guidance and support.'
            )

        # FINAL RESPONSE
        return jsonify({
            'success': True,

            'prediction':
                label,

            'confidence':
                confidence,

            'stress_score':
                stress,

            'anxiety_score':
                anxiety,

            'depression_score':
                depression,

            'severity':
                severity,

            'recommendations':
                recommendations,
        })

    except Exception as e:
        return jsonify({
            'success': False,

            'error': str(e)
        })

# START SERVER
if __name__ == '__main__':
    app.run(
        host='0.0.0.0',

        port=8000,

        debug=True
    )