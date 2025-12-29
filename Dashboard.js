import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, LinearProgress, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/model-metrics")
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch((err) => console.error("Error fetching metrics:", err));
  }, []);

  if (!metrics) {
    return <Typography>Loading Dashboard...</Typography>;
  }

  const featureData = Object.keys(metrics.feature_importance).map((key) => ({
    name: key,
    value: metrics.feature_importance[key],
  }));

  const statCards = [
    { title: "Accuracy", value: metrics.accuracy },
    { title: "Precision", value: metrics.precision },
    { title: "Recall", value: metrics.recall },
    { title: "F1-Score", value: metrics.f1_score },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Model Analytics Dashboard
      </Typography>
      <Grid container spacing={3}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {(stat.value * 100).toFixed(1)}%
                </Typography>
                <LinearProgress variant="determinate" value={stat.value * 100} sx={{ height: 6, mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Feature Importance</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={featureData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
