import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";

type SpreadIndicatorProps = {
  spreadChartData: ChartData<'line'>; 
}

const SpreadIndicator: React.FC<SpreadIndicatorProps> = ({ spreadChartData }) => {
  return (
    <div className="border p-4 bg-white rounded shadow-md w-full mb-4">
      <h2 className="text-xl font-semibold mb-8">Spread Indicator</h2>
      <Line data={spreadChartData} />
    </div>
  );
};

export default SpreadIndicator;
