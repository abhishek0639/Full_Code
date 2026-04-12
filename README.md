# 🔮 Customer Churn Prediction System

A full stack machine learning application that predicts 
whether a customer will churn using XGBoost with 99.98% accuracy.

## 🌐 Live Demo
- **Streamlit App:** https://churnapp001.streamlit.app
- **Backend API:** https://churn-backend-41mf.onrender.com/docs

---

## 📊 Project Overview

Customer churn means a customer stops doing business 
with a company. This system predicts which customers 
are likely to leave so businesses can take action early.

### Dataset
- 440,833 customer records
- 12 features including age, tenure, support calls, payment delay
- Source: Kaggle

---

## 🤖 Machine Learning Models

| Model | Accuracy | Mistakes |
|---|---|---|
| Logistic Regression | 89.6% | 9,137 |
| Random Forest | 99.6% | 82 |
| **XGBoost** | **99.98%** | **16** |

### Top Features Driving Churn
1. Support Calls (28%)
2. Total Spend (20%)
3. Age (14%)
4. Payment Delay (13%)
5. Last Interaction (10%)

---

## 🛠️ Tech Stack

### Machine Learning
- Python
- Pandas
- Scikit-learn
- XGBoost
- Joblib

### Backend
- FastAPI
- Uvicorn
- Pydantic

### Frontend
- React.js
- Axios

### DevOps
- Docker
- Docker Compose
- GitHub Actions (CI/CD)
- Docker Hub

### Deployment
- Streamlit Cloud
- Render

---

## 📁 Project Structure
churn-fullstack/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── churn_model.pkl      # Trained XGBoost model
│   ├── scaler.pkl           # StandardScaler
│   ├── columns.pkl          # Feature columns
│   ├── Dockerfile           # Backend container
│   └── requirements.txt     # Python dependencies
├── frontend/
│   └── churn-ui/
│       ├── src/
│       │   └── App.js       # React application
│       └── Dockerfile       # Frontend container
├── docker-compose.yml       # Run everything together
└── .github/
└── workflows/
└── deploy.yml       # CI/CD pipeline

---

## 🚀 How to Run

### Option 1 — Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/abhishek0639/Full_Code.git
cd Full_Code

# Start everything with one command
docker-compose up
```

Open browser:
- Frontend → http://localhost:80
- Backend  → http://localhost:8000

### Option 2 — Manual

**Terminal 1 — Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Terminal 2 — Frontend:**
```bash
cd frontend/churn-ui
npm install
npm start
```

---

## ⚙️ CI/CD Pipeline

Every push to main branch automatically:
git push
↓
GitHub Actions triggers
↓
Builds Docker image
↓
Pushes to Docker Hub
↓
Zero manual work!

---

## 📈 ML Pipeline
Raw Data (440,833 customers)
↓
EDA (Exploratory Data Analysis)
↓
Preprocessing
├── Drop missing values
├── Encode text columns
├── Scale numerical columns
└── Train/Test split (80/20)
↓
Model Training
├── Logistic Regression (baseline)
├── Random Forest
└── XGBoost (best - 99.98%)
↓
Save Model (joblib)
↓
Deploy via FastAPI + React

---

## 👨‍💻 Author

**Abhishek**
- GitHub: https://github.com/abhishek0639