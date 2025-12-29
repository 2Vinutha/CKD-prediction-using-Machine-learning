import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function Results() {
  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Typography variant="h5">Results Page</Typography>
        <Typography>Displays prediction results and confidence levels.</Typography>
      </CardContent>
    </Card>
  );
}

export default Results;
