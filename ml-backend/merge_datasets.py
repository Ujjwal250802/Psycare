import pandas as pd

# LOAD DATASETS
combined = pd.read_csv('Combined Data.csv')
student = pd.read_csv('Student Depression Dataset.csv')

print(combined.columns)
print(student.columns)

# CREATE COMMON FORMAT
combined_df = pd.DataFrame({
    'text': combined.iloc[:, 0].astype(str),
    'label': combined.iloc[:, 1].astype(str)
})

student_df = pd.DataFrame({
    'text': student.iloc[:, 0].astype(str),
    'label': student.iloc[:, 1].astype(str)
})

# MERGE
final_df = pd.concat([
    combined_df,
    student_df
], ignore_index=True)

# REMOVE EMPTY ROWS
final_df.dropna(inplace=True)

# SAVE
final_df.to_csv(
    'final_dataset.csv',
    index=False
)

print('Datasets merged successfully')
print(final_df.head())