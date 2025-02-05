// hooks/useAgeGender.js
import { useState, useEffect } from "react";

export function useAgeGender(detections) {
  const [faces, setFaces] = useState([]);

  useEffect(() => {
    if (!detections || detections.length === 0) {
      setFaces([]);
      return;
    }

    const faceData = detections.map((det) => {
      const { age, gender } = det;
      return {
        age,
        gender,
        detection: det.detection, // bounding box if you want it
      };
    });
    setFaces(faceData);
  }, [detections]);

  return faces; // array of { age, gender, detection }
}
