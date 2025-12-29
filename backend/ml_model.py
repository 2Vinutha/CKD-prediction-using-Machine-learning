import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

def train_and_save_model():
    # Load dataset
    data = pd.read_csv("data/kidney_disease.csv")

    # Clean data
    data = data.dropna()
    data.replace('?', np.nan, inplace=True)
    data = data.dropna()

    # Encode categorical target
    data['classification'] = data['classification'].replace({'ckd': 1, 'notckd': 0})

    # Features and target
    X = data.drop(columns=['classification'])
    y = data['classification']

    # Handle categorical values if any
    X = pd.get_dummies(X, drop_first=True)

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Scale data
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate
    preds = model.predict(X_test)
    acc = accuracy_score(y_test, preds)
    print(f"✅ Model trained successfully with accuracy: {acc*100:.2f}%")

    # Save model and scaler
    with open("models/random_forest_model.pkl", "wb") as f:
        pickle.dump(model, f)

    with open("models/scaler.pkl", "wb") as f:
        pickle.dump(scaler, f)

    print("🎯 Model and scaler saved successfully!")

if __name__ == "__main__":
    train_and_save_model()
