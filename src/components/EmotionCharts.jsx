// You might define your colors in a separate utils/colors.js if desired:
// src/components/EmotionCharts.jsx
import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// You might define your colors in a separate utils/colors.js if desired:
const chartColors = {
  neutral: "rgba(128, 128, 128, 0.6)",
  happy: "rgba(255, 205, 86, 0.6)",
  sad: "rgba(54, 162, 235, 0.6)",
  angry: "rgba(255, 99, 132, 0.6)",
  fearful: "rgba(153, 102, 255, 0.6)",
  disgusted: "rgba(75, 192, 192, 0.6)",
  surprised: "rgba(255, 159, 64, 0.6)",
};

// Fixed order so chart labels line up with the right colors
const EMOTION_ORDER = [
  "neutral",
  "happy",
  "sad",
  "angry",
  "fearful",
  "disgusted",
  "surprised",
];

export const EmotionCharts = ({ emotions }) => {
  // The chart can toggle between Bar and Pie
  const [chartType, setChartType] = useState("bar");

  // Construct datasets in a known order
  const labels = EMOTION_ORDER;
  const dataValues = EMOTION_ORDER.map((emo) => emotions[emo] || 0);
  const backgroundColors = EMOTION_ORDER.map((emo) => chartColors[emo]);

  // Chart.js data object
  const chartData = {
    labels,
    datasets: [
      {
        label: "Emotion Intensity (%)",
        data: dataValues,
        backgroundColor: backgroundColors,
      },
    ],
  };

  // Options for the Bar chart
  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Percentage (%)",
        },
      },
    },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Real-time Emotion Analysis (Bar)" },
    },
  };

  // Options for the Pie chart
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Real-time Emotion Analysis (Pie)" },
    },
  };

  // Decide which chart to render
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={chartData} options={barOptions} />;
      case "pie":
        // Put the Pie chart in a smaller container to reduce size
        return (
          <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
            <Pie data={chartData} options={pieOptions} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Simple toggle buttons for switching charts */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setChartType("bar")}
          style={{
            padding: "8px 16px",
            marginRight: "10px",
            backgroundColor: chartType === "bar" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}>
          Bar
        </button>
        <button
          onClick={() => setChartType("pie")}
          style={{
            padding: "8px 16px",
            backgroundColor: chartType === "pie" ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}>
          Pie
        </button>
      </div>

      {/* Render the chosen chart */}
      {renderChart()}
    </div>
  );
};
