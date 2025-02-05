// hooks/useEmotionAnalysis.js
import { useState, useEffect } from "react";
import { calculateAverageEmotions } from "../utils/faceUtils";

export function useEmotionAnalysis(detections) {
  const [emotions, setEmotions] = useState({
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
    disgusted: 0,
    surprised: 0,
  });

  useEffect(() => {
    const avg = calculateAverageEmotions(detections);
    setEmotions(avg);
  }, [detections]);

  return emotions;
}
