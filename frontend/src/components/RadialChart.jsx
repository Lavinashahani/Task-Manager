import {
  RadialBarChart,
  RadialBar,
  PolarRadiusAxis,
  Label,
  Tooltip,
} from "recharts";

const chartData = [
  { name: "Completed", value: 1260, fill: "#6366f1" }, // Indigo
  { name: "Pending", value: 570, fill: "#22c55e" }, // Green
];

const RadialChart = () => {
  //   const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  const totalTasks = chartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div>
      <div className="mt-1 mb-4 text-center text-sm">
        <p className="text-base font-semibold">Completed vs Pending</p>
        <p className="flex items-center justify-center text-gray-500 text-sm gap-2">
          Incresed efficiency by 12% this month
        </p>
      </div>
      {/* Chart */}
      <div className="flex justify-center items-center h-[240px]">
        <RadialBarChart
          width={Math.min(250, window.innerWidth * 0.8)}
          height={Math.min(250, window.innerWidth * 0.8)}
          data={chartData}
          startAngle={180}
          endAngle={0}
          innerRadius="70%"
          outerRadius="95%"
        >
          <Tooltip cursor={false} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="fill-gray-900 text-2xl font-bold"
                      >
                        {/* {totalVisitors.toLocaleString()} */} 200
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 8}
                        className="fill-gray-500 text-sm"
                      >
                        Tasks
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </PolarRadiusAxis>

          {/* Stacked bars */}
          <RadialBar dataKey="value" stackId="a" cornerRadius={5} />
        </RadialBarChart>
      </div>
    </div>
  );
};

export default RadialChart;
