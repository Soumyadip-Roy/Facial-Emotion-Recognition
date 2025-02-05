// hooks/useFaceApi.js
import { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { drawBoundingBoxes } from "../utils/faceUtils";

export function useFaceApi() {
  const [detections, setDetections] = useState([]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
        // faceapi.nets.faceLandmark68Net.loadFromUri("/models"), // optional
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

    const detectFaces = async () => {
      if (!videoRef.current) return;

      try {
        const results = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions({
              inputSize: 416,
              scoreThreshold: 0.5,
            })
          )
          .withFaceExpressions()
          .withAgeAndGender();
        // .withFaceLandmarks() // optional if needed

        setDetections(results || []);

        // Also draw bounding boxes
        if (canvasRef.current && videoRef.current) {
          drawBoundingBoxes(results, canvasRef.current, videoRef.current);
        }
      } catch (error) {
        console.error("Face detection error:", error);
      }
    };

    // Load models, then start video, then run detection on interval
    loadModels().then(startVideo);
    const intervalId = setInterval(detectFaces, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { videoRef, canvasRef, detections };
}
