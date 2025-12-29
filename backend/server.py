from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Existing routes...
prediction_history = []

@app.post("/predict")
async def predict_ckd(data: dict):
    result = {
        "prediction": "No CKD",
        "confidence": 0.87,
        "risk_level": "Low"
    }
    prediction_history.append(result)
    return result


@app.get("/history")
async def get_history():
    return prediction_history


# ✅ NEW: model metrics route
@app.get("/model-metrics")
async def get_model_metrics():
    return {
        "accuracy": 0.92,
        "precision": 0.89,
        "recall": 0.94,
        "f1_score": 0.91,
        "feature_importance": {
            "BP": 0.32,
            "Sugar": 0.27,
            "Age": 0.16,
            "BGR": 0.12,
            "Hemoglobin": 0.08
        }
    }
