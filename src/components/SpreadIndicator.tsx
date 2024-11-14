import { Line } from "react-chartjs-2";

type SpreadIndicatorProps = {
  spreadLabels : string[],
  spreadData : number[]
}

const SpreadIndicator = ({ spreadLabels,spreadData } : SpreadIndicatorProps) => {
  const spreadChartData = {
    labels: spreadLabels,
    datasets: [
      {
        label: "Spread (USD)",
        data: spreadData,
        borderColor:
          spreadData[spreadData.length - 1] > spreadData[spreadData.length - 2]
            ? "green"
            : "red", // Color change based on spread increase or decrease
        fill: false,
      },
    ],
  };
  return (
    <div className="border p-4 bg-white rounded shadow-md w-full mb-4">
      <h2 className="text-xl font-semibold mb-8">Spread Indicator</h2>
      <Line data={spreadChartData} />
    </div>
  );
};

export default SpreadIndicator;
