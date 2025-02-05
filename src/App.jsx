// App.jsx
import React from "react";
import { Camera } from "./components/Camera";
import { EmotionCharts } from "./components/EmotionCharts";

// Hooks (assuming you've modularized)
import { useFaceApi } from "./hooks/useFaceApi";
import { useEmotionAnalysis } from "./hooks/useEmotionAnalysis";
import { useAgeGender } from "./hooks/useAgeGender";

// Import the CSS file here
import "./App.css";

function App() {
  // All face detections from face-api
  const { videoRef, canvasRef, detections } = useFaceApi();

  // Compute average emotions
  const emotions = useEmotionAnalysis(detections);

  // Extract age/gender (and bounding boxes if you want them)
  const faces = useAgeGender(detections);

  return (
    <div className='app-container'>
      <h1>Face Detection App</h1>

      <div className='main-content'>
        {/* Left column: Camera (top-left), then face count/info below */}
        <div className='left-column'>
          <div className='camera-section'>
            <Camera videoRef={videoRef} canvasRef={canvasRef} />
          </div>

          <div className='face-info-section'>
            <h3>Number of Faces Detected: {faces.length}</h3>
            {faces.map((face, i) => (
              <div key={i} className='face-details'>
                <strong>Face {i + 1}</strong>
                <p>Age: {face.age.toFixed(0)}</p>
                <p>Gender: {face.gender}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: both charts (Bar/Pie) in the same component */}
        <div className='right-column'>
          <EmotionCharts emotions={emotions} />
        </div>
      </div>
    </div>
  );
}

export default App;
