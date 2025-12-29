import React from "react";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

const ResultCard = ({ prediction, confidence, risk }) => {
  if (!prediction) return null;

  // Choose background color based on prediction
  const isCKD = prediction.toLowerCase().includes("ckd");
  const bgColor = isCKD
    ? "rgba(255, 99, 99, 0.15)" // light red for CKD detected
    : "rgba(99, 255, 132, 0.15)"; // light green for No CKD

  const borderColor = isCKD ? "#ff4d4d" : "#4CAF50";
  const textColor = isCKD ? "#b30000" : "#006600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card
        style={{
          backgroundColor: bgColor,
          border: `2px solid ${borderColor}`,
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: "25px",
          textAlign: "center",
        }}
      >
        <h4 style={{ color: textColor, fontWeight: "bold", marginBottom: "10px" }}>
          Prediction: {prediction}
        </h4>
        <p style={{ fontSize: "18px", color: "#333" }}>
          <strong>Confidence:</strong> {confidence}%
        </p>
        <p style={{ fontSize: "18px", color: "#333" }}>
          <strong>Risk Level:</strong> {risk}
        </p>
      </Card>
    </motion.div>
  );
};

export default ResultCard;
