export const chartColors = {
  neutral: "rgba(128, 128, 128, 0.6)",
  happy: "rgba(255, 205, 86, 0.6)",
  sad: "rgba(54, 162, 235, 0.6)",
  angry: "rgba(255, 99, 132, 0.6)",
  fearful: "rgba(153, 102, 255, 0.6)",
  disgusted: "rgba(75, 192, 192, 0.6)",
  surprised: "rgba(255, 159, 64, 0.6)",
};

export const createChartData = (emotions) => ({
  labels: Object.keys(emotions),
  datasets: [
    {
      label: "Emotion Intensity",
      data: Object.values(emotions),
      backgroundColor: Object.keys(emotions).map(
        (emotion) => chartColors[emotion]
      ),
    },
  ],
});

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Real-time Emotion Analysis" },
  },
};
