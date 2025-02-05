// components/Camera.jsx
import React from "react";

export const Camera = ({ videoRef, canvasRef }) => {
  return (
    <div style={{ position: "relative", width: "400px", height: "300px" }}>
      <video
        ref={videoRef}
        width='400'
        height='300'
        autoPlay
        muted
        style={{ position: "absolute" }}
      />
      <canvas ref={canvasRef} style={{ position: "absolute" }} />
    </div>
  );
};
