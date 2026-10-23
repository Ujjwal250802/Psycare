import pandas as pd

data = [
    # STRESS
    [
        "I feel mentally exhausted and stressed because of work pressure",
        "stress"
    ],

    [
        "I am overwhelmed with responsibilities and deadlines",
        "stress"
    ],

    [
        "I constantly worry about my future and career",
        "stress"
    ],

    [
        "I feel pressure and tension throughout the day",
        "stress"
    ],

    [
        "I cannot relax because my mind is always stressed",
        "stress"
    ],

    # ANXIETY
    [
        "I feel nervous in public situations",
        "anxiety"
    ],

    [
        "I overthink every small situation",
        "anxiety"
    ],

    [
        "My heart races when I interact with people",
        "anxiety"
    ],

    [
        "I constantly feel anxious and restless",
        "anxiety"
    ],

    [
        "I feel fear and panic without reason",
        "anxiety"
    ],

    # DEPRESSION
    [
        "I feel emotionally empty and hopeless",
        "depression"
    ],

    [
        "I have lost interest in everything",
        "depression"
    ],

    [
        "I feel lonely and emotionally broken",
        "depression"
    ],

    [
        "I do not feel motivated to do anything",
        "depression"
    ],

    [
        "I feel deeply sad and isolated",
        "depression"
    ],

    # HEALTHY
    [
        "I feel happy and emotionally balanced",
        "healthy"
    ],

    [
        "I am mentally stable and calm",
        "healthy"
    ],

    [
        "I feel motivated and positive",
        "healthy"
    ],

    [
        "My emotional health feels good",
        "healthy"
    ],

    [
        "I feel relaxed and mentally peaceful",
        "healthy"
    ],
]

# MAKE BIG DATASET
expanded = []

for _ in range(300):
    expanded.extend(data)

df = pd.DataFrame(
    expanded,
    columns=['text', 'label']
)

df.to_csv(
    'final_dataset.csv',
    index=False
)

print(
    'Dataset created successfully'
)