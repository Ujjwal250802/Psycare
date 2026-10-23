import pandas as pd

import joblib

from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.model_selection import train_test_split

from sklearn.linear_model import LogisticRegression

from sklearn.pipeline import Pipeline

from sklearn.metrics import accuracy_score

from sklearn.preprocessing import LabelEncoder

# LOAD DATASET
df = pd.read_csv(
    'final_dataset.csv'
)

# LABEL ENCODING
encoder = LabelEncoder()

df['encoded_label'] = (
    encoder.fit_transform(
        df['label']
    )
)

# SPLIT
X_train, X_test, y_train, y_test = train_test_split(
    df['text'],

    df['encoded_label'],

    test_size=0.2,

    random_state=42
)

# PIPELINE
pipeline = Pipeline([
    (
        'tfidf',

        TfidfVectorizer(
            max_features=2000
        )
    ),

    (
        'classifier',

        LogisticRegression(
            max_iter=500
        )
    )
])

# TRAIN
pipeline.fit(
    X_train,
    y_train
)

# TEST
y_pred = pipeline.predict(
    X_test
)

# ACCURACY
accuracy = accuracy_score(
    y_test,
    y_pred
)

print(
    f'Accuracy: {accuracy * 100:.2f}%'
)

# SAVE
joblib.dump(
    pipeline,
    'mental_health_model.pkl'
)

joblib.dump(
    encoder,
    'label_encoder.pkl'
)

print(
    'Model trained successfully'
)