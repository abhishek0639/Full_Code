import { useState } from "react";
import axios from "axios";

function App() {
  // ---------- 1. STATE ----------
  const [formData, setFormData] = useState({
    age: 30,
    tenure: 12,
    usage_frequency: 10,
    support_calls: 3,
    payment_delay: 5,
    total_spend: 400,
    last_interaction: 10,
    gender: "Male",
    subscription_type: "Basic",
    contract_length: "Monthly",
  });

  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // ---------- 2. HANDLE INPUT CHANGE ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: isNaN(value) ? value : Number(value),
    });
  };

  // ---------- 3. HANDLE SUBMIT ----------
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(
        "https://churn-backend-41mf.onrender.com/predict",
        formData
      );
      setResult(response.data);
    } catch (err) {
      setError("Something went wrong. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- 4. RENDER ----------
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Customer Churn Predictor</h1>
      <p style={styles.subtitle}>
        Enter customer details to predict churn probability
      </p>

      {/* NUMBER INPUTS */}
      <div style={styles.grid}>
        {[
          { label: "Age",              name: "age",              min: 18,  max: 65   },
          { label: "Tenure (months)",  name: "tenure",           min: 1,   max: 60   },
          { label: "Usage Frequency",  name: "usage_frequency",  min: 1,   max: 30   },
          { label: "Support Calls",    name: "support_calls",    min: 0,   max: 10   },
          { label: "Payment Delay",    name: "payment_delay",    min: 0,   max: 30   },
          { label: "Total Spend ($)",  name: "total_spend",      min: 100, max: 1000 },
          { label: "Last Interaction", name: "last_interaction", min: 1,   max: 30   },
        ].map((field) => (
          <div key={field.name} style={styles.fieldBox}>
            <label style={styles.label}>{field.label}</label>
            <input
              type="number"
              name={field.name}
              value={formData[field.name]}
              min={field.min}
              max={field.max}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
        ))}
      </div>

      {/* DROPDOWN INPUTS */}
      <div style={styles.grid}>
        <div style={styles.fieldBox}>
          <label style={styles.label}>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={styles.input}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>Subscription Type</label>
          <select
            name="subscription_type"
            value={formData.subscription_type}
            onChange={handleChange}
            style={styles.input}
          >
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
        </div>

        <div style={styles.fieldBox}>
          <label style={styles.label}>Contract Length</label>
          <select
            name="contract_length"
            value={formData.contract_length}
            onChange={handleChange}
            style={styles.input}
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Annual</option>
          </select>
        </div>
      </div>

      {/* PREDICT BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Predicting..." : "Predict Churn"}
      </button>

      {/* ERROR */}
      {error && (
        <div style={styles.errorBox}>
          <p>{error}</p>
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div style={result.churn === 1 ? styles.churnBox : styles.safeBox}>
          <h2>{result.churn === 1 ? "⚠️ Will Churn" : "✅ Will Not Churn"}</h2>
          <p style={styles.probability}>
            Probability: {result.probability}%
          </p>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
}

// ---------- 5. STYLES ----------
const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#0f172a",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    color: "#38bdf8",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#cbd5f5",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },
  fieldBox: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#e2e8f0",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#1e293b",
    color: "#f1f5f9",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#22c55e",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    marginBottom: "20px",
  },
  churnBox: {
    backgroundColor: "#3f1d1d",
    border: "2px solid #ef4444",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    color: "#f87171",
  },
  safeBox: {
    backgroundColor: "#052e16",
    border: "2px solid #22c55e",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    color: "#4ade80",
  },
  errorBox: {
    backgroundColor: "#422006",
    border: "1px solid #facc15",
    borderRadius: "8px",
    padding: "15px",
    color: "#fde68a",
  },
  probability: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#38bdf8",
  },
};

export default App;