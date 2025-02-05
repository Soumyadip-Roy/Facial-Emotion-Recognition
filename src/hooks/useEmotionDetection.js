import { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

export const useEmotionDetection = () => {
  const [emotions, setEmotions] = useState({
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
    disgusted: 0,
    surprised: 0,
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        // Make sure "/models" is correct relative to your public folder
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Camera access error:", err));
    };

    const detectEmotions = async () => {
      if (!videoRef.current) return;

      try {
        // Attempt to detect faces + expressions
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 416, // or 224, 320, etc.
              scoreThreshold: 0.5, // adjust if face not detected
            })
          )
          .withFaceExpressions();

        // Debug: see if any faces are found
        console.log("Detections:", detections);

        if (detections.length > 0) {
          const expressionData = detections[0].expressions;
          setEmotions({
            neutral: expressionData.neutral * 100,
            happy: expressionData.happy * 100,
            sad: expressionData.sad * 100,
            angry: expressionData.angry * 100,
            fearful: expressionData.fearful * 100,
            disgusted: expressionData.disgusted * 100,
            surprised: expressionData.surprised * 100,
          });
        } else {
          // No face detected => optional: reset to zeros or leave as-is
          setEmotions({
            neutral: 0,
            happy: 0,
            sad: 0,
            angry: 0,
            fearful: 0,
            disgusted: 0,
            surprised: 0,
          });
        }
      } catch (error) {
        console.error("Emotion detection error:", error);
      }
    };

    // Load models first, then start the webcam
    loadModels().then(startVideo);

    // Run detection every 1000ms
    const intervalId = setInterval(detectEmotions, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { videoRef, canvasRef, emotions };
};
