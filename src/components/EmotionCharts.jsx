// EmotionCharts.jsx
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Map each emotion to a consistent color
const chartColors = {
  neutral: "rgba(128, 128, 128, 0.6)",
  happy: "rgba(255, 205, 86, 0.6)",
  sad: "rgba(54, 162, 235, 0.6)",
  angry: "rgba(255, 99, 132, 0.6)",
  fearful: "rgba(153, 102, 255, 0.6)",
  disgusted: "rgba(75, 192, 192, 0.6)",
  surprised: "rgba(255, 159, 64, 0.6)",
};

// A fixed order for labels
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
  // State to track which chart is active
  const [chartType, setChartType] = useState("bar");

  // Build the data in a known order
  const labels = EMOTION_ORDER;
  const dataValues = EMOTION_ORDER.map((emo) => emotions[emo] || 0);
  const backgroundColors = EMOTION_ORDER.map((emo) => chartColors[emo]);

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

  // Options for Bar chart
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

  // Options for Pie chart
  const pieOptions = {
    responsive: true,
    // Turning off aspect ratio so we can control size via CSS
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Real-time Emotion Analysis (Pie)" },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={chartData} options={barOptions} />;
      case "pie":
        // Wrap Pie chart in a small container to reduce its size
        return (
          <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
            <Pie data={chartData} options={pieOptions} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
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

      {renderChart()}
    </div>
  );
};
