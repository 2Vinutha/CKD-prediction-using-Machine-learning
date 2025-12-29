# data_preprocessing.py
import pandas as pd
from sklearn.preprocessing import StandardScaler

def load_and_preprocess_data(path):
    df = pd.read_csv(path)
    df = df.dropna()  # remove rows with missing values

    # Separate features and labels
    X = df.drop(columns=['classification'])
    y = df['classification'].apply(lambda x: 1 if x == 'ckd' else 0)

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    return X_scaled, y, scaler
