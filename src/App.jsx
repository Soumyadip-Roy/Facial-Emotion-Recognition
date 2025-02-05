// App.jsx
import React from "react";
import { Camera } from "./components/Camera";
import { useEmotionDetection } from "./hooks/useEmotionDetection";
import { EmotionCharts } from "./components/EmotionCharts";

function App() {
  // Use the single hook instance to get the current emotions
  const { videoRef, canvasRef, emotions } = useEmotionDetection();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}>
      {/* Camera with the refs */}
      <Camera videoRef={videoRef} canvasRef={canvasRef} />

      {/* Our combined Bar/Pie chart component, which has its own toggle button */}
      <div style={{ width: "600px" }}>
        <EmotionCharts emotions={emotions} />
      </div>
    </div>
  );
}

export default App;
