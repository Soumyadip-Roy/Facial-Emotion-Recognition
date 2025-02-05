// faceUtils.js

import * as faceapi from "face-api.js";

/**
 * Utility to compute the average expressions across all faces detected.
 * Returns an object with normalized emotion values in percentages.
 */
export function calculateAverageEmotions(detections) {
  if (!detections || detections.length === 0) {
    return {
      neutral: 0,
      happy: 0,
      sad: 0,
      angry: 0,
      fearful: 0,
      disgusted: 0,
      surprised: 0,
    };
  }

  const sums = {
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
    disgusted: 0,
    surprised: 0,
  };

  detections.forEach((det) => {
    const expr = det.expressions;
    sums.neutral += expr.neutral;
    sums.happy += expr.happy;
    sums.sad += expr.sad;
    sums.angry += expr.angry;
    sums.fearful += expr.fearful;
    sums.disgusted += expr.disgusted;
    sums.surprised += expr.surprised;
  });

  const count = detections.length;
  return {
    neutral: (sums.neutral / count) * 100,
    happy: (sums.happy / count) * 100,
    sad: (sums.sad / count) * 100,
    angry: (sums.angry / count) * 100,
    fearful: (sums.fearful / count) * 100,
    disgusted: (sums.disgusted / count) * 100,
    surprised: (sums.surprised / count) * 100,
  };
}

/**
 * Utility to draw bounding boxes and optional labels
 * for each detected face on the given canvas.
 */
export function drawBoundingBoxes(detections, canvas, video) {
  if (!canvas || !video) return;

  const ctx = canvas.getContext("2d");
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  // Clear previous drawings
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Resize results to match the video dimensions
  const resized = faceapi.resizeResults(detections, displaySize);

  // Draw bounding boxes
  faceapi.draw.drawDetections(canvas, resized);

  // Draw optional age/gender text
  resized.forEach((result) => {
    const { age, gender } = result;
    const { box } = result.detection;
    const { x, y, width, height } = box;

    // Format text
    const label = `${gender}, ${age.toFixed(0)}`;
    const pad = 2;

    // Draw background rect for text
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(x, y + height + 5, ctx.measureText(label).width + pad * 2, 20);

    // Draw text
    ctx.fillStyle = "#fff";
    ctx.fillText(label, x + pad, y + height + 5 + 15);
  });
}
