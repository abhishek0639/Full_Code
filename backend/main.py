# ============================================
# CHURN PREDICTION API - FastAPI Backend
# ============================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import numpy as np

# ---------- 1. CREATE APP ----------
app = FastAPI()

# ---------- 2. CORS SETUP ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- 3. LOAD MODEL FILES ----------
model   = joblib.load('churn_model.pkl')
scaler  = joblib.load('scaler.pkl')
columns = joblib.load('columns.pkl')

# ---------- 4. DEFINE INPUT STRUCTURE ----------
class CustomerData(BaseModel):
    age:               int
    tenure:            int
    usage_frequency:   int
    support_calls:     int
    payment_delay:     int
    total_spend:       float
    last_interaction:  int
    gender:            str
    subscription_type: str
    contract_length:   str

# ---------- 5. ROOT ENDPOINT ----------
@app.get("/")
def root():
    return {"message": "Churn Prediction API is running!"}

# ---------- 6. PREDICT ENDPOINT ----------
@app.post("/predict")
def predict(data: CustomerData):

    # Step 1 - Encode input
    raw_input = {
        'Age':             data.age,
        'Tenure':          data.tenure,
        'Usage Frequency': data.usage_frequency,
        'Support Calls':   data.support_calls,
        'Payment Delay':   data.payment_delay,
        'Total Spend':     data.total_spend,
        'Last Interaction':data.last_interaction,
        'Gender_Female':   1 if data.gender == "Female" else 0,
        'Gender_Male':     1 if data.gender == "Male"   else 0,
        'Subscription Type_Basic':    1 if data.subscription_type == "Basic"    else 0,
        'Subscription Type_Premium':  1 if data.subscription_type == "Premium"  else 0,
        'Subscription Type_Standard': 1 if data.subscription_type == "Standard" else 0,
        'Contract Length_Annual':     1 if data.contract_length == "Annual"     else 0,
        'Contract Length_Monthly':    1 if data.contract_length == "Monthly"    else 0,
        'Contract Length_Quarterly':  1 if data.contract_length == "Quarterly"  else 0,
    }

    # Step 2 - Convert to dataframe
    input_df = pd.DataFrame([raw_input])

    # Step 3 - Scale numerical columns
    num_cols = ['Age', 'Tenure', 'Usage Frequency',
                'Support Calls', 'Payment Delay',
                'Total Spend', 'Last Interaction']
    input_df[num_cols] = scaler.transform(input_df[num_cols])

    # Step 4 - Reorder columns
    input_df = input_df[columns]

    # Step 5 - Predict
    prediction  = model.predict(input_df)[0]
    probability = model.predict_proba(input_df)[0]

    # Step 6 - Return result
    return {
        "churn":       int(prediction),
        "probability": round(float(probability[1]) * 100, 1),
        "message":     "This customer is likely to churn" if prediction == 1 else "This customer is NOT likely to churn"
    }