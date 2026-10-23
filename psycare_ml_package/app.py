from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load("mental_health_model.pkl")
encoder = joblib.load("label_encoder.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        stress = data["stress"]
        anxiety = data["anxiety"]
        depression = data["depression"]
        sleep_hours = data["sleep_hours"]
        social_interaction = data["social_interaction"]

        prediction = model.predict([[
            stress,
            anxiety,
            depression,
            sleep_hours,
            social_interaction
        ]])

        severity = encoder.inverse_transform(prediction)[0]

        return jsonify({
            "success": True,
            "severity": severity
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
