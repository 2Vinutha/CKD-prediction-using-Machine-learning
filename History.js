import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';
import axios from 'axios';

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/history").then(res => setHistory(res.data));
  }, []);

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5">Prediction History</Typography>
        <List>
          {history.map((h, index) => (
            <ListItem key={index}>
              {h.timestamp} — {h.prediction} ({(h.confidence * 100).toFixed(0)}%)
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default History;
