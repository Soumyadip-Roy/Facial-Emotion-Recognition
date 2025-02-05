// Camera.jsx
import React from "react";

export const Camera = ({ videoRef, canvasRef }) => {
  return (
    <div style={{ position: "relative", width: "302px", height: "240px" }}>
      <video
        ref={videoRef}
        width='320'
        height='240'
        autoPlay
        muted
        style={{ position: "absolute" }}
      />
      <canvas ref={canvasRef} style={{ position: "absolute" }} />
    </div>
  );
};
