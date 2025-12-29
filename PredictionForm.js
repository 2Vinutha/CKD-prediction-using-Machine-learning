import React, { useState } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography, Box, Container } from '@mui/material';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultCard from '../components/ResultCard';

function PredictionForm() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // ✅ Corrected API endpoint
      const response = await axios.post("http://127.0.0.1:8000/predict", formData);
      setResult(response.data);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Error connecting to the backend!");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Enter Patient Details
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                "age", "bp", "sg", "al", "su",
                "bgr", "bu", "sc", "sod", "pot",
                "hemo", "pcv", "wc", "rc"
              ].map((field) => (
                <Grid item xs={12} sm={6} md={4} key={field}>
                  <TextField
                    label={field.toUpperCase()}
                    name={field}
                    type="number"
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              ))}
            </Grid>

            <Box textAlign="center" sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" type="submit">
                {loading ? "Predicting..." : "Predict CKD"}
              </Button>
            </Box>
          </form>

          {loading && <LoadingSpinner />}

          {result && (
            <ResultCard
              prediction={result.prediction}
              confidence={result.confidence}
              risk={result.risk_level}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default PredictionForm;
