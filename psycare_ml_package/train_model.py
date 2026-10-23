import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib

df = pd.read_csv("mental_health_dataset.csv")

X = df[[
    "stress",
    "anxiety",
    "depression",
    "sleep_hours",
    "social_interaction"
]]

y = df["severity"]

encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42
)

model = LogisticRegression(max_iter=1000)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("Model Accuracy:", accuracy)

joblib.dump(model, "mental_health_model.pkl")
joblib.dump(encoder, "label_encoder.pkl")

print("Model Saved Successfully")
